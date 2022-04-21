import type { NextPage } from 'next';
import { BN, web3 } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useEffect, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';

import { getPublicKey } from '../utils/solana';
import useSolanaUtils from '../hooks/useSolanaUtils';

const getISOString = (timestamp: number) =>
  new Date(timestamp * 1000).toISOString();

const Index: NextPage = () => {
  const utils = useSolanaUtils();
  const [allUserBonds, setAllUserBonds] = useState([]);

  useEffect(() => {
    const { wallet, program } = utils;
    if (wallet.connected) {
      (async () => {
        const [treasury] = await utils.getTreasury(wallet.publicKey);
        const [bonder] = await web3.PublicKey.findProgramAddress(
          [
            Buffer.from('bonder'),
            treasury.toBuffer(),
            getPublicKey('tokenBMint').toBuffer(),
          ],
          program.programId,
        );
        console.log('bonder', bonder.toString());
        const allBonds = await program.account.bond.all();
        setAllUserBonds(
          allBonds.filter(
            ({ account }: any) =>
              account.bonder.toString() === bonder.toString(),
          ),
        );
      })();
    }
  }, [utils.wallet]);

  const getAccountInfo = async (mintAddress: string) => {
    const account = await utils.connection.getTokenAccountsByOwner(
      utils.wallet.publicKey,
      { mint: new web3.PublicKey(mintAddress) },
    );
    return account.value[0].pubkey;
  };

  const bonderDeposit = async () => {
    const { connection, wallet, program } = utils;

    if (!wallet || !wallet.signTransaction) throw new WalletNotConnectedError();

    try {
      const bond = web3.Keypair.generate();
      const nftMint = web3.Keypair.generate();
      const nftToken = web3.Keypair.generate();

      const [bonder] = await utils.getBonder();
      const [bondAccount] = await utils.getBondAccount(bond.publicKey);
      const [payoutAccount] = await utils.getPayoutAccount();
      const [tokenAuthority] = await utils.getTokenAuthority();
      const [daoPayoutAccount] = await utils.getDaoPayoutAccount();
      const [principalAccount] = await utils.getPrincipalAccount();
      const [daoPrincipalAccount] = await utils.getDaoPrincipalAccount();

      const transaction = await program.transaction.bonderDeposit(
        new BN(7.33),
        new BN(10),
        {
          accounts: {
            bonder,
            bondAccount,
            payoutAccount,
            tokenAuthority,
            principalAccount,
            daoPayoutAccount,
            daoPrincipalAccount,
            bond: bond.publicKey,
            payer: wallet.publicKey,
            authority: wallet.publicKey,
            tokenAccount: getPublicKey('userTokenB'),
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

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
      ).blockhash;
      transaction.sign(bond, nftMint, nftToken);
      const signedTx = await wallet.signTransaction(transaction);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txId);

      console.log({ txId });
      console.log('bond', bond.publicKey.toString());
      console.log('nftMint', nftMint.publicKey.toString());
      console.log('nftToken', nftToken.publicKey.toString());
    } catch (error: any) {
      console.log(`Error: ${error?.message}`);
    }
  };

  const redeemBond = async (bond: any, nftMint: any) => {
    const { connection, wallet, program } = utils;

    if (!wallet || !wallet.signTransaction) throw new WalletNotConnectedError();

    try {
      const nftToken = await getAccountInfo(nftMint);
      const [bonder] = await utils.getBonder();
      const [bondAccount] = await utils.getBondAccount(bond);
      const [tokenAuthority] = await utils.getTokenAuthority();

      const transaction = await program.transaction.bondRedeem({
        accounts: {
          bond,
          bonder,
          nftToken,
          bondAccount,
          tokenAuthority,
          payer: wallet.publicKey,
          authority: wallet.publicKey,
          treasury: getPublicKey('treasury'),
          tokenAccount: getPublicKey('userTokenA'),
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          clock: web3.SYSVAR_CLOCK_PUBKEY,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
      });

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
      ).blockhash;
      const signedTx = await wallet.signTransaction(transaction);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txId);
      console.log('txId2', txId);
    } catch (error: any) {
      console.log(`Error: ${error?.message}`);
    }
  };

  return (
    <>
      <WalletMultiButton />
      <WalletDisconnectButton />

      <button onClick={() => bonderDeposit()}>Bonder Deposit</button>

      <h5>{allUserBonds.length} Bonds</h5>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allUserBonds.length &&
          allUserBonds.map((bond: any, i) => (
            <div
              key={i}
              style={{
                width: '30%',
                overflowX: 'auto',
                height: 'auto',
                backgroundColor: 'rgba(54, 56, 64, 0.4)',
                color: 'white',
                margin: '10px',
                padding: '4px 20px 20px',
                borderRadius: '4px',
              }}
            >
              <h4>
                Bonder: <br />
                {bond.account.bonder.toString()}
              </h4>
              <h4>
                Bond:
                <br />
                {bond.publicKey.toString()}
              </h4>
              <h4>
                NFTMint: <br />
                {bond.account.nftMint.toString()}
              </h4>
              <h4>
                Vesting Start:
                <br />
                {getISOString(+new BN(bond.account.vestingStart, 16))}
              </h4>
              <h4>
                Vesting Term: <br />
                {new BN(bond.account.vestingTerm, 16).toString()}
              </h4>
              <button
                onClick={() => redeemBond(bond.publicKey, bond.account.nftMint)}
              >
                Redeem Bond
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Index;
