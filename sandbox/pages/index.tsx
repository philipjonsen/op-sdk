import type { NextPage } from 'next';
import Head from 'next/head';
import { BN, web3 } from '@project-serum/anchor';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  AccountLayout,
  MintLayout,
  Token,
} from '@solana/spl-token';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import useSolanaWorkspace from '../hooks/useWorkspace';
import SolanaUtils, { addresses } from '../utils/solana';
import { useState } from 'react';

const getBondAccount = async (program: any, bondKey: any) => {
  // const program = anchor.workspace.OlympusproSol as Program<OlympusproSol>;
  return await web3.PublicKey.findProgramAddress(
    [Buffer.from('bond'), bondKey.toBuffer()],
    program.programId,
  );
};

const getTokenAuthority = async (
  program: any,
  treasuryAccount: web3.PublicKey,
) => {
  const [authority] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('olympusAuthority'), treasuryAccount.toBuffer()],
    program.programId,
  );
  return authority;
};

const Index: NextPage = () => {
  const [allAddresses, setAllAddresses] = useState({});
  const { connection, program, wallet }: any = useSolanaWorkspace();

  const createNewMint = async (connection: web3.Connection, payer: any) => {
    const mintAccount = web3.Keypair.generate();
    const balanceNeeded = await Token.getMinBalanceRentForExemptMint(
      connection,
    );
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mintAccount.publicKey,
        lamports: balanceNeeded,
        space: MintLayout.span,
        programId: TOKEN_PROGRAM_ID,
      }),
    );
    transaction.add(
      Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mintAccount.publicKey,
        0,
        payer.publicKey,
        payer.publicKey,
      ),
    ); // Send the two instructions

    transaction.feePayer = payer.publicKey;
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    transaction.sign(mintAccount);
    const signedTx = await payer.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txId);
    return mintAccount.publicKey;
  };

  const mintTo = async (
    connection: web3.Connection,
    mint: web3.PublicKey,
    destination: web3.PublicKey,
    authority: any,
    amount: number,
  ) => {
    const transaction = new Transaction().add(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mint,
        destination,
        authority.publicKey,
        [],
        amount,
      ),
    );
    transaction.feePayer = authority.publicKey;
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    const signedTx = await authority.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txId);
  };

  const createTokenAccount = async (
    connection: web3.Connection,
    owner: any,
    mint: web3.PublicKey,
  ) => {
    // Allocate memory for the account
    const balanceNeeded = await Token.getMinBalanceRentForExemptAccount(
      connection,
    );
    const newAccount = web3.Keypair.generate();

    const transaction = new Transaction();
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: owner.publicKey,
        newAccountPubkey: newAccount.publicKey,
        lamports: balanceNeeded,
        space: AccountLayout.span,
        programId: TOKEN_PROGRAM_ID,
      }),
    );

    const mintPublicKey = mint;
    transaction.add(
      Token.createInitAccountInstruction(
        TOKEN_PROGRAM_ID,
        mintPublicKey,
        newAccount.publicKey,
        owner.publicKey,
      ),
    ); // Send the two instructions

    transaction.feePayer = owner.publicKey;
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;

    transaction.sign(newAccount);
    const signedTx = await owner.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txId);
    return newAccount.publicKey;
  };

  const createBond = async () => {
    const tokenAMint = await createNewMint(connection, wallet);
    const tokenBMint = await createNewMint(connection, wallet);

    const partnerTokenA = await createTokenAccount(
      connection,
      wallet,
      tokenAMint,
    );
    const partnerTokenB = await createTokenAccount(
      connection,
      wallet,
      tokenBMint,
    );

    const olympusTokenA = await createTokenAccount(
      connection,
      wallet,
      tokenAMint,
    );
    const olympusTokenB = await createTokenAccount(
      connection,
      wallet,
      tokenBMint,
    );

    const userTokenA = await createTokenAccount(connection, wallet, tokenAMint);
    const userTokenB = await createTokenAccount(connection, wallet, tokenBMint);

    // To start, give the partner 10K tokenA and user 10K tokenB
    await mintTo(connection, tokenAMint, partnerTokenA, wallet, 20_000);
    await mintTo(connection, tokenBMint, userTokenB, wallet, 10_000);

    const [olympusData] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('olympus')],
      program.programId,
    );
    const [treasury] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('treasury'),
        tokenAMint.toBuffer(),
        wallet.publicKey.toBuffer(),
      ],
      program.programId,
    );
    const [payoutAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('account'), treasury.toBuffer(), tokenAMint.toBuffer()],
      program.programId,
    );
    const [daoPayoutAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), tokenAMint.toBuffer()],
      program.programId,
    );
    const [daoPrincipalAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), tokenBMint.toBuffer()],
      program.programId,
    );
    const [principalAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('account'), treasury.toBuffer(), tokenBMint.toBuffer()],
      program.programId,
    );
    const [bonder] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('bonder'), treasury.toBuffer(), tokenBMint.toBuffer()],
      program.programId,
    );

    // Create a treasury
    const initTx = await program.transaction.createTreasury({
      accounts: {
        olympusData,
        treasury,
        payoutAccount,
        daoPayoutAccount,
        authority: wallet.publicKey,
        payoutMint: tokenAMint,
        olympusDao: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
        payer: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
    });

    initTx.feePayer = wallet.publicKey;
    initTx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    const signedTx = await wallet.signTransaction(initTx);
    const txId = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txId);

    console.log('txId treasury', txId);

    let tx = new web3.Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        partnerTokenA,
        payoutAccount,
        wallet.publicKey,
        [],
        10_000,
      ),
    );

    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    const sendTx = await connection.sendRawTransaction(
      (await wallet.signTransaction(tx)).serialize(),
    );
    await connection.confirmTransaction(sendTx);

    const bonderTx = await program.transaction.createBonder(
      false,
      [33300, 33300, 33300, 33300, 33300].map((x) => new BN(x)),
      [0, 0, 0, 0].map((x) => new BN(x)),
      {
        accounts: {
          olympusData,
          olympusDao: wallet.publicKey,
          authority: wallet.publicKey,
          principalMint: tokenBMint,
          daoPrincipalAccount,
          principalAccount,
          treasury,
          bonder,
          systemProgram: web3.SystemProgram.programId,
          payer: wallet.publicKey,
          rent: web3.SYSVAR_RENT_PUBKEY,
          clock: web3.SYSVAR_CLOCK_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      },
    );

    bonderTx.feePayer = wallet.publicKey;
    bonderTx.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    const signedTx2 = await wallet.signTransaction(bonderTx);
    const txId2 = await connection.sendRawTransaction(signedTx2.serialize());
    await connection.confirmTransaction(txId2);

    const outData: any = {
      tokenAMint,
      tokenBMint,
      partnerTokenA,
      partnerTokenB,
      olympusTokenA,
      olympusTokenB,
      userTokenA,
      userTokenB,
      treasury,
      bonder,
    };

    Object.keys(outData).forEach((key) => {
      outData[key] = outData[key].toString();
    });

    console.log(JSON.stringify(outData, null, 2));
    setAllAddresses(outData);
  };

  const purchaseBond = async () => {
    if (!wallet || !wallet.sendTransaction || !wallet.signTransaction) {
      throw new WalletNotConnectedError();
    }

    const tokenAMint = new web3.PublicKey(addresses.tokenAMint);
    const tokenBMint = new web3.PublicKey(addresses.tokenBMint);
    const treasury = new web3.PublicKey(addresses.treasury);
    const userTokenB = new web3.PublicKey(addresses.userTokenB);
    // const userTokenB = new web3.PublicKey(
    //   'Fms4FBXnKMS2omPvCvPdfGykVruidwAvhSGoLDU41tVx',
    // );
    // const partnerTokenA = new web3.PublicKey(addresses.partnerTokenA);
    // const partnerToken = await createTokenAccount(connection, wallet, tokenBMint);
    // const userTokenB = await createTokenAccount(connection, wallet, tokenBMint);
    // console.log('userTokenB', userTokenB.toString());
    // await mintTo(connection, tokenAMint, partnerToken, wallet, 20_000);
    // await mintTo(connection, tokenBMint, userTokenB, wallet, 2000);

    // return;
    // const [treasury] = await web3.PublicKey.findProgramAddress(
    //   [
    //     Buffer.from('treasury'),
    //     tokenAMint.toBuffer(),
    //     wallet.publicKey.toBuffer(),
    //   ],
    //   program.programId,
    // );
    const [payoutAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('account'), treasury.toBuffer(), tokenAMint.toBuffer()],
      program.programId,
    );
    const [daoPayoutAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), tokenAMint.toBuffer()],
      program.programId,
    );
    const [daoPrincipalAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), tokenBMint.toBuffer()],
      program.programId,
    );
    const [principalAccount] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('account'), treasury.toBuffer(), tokenBMint.toBuffer()],
      program.programId,
    );
    const [bonder] = await web3.PublicKey.findProgramAddress(
      [Buffer.from('bonder'), treasury.toBuffer(), tokenBMint.toBuffer()],
      program.programId,
    );

    const bond = web3.Keypair.generate();
    const nftMint = web3.Keypair.generate();
    const nftToken = web3.Keypair.generate();

    // const utils = new SolanaUtils(program);
    // const [bondAccount] = await utils.getBondAccount(bond);
    // const [payoutAccount] = await utils.getPayoutAccount();
    // const [tokenAuthority] = await utils.getTokenAuthority();
    // const [daoPayoutAccount] = await utils.getDaoPayoutAccount();
    // const [principalAccount] = await utils.getPrincipalAccount();
    // const [daoPrincipalAccount] = await utils.getDaoPrincipalAccount();

    const [bondAccount] = await getBondAccount(program, bond.publicKey);
    const tokenAuthority = await getTokenAuthority(program, treasury);
    try {
      const transaction = await program.transaction.bonderDeposit(
        new BN(10),
        new BN(10),
        {
          accounts: {
            authority: wallet.publicKey,
            principalAccount,
            tokenAccount: userTokenB,
            payoutMint: tokenAMint,
            principalMint: tokenBMint,
            payoutAccount,
            daoPrincipalAccount,
            daoPayoutAccount,
            treasury,
            bondAccount,
            bond: bond.publicKey,
            payer: wallet.publicKey,
            bonder,
            nftMint: nftMint.publicKey,
            nftToken: nftToken.publicKey,
            tokenAuthority,
            systemProgram: web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            rent: web3.SYSVAR_RENT_PUBKEY,
          },
        },
      );

      console.log('authority', wallet.publicKey.toString());
      console.log('principalAccount', principalAccount.toString());
      console.log('userTokenB', new PublicKey(addresses.userTokenB).toString());
      console.log('payoutMint', new PublicKey(addresses.tokenAMint).toString());
      console.log(
        'principalMint',
        new PublicKey(addresses.tokenBMint).toString(),
      );
      console.log('payoutAccount', payoutAccount.toString());
      console.log('daoPrincipalAccount', daoPrincipalAccount.toString());
      console.log('daoPayoutAccount', daoPayoutAccount.toString());
      console.log('treasury', new PublicKey(addresses.treasury).toString());
      console.log('bondAccount', bondAccount.toString());
      console.log('bond', bond.publicKey.toString());
      console.log('payer', wallet.publicKey.toString());
      console.log('bonder', new PublicKey(addresses.bonder).toString());
      console.log('nftMint', nftMint.publicKey.toString());
      console.log('nftToken', nftToken.publicKey.toString());
      console.log('tokenAuthority', tokenAuthority.toString());
      console.log('systemProgram', web3.SystemProgram.programId.toString());
      console.log('tokenProgram', TOKEN_PROGRAM_ID.toString());
      console.log('clock', web3.SYSVAR_CLOCK_PUBKEY.toString());
      console.log('rent', web3.SYSVAR_RENT_PUBKEY.toString());

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
      ).blockhash;
      transaction.sign(bond, nftMint, nftToken);
      const signedTx2 = await wallet.signTransaction(transaction);
      console.log('signedTx2', signedTx2);
      const txId2 = await connection.sendRawTransaction(signedTx2.serialize());
      await connection.confirmTransaction(txId2);
      console.log('txId2', txId2);
    } catch (error: any) {
      console.log(`Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Solana</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletMultiButton />
      <WalletDisconnectButton />
      <button onClick={() => purchaseBond()}>Purchase Bond</button>
    </>
  );
};

export default Index;
