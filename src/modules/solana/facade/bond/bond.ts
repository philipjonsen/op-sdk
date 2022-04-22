/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Connection, Transaction } from '@solana/web3.js';
import { BN, Idl, Program, Wallet, web3 } from '@project-serum/anchor';
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
import { SolanaModuleConfig } from '../..';
import { DataProvider } from 'src/core';
import {
  GetBondPayoutOptions,
  Options,
  GetUserBondBalancesOptions,
} from 'src/core';
import SolanaUtils, { getPublicKey } from '../../utils';

// import fabricatePurchaseBond from '../../fabricators/bond/purchase-bond';
// import fabricateRedeemBond from '../../fabricators/bond/redeem-bond';

export interface GetBondInfoOption extends QueryOption {
  user: string;
}

export interface GetPayoutForOption extends QueryOption {
  value: string;
}

export class SolanaBond implements BondModule {
  idl: Idl;
  wallet: Wallet;
  program: Program;
  connection: Connection;
  dataProvider: DataProvider;
  utils: any;

  constructor(config: SolanaModuleConfig) {
    this.idl = config.idl;
    this.wallet = config.wallet;
    this.program = config.program;
    this.connection = config.connection;
    this.dataProvider = config.dataProvider;
    this.utils = new SolanaUtils(this.program);
  }

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

    const [bonder] = await this.utils.getBonder(this.wallet.publicKey);
    const [bondAccount] = await this.utils.getBondAccount(bond.publicKey);
    const [payoutAccount] = await this.utils.getPayoutAccount();
    const [tokenAuthority] = await this.utils.getTokenAuthority();
    const [daoPayoutAccount] = await this.utils.getDaoPayoutAccount();
    const [principalAccount] = await this.utils.getPrincipalAccount();
    const [daoPrincipalAccount] = await this.utils.getDaoPrincipalAccount();

    const tokenAccount = await this.createAndGetTokenAccount(
      this.connection,
      this.wallet,
      this.wallet.publicKey,
      getPublicKey('tokenBMint'),
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
            payoutMint: getPublicKey('tokenAMint'),
            principalMint: getPublicKey('tokenBMint'),
            treasury: getPublicKey('treasury'),
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
    console.log('props', options);
    const account = await this.connection.getTokenAccountsByOwner(
      this.wallet.publicKey,
      { mint: new web3.PublicKey(options.nftMint) },
    );
    const nftToken = account.value[0].pubkey;
    const [bonder] = await this.utils.getBonder(this.wallet.publicKey);
    const [bondAccount] = await this.utils.getBondAccount(options.bond);
    const [tokenAuthority] = await this.utils.getTokenAuthority();

    try {
      const transaction = this.program.transaction.bondRedeem({
        accounts: {
          bond: options.bond,
          bonder,
          nftToken,
          bondAccount,
          tokenAuthority,
          payer: this.wallet.publicKey,
          authority: this.wallet.publicKey,
          treasury: getPublicKey('treasury'),
          tokenAccount: getPublicKey('userTokenA'),
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

  getBondPayout({ value }: GetBondPayoutOptions) {
    console.log({ value });
    return Promise.resolve();
  }

  getUserBondBalances({ filterByNetwork = false }: GetUserBondBalancesOptions) {
    console.log({ filterByNetwork });
    return Promise.resolve();
  }

  public getBonder = async () => {
    return await this.utils.getBonder(this.wallet.publicKey);
  };

  public getAllBonders = async (): Promise<any> => {
    try {
      return Promise.resolve(await this.program.account.bonder.all());
    } catch (e) {
      console.log('error', e);
      return Promise.reject(e);
    }
  };

  private isUserPurchasedBond = async (
    nftMint: web3.PublicKey,
  ): Promise<any> => {
    const account = await this.connection.getTokenAccountsByOwner(
      this.wallet.publicKey,
      { mint: nftMint },
    );
    console.log('this.wallet', this.wallet.publicKey.toString());
    console.log('account', account);
    return account.value.length > 0;
  };

  public getUserBondInfo = async (): Promise<any> => {
    try {
      console.log('account', this.program.account);
      const allBonds = await this.program.account.bond.all();
      const [bonder] = await this.utils.getBonder(this.wallet.publicKey);

      const userBonds = await Promise.all(
        allBonds
          .filter(
            ({ account }) => account.bonder.toString() === bonder.toString(),
          )
          .map(async (bond: any): Promise<any> => {
            return (await this.isUserPurchasedBond(bond.account.nftMint))
              ? bond
              : false;
          }),
      );
      return Promise.resolve(userBonds.filter(Boolean));
    } catch (e) {
      return Promise.reject([]);
    }
  };

  getBondCalculations({ bond }: Options) {
    console.log({ bond });
    return Promise.resolve();
  }
}
