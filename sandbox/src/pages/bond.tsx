import Identicon from 'react-identicons';
import { BN } from '@project-serum/anchor';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { Fragment, useEffect, useState } from 'react';

import { LinkIcon } from '../components/LinkIcon';
import { getFormattedDate, shorten } from '../utils/solana';
import useSolanaWorkspace from '../hooks/useSolanaWorkspace';

const Bond: NextPage = () => {
  const router = useRouter();
  const { sdk, wallet } = useSolanaWorkspace();
  const [allBonds, setAllBonds] = useState([]);
  const [userBonds, setUserBonds] = useState([]);

  useEffect(() => {
    getUserBonds();
  }, [wallet]);

  useEffect(() => {
    (async () => {
      const bondsList: any = [];
      const whitelistedPartners = await sdk.bond.getAllPartners();
      await Promise.all(
        await (
          await sdk.bond.getAllBonders()
        )
          .filter((bond: any) =>
            whitelistedPartners.includes(bond.account.treasury.toString()),
          )
          .map(async (bond: any) => {
            const { bonder, treasury, payoutToken } =
              await sdk.bond.getTreasuryInfo(bond.account.treasury.toString());
            bondsList.push({
              bonder,
              treasury,
              payoutToken,
              maxDebt: bond.account.maxDebt,
              vestingTerm: bond.account.vestingTerm,
              principalToken: bond.account.mint,
              maxPayoutPercent: bond.account.maxPayoutPercent,
              minimumPrice: bond.account.minimumPrice,
              totalBonded: bond.account.totalBonded,
              totalDebt: bond.account.totalDebt,
            });
          }),
      );
      setAllBonds(bondsList);
    })();
  }, []);

  const getUserBonds = async () => {
    if (wallet.connected) {
      setUserBonds(await sdk.bond.getUserBondInfo());
    }
  };

  const redeemBond = async (bond: any) => {
    if (!wallet || !wallet.signTransaction) throw new WalletNotConnectedError();
    const { payoutToken, principalToken } = await sdk.bond.getTreasuryInfo(
      bond.account.treasury,
    );
    await sdk.bond.redeemBond({
      bond: bond.publicKey,
      nftMint: bond.account.nftMint,
      treasury: bond.account.treasury,
      payoutToken,
      principalToken,
    });
    getUserBonds();
  };

  return (
    <main style={{ margin: '20px 0' }}>
      {/* {console.log('userBonds', userBonds)} */}
      {userBonds.length > 0 && wallet.publicKey ? (
        <div className="bond-card">
          {userBonds
            ?.sort(
              (a: any, b: any) =>
                a.account.vestingStart - b.account.vestingStart,
            )
            ?.map((bond: any, i: number) => (
              <Fragment key={i}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#FCFCFC',
                    overflow: 'hidden',
                    margin: '20px 0',
                    fontWeight: 400,
                    fontSize: '15px',
                  }}
                >
                  <div
                    style={{
                      width: '30%',
                      overflow: 'hidden',
                    }}
                  >
                    <a
                      style={{ display: 'flex', alignItems: 'center' }}
                      href={`https://explorer.solana.com/address/${bond.publicKey.toString()}?cluster=devnet`}
                      target="_blank"
                    >
                      <span style={{ marginRight: '4px', fontSize: '15px' }}>
                        {shorten(bond.publicKey.toString())}
                      </span>
                      <LinkIcon />
                    </a>
                  </div>
                  <div
                    style={{
                      width: '30%',
                      overflow: 'hidden',
                    }}
                  >
                    {shorten(bond.account.nftMint.toString())}
                  </div>
                  <div
                    style={{
                      width: '20%',
                      overflow: 'hidden',
                    }}
                  >
                    {getFormattedDate(+new BN(bond.account.vestingStart, 16))}
                  </div>
                  <div
                    style={{
                      width: '10%',
                      textAlign: 'center',
                    }}
                  >
                    {new BN(bond.account.vestingTerm, 16).toString()}
                  </div>
                  <div style={{ width: '10%', marginLeft: '20px' }}>
                    <button
                      style={{
                        color: '#333333',
                        height: '30px',
                        border: 0,
                        fontWeight: 500,
                        fontSize: '15px',
                        borderRadius: '3px',
                        backgroundColor: '#F8CC82',
                        width: '100%',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                      onClick={() => redeemBond(bond)}
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
      ) : null}

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {allBonds
          ?.sort((a: any, b: any) => a.treasury - b.treasury)
          .map((bond: any, i) => (
            <div key={i} className="bond-card">
              <p>Treasury: {shorten(bond.treasury, 8)}</p>
              <p>Bonder: {shorten(bond.bonder, 8)}</p>
              <p>
                Principal Token:
                <Identicon
                  size={50}
                  count={5}
                  bg="white"
                  string={bond.principalToken}
                />
              </p>
              <Identicon
                size={50}
                count={5}
                bg="white"
                string={bond.payoutToken}
              />
              <p>
                Principal Token: {shorten(bond.principalToken.toString(), 3)}
              </p>
              <p>Payout Token: {shorten(bond.payoutToken, 3)}</p>
              <p>Min Price: {new BN(bond.minimumPrice).toString()}</p>
              <p>Max Debt: {(bond.maxDebt / Math.pow(10, 18)).toFixed(2)}%</p>
              <p>
                Max Payout:{' '}
                {new BN(bond.maxPayoutPercent)
                  .div(new BN(Math.pow(10, 3)))
                  .toString()}
                %
              </p>
              <p>Vesting Term: {new BN(bond.vestingTerm).toString()}</p>
              <p>Total Debt: {new BN(bond.totalDebt).toString()}</p>
              <p>Total Bonded: {new BN(bond.totalBonded).toString()}</p>
              <button
                onClick={() =>
                  router.push({
                    pathname: `/bond/${bond.bonder}`,
                    query: {
                      treasury: bond.treasury,
                    },
                  })
                }
              >
                Bond
              </button>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Bond;
