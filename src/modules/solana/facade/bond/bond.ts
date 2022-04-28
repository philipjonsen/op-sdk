/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, Transaction } from '@solana/web3.js';
import {
  BN,
  Idl,
  Program,
  Provider,
  Wallet,
  web3,
} from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Account,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

import {
  BondModule,
  PurchaseBondOptions,
  QueryOption,
  RedeemBondOptions,
} from 'src/core/types';
import idl from '../../idl/olympuspro_sol.json';
import SolanaUtils from '../../utils';
import { SolanaModuleConfig } from '../..';

export interface GetBondInfoOption extends QueryOption {
  user: string;
}

export interface GetPayoutForOption extends QueryOption {
  value: string;
}

const PROGRAM_ID = '61ZYzDJWf1KXdU6aEm6JEyE1z5Vjp3KHRSiKw9GAZaXp';

export class SolanaBond implements BondModule {
  idl: Idl;
  wallet: Wallet;
  program: Program;
  provider: Provider;
  connection: Connection;
  utils: any;

  constructor(config: SolanaModuleConfig) {
    this.idl = config.idl;
    this.wallet = config.wallet;
    this.connection = config.connection;
    this.provider = new Provider(config.connection, config.wallet, {});
    this.program = new Program(idl as any, PROGRAM_ID, this.provider);
    this.utils = new SolanaUtils(this.program);
  }

  // todo - replace localhost api with real api
  private fetchAllPartners = async (): Promise<any> =>
    await fetch('http://localhost:3000/api/partners')
      .then((response) => response.json())
      .then((data) => data);

  private createAndGetTokenAccount = async (
    connection: web3.Connection,
    payer: Wallet,
    owner: web3.PublicKey,
    mint: web3.PublicKey,
  ) => {
    let account: Account;
    const [address] = await web3.PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    try {
      account = await getAccount(
        connection,
        address,
        undefined,
        TOKEN_PROGRAM_ID,
      );
    } catch (e) {
      try {
        const transaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            payer.publicKey,
            address,
            owner,
            mint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          ),
        );

        transaction.feePayer = payer.publicKey;
        transaction.recentBlockhash = (
          await this.connection.getLatestBlockhash()
        ).blockhash;
        const signedTx = await payer.signTransaction(transaction);
        const txId = await this.connection.sendRawTransaction(
          signedTx.serialize(),
        );
        await this.connection.confirmTransaction(txId);
      } catch (e) {
        // ignore, account already exists?
      }
      account = await getAccount(
        connection,
        address,
        undefined,
        TOKEN_PROGRAM_ID,
      );
    }
    return account.address;
  };

  public purchaseBond = async (options: PurchaseBondOptions): Promise<any> => {
    const bond = web3.Keypair.generate();
    const nftMint = web3.Keypair.generate();
    const nftToken = web3.Keypair.generate();

    console.log('options', options);
    const { treasury, payoutToken, principalToken } = options;

    const [bonder] = await this.utils.getBonder(treasury, principalToken);
    const [bondAccount] = await this.utils.getBondAccount(bond.publicKey);
    const [payoutAccount] = await this.utils.getPayoutAccount(
      treasury,
      payoutToken,
    );
    const [tokenAuthority] = await this.utils.getTokenAuthority(treasury);
    const [daoPayoutAccount] = await this.utils.getDaoPayoutAccount(
      payoutToken,
    );
    const [principalAccount] = await this.utils.getPrincipalAccount(
      treasury,
      principalToken,
    );
    const [daoPrincipalAccount] = await this.utils.getDaoPrincipalAccount(
      principalToken,
    );

    const tokenAccount = await this.createAndGetTokenAccount(
      this.connection,
      this.wallet,
      this.wallet.publicKey,
      new web3.PublicKey(principalToken),
    );

    console.log({
      bonder: bonder.toString(),
      bondAccount: bondAccount.toString(),
      payoutAccount: payoutAccount.toString(),
      tokenAuthority: tokenAuthority.toString(),
      daoPayoutAccount: daoPayoutAccount.toString(),
      principalAccount: principalAccount.toString(),
      daoPrincipalAccount: daoPrincipalAccount.toString(),
      authority: this.wallet.publicKey.toString(),
    });

    try {
      const transaction = this.program.transaction.bonderDeposit(
        new BN(options.amount),
        new BN(options.maxPrice),
        {
          accounts: {
            bonder,
            bondAccount,
            payoutAccount,
            tokenAccount,
            tokenAuthority,
            principalAccount,
            daoPayoutAccount,
            daoPrincipalAccount,
            bond: bond.publicKey,
            payer: this.wallet.publicKey,
            authority: this.wallet.publicKey,
            payoutMint: new web3.PublicKey(payoutToken),
            principalMint: new web3.PublicKey(principalToken),
            treasury: new web3.PublicKey(treasury),
            nftMint: nftMint.publicKey,
            nftToken: nftToken.publicKey,
            systemProgram: web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            rent: web3.SYSVAR_RENT_PUBKEY,
          },
        },
      );

      transaction.feePayer = this.wallet.publicKey;
      transaction.recentBlockhash = (
        await this.connection.getRecentBlockhash()
      ).blockhash;
      transaction.sign(bond, nftMint, nftToken);
      const signedTx = await this.wallet.signTransaction(transaction);
      const txId = await this.connection.sendRawTransaction(
        signedTx.serialize(),
      );
      await this.connection.confirmTransaction(txId);

      console.log({ txId });
      console.log('bond', bond.publicKey.toString());
      console.log('nftMint', nftMint.publicKey.toString());
      console.log('nftToken', nftToken.publicKey.toString());

      return Promise.resolve(txId);
    } catch (e) {
      console.log('error', e);
      return Promise.reject(e);
    }

    // const fabricator = fabricatePurchaseBond({
    //   //takes method/contract specifics
    // });
    // return new SolanaOperation(
    //   this.networkId,
    //   this.wallet,
    //   this.idl,
    //   fabricator,
    // ).execute();
  };

  public redeemBond = async (options: RedeemBondOptions): Promise<any> => {
    const { treasury, payoutToken, principalToken } = options;
    const account = await this.connection.getTokenAccountsByOwner(
      this.wallet.publicKey,
      { mint: new web3.PublicKey(options.nftMint) },
    );
    const nftToken = account.value[0].pubkey;
    const [bonder] = await this.utils.getBonder(treasury, principalToken);

    const [bondAccount] = await this.utils.getBondAccount(options.bond);
    const [tokenAuthority] = await this.utils.getTokenAuthority(treasury);

    const tokenAccount = await this.createAndGetTokenAccount(
      this.connection,
      this.wallet,
      this.wallet.publicKey,
      new web3.PublicKey(payoutToken),
    );

    try {
      const transaction = this.program.transaction.bondRedeem({
        accounts: {
          bond: options.bond,
          bonder,
          nftToken,
          bondAccount,
          tokenAccount,
          tokenAuthority,
          payer: this.wallet.publicKey,
          authority: this.wallet.publicKey,
          treasury: new web3.PublicKey(treasury),
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          clock: web3.SYSVAR_CLOCK_PUBKEY,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
      });

      transaction.feePayer = this.wallet.publicKey;
      transaction.recentBlockhash = (
        await this.connection.getRecentBlockhash()
      ).blockhash;
      const signedTx = await this.wallet.signTransaction(transaction);
      const txId = await this.connection.sendRawTransaction(
        signedTx.serialize(),
      );
      await this.connection.confirmTransaction(txId);

      console.log({ txId });
      return Promise.resolve(txId);
    } catch (e) {
      console.log('error', e);
      return Promise.reject(e);
    }

    // const fabricator = fabricateRedeemBond({
    //   //method/contract args
    // });

    // return new SolanaOperation(
    //   this.networkId,
    //   this.wallet,
    //   this.idl,
    //   fabricator,
    // ).execute();
  };

  public getTokenSupply = async (tokenAddress: string): Promise<any> => {
    return await this.connection.getTokenSupply(
      new web3.PublicKey(tokenAddress),
    );
  };

  public getBonder = async (): Promise<any> => {
    return await this.utils.getBonder(this.wallet.publicKey);
  };

  public getAllBonders = async (): Promise<any> => {
    const allBonders = await this.program.account.bonder.all();
    const updatedBonders = allBonders.map((bond) => {
      const displayName = (bond.account.displayName = bond.account.mint
        .toString()
        .substring(0, 6));
      return { ...bond, displayName };
    });
    return Promise.resolve(updatedBonders);
  };

  public getSpecificTreasuryData = async (treasury: string): Promise<any> => {
    const details = await this.program.account.treasury.all();
    const all = details.find(
      ({ publicKey }) => publicKey.toString() === treasury,
    );
    if (all) {
      const acc = await this.connection.getTokenAccountBalance(
        new web3.PublicKey(all.account.payoutToken),
      );
      return Promise.resolve(acc);
    } else {
      return Promise.resolve([]);
    }
  };

  public getTreasuryInfo = async (_treasury: string): Promise<any> => {
    const partners = await this.fetchAllPartners();
    return Promise.resolve(
      partners.find(({ treasury }: any) => treasury === _treasury),
    );
  };

  public getAllPartners = async (): Promise<any> => {
    const partners = await this.fetchAllPartners();
    return Promise.resolve(partners.map(({ treasury }: any) => treasury));
  };

  private isUserPurchasedBond = async (
    nftMint: web3.PublicKey,
  ): Promise<any> => {
    const account = await this.connection.getTokenAccountsByOwner(
      this.wallet.publicKey,
      { mint: nftMint },
    );
    // console.log('this.wallet', this.wallet.publicKey.toString());
    // console.log('account', account);
    return account.value.length > 0;
  };

  public getPrincipalTokenBalanceForUser = async (
    token: string,
  ): Promise<any> => {
    const mint = new web3.PublicKey(token);
    const { value } = await this.connection.getParsedTokenAccountsByOwner(
      this.wallet.publicKey,
      { mint },
    );
    return Promise.resolve(value);
  };

  public getUserBondInfo = async (): Promise<any> => {
    try {
      const partners = await this.fetchAllPartners();
      const allBonds = await this.program.account.bond.all();
      const userBonds = partners
        .map(({ bonder }: any) =>
          allBonds.filter(
            ({ account }) => account.bonder.toString() === bonder.toString(),
          ),
        )
        .flat()
        .map(async (bond: any) => {
          console.log('bond');
          const { treasury }: any = partners.find(
            ({ bonder }: any) => bonder === bond.account.bonder.toString(),
          );
          bond.account.treasury = treasury;
          console.log('bond.account', bond.account);
          return Promise.resolve(
            (await this.isUserPurchasedBond(bond.account.nftMint))
              ? bond
              : false,
          );
        });
      const results = await Promise.all(userBonds);
      return Promise.resolve(results.filter(Boolean));
    } catch (e) {
      return Promise.reject([]);
    }
  };
}
