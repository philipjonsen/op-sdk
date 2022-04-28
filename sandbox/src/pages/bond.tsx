import Identicon from 'react-identicons';
import { BN } from '@project-serum/anchor';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { Fragment, useEffect, useState } from 'react';

import { LinkIcon } from '../components/LinkIcon';
import { getFormattedDate, shorten } from '../utils/solana';
import useSolanaWorkspace from '../hooks/useSolanaWorkspace';
import ProgressBar from '../components/ProgressBar';

const Bond: NextPage = () => {
  const router = useRouter();
  const { sdk, wallet } = useSolanaWorkspace();
  const [allBonds, setAllBonds] = useState([]);
  const [userBonds, setUserBonds] = useState([]);
  const [maxPayoutToken, setMaxPayoutToken] = useState<number>(0);

  useEffect(() => {
    if (wallet && allBonds) {
      getUserBonds();
    }
  }, [wallet, allBonds]);

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
            const maxPayoutAmount = await sdk.bond.getSpecificTreasuryData(
              treasury,
            );
            bondsList.push({
              bonder,
              treasury,
              payoutToken,
              displayName: bond.displayName,
              maxDebt: bond.account.maxDebt,
              vestingTerm: bond.account.vestingTerm,
              principalToken: bond.account.mint,
              maxPayoutPercent: bond.account.maxPayoutPercent,
              minimumPrice: bond.account.minimumPrice,
              totalBonded: bond.account.totalBonded,
              totalDebt: bond.account.totalDebt,
              maxPayoutAmount: maxPayoutAmount.value.uiAmount,
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

  const getBondDisplayName = (bonder: any) => {
    const all: any = allBonds.find(
      (bond: any) => bond.bonder === bonder,
    );
    return all?.displayName || '';
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

  const getMaxDebtForBond = async (treasury: any) => {
    const maxPayoutAmount = await sdk.bond.getSpecificTreasuryData(
      treasury.toString(),
    );
    return maxPayoutAmount.value.uiAmount;
  };

  return (
    <main style={{ margin: '20px 0' }}>
      {userBonds.length > 0 && wallet.publicKey ? (
        <div
          className="bond-card"
          style={{
            padding: '20px 72px',
            maxWidth: '1024px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
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
                        {/* {shorten(bond.publicKey.toString())} */}
                        {getBondDisplayName(bond.account.bonder.toString())}
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

      {allBonds.length ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <div
            className="bond-card"
            style={{
              padding: '30px 72px',
              maxWidth: '1024px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '14px',
                marginBottom: '20px',
                fontWeight: 500,
              }}
            >
              <div style={{ width: '35%' }}>Bonds</div>
              <div style={{ width: '20%', textAlign: 'left' }}>
                Payout Asset
              </div>
              <div style={{ width: '15%', textAlign: 'left' }}>ROI</div>
              <div style={{ width: '15%', textAlign: 'left' }}>TBV</div>
              <div style={{ width: '15%', textAlign: 'left' }}>&nbsp;</div>
            </div>
            {allBonds
              ?.sort((a: any, b: any) => a.treasury - b.treasury)
              .map((bond: any, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                  }}
                >
                  {/* <p>Treasury: {shorten(bond.treasury, 8)}</p> */}
                  {/* <p>Bonder: {shorten(bond.bonder, 8)}</p> */}
                  <div
                    style={{
                      width: '35%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Identicon
                      size={30}
                      count={5}
                      bg="white"
                      string={bond.principalToken}
                    />
                    <span style={{ fontSize: '16px', marginLeft: '25px' }}>
                      {bond.displayName}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '20%',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ position: 'relative', width: '40px' }}>
                      <Identicon
                        size={30}
                        count={5}
                        bg="white"
                        string={bond.payoutToken}
                      />
                      <div
                        style={{
                          fontSize: '9px',
                          marginTop: '-1px',
                          color: 'rgb(188, 208, 248)',
                          textShadow:
                            'rgb(0 0 0) -0.5px -0.5px 0px, rgb(0 0 0) 0.5px -0.5px 0px, rgb(0 0 0) -0.5px 0.5px 0px, rgb(0 0 0) 0.5px 0.5px 0px, rgb(0 0 0) 0.5px 0px 0px, rgb(0 0 0) -0.5px 0px 0px, rgb(0 0 0) 0px 0.5px 0px, rgb(0 0 0) 0px -0.5px 0px, rgb(0 0 0) 0px 0px 0.5px',
                        }}
                      >
                        {shorten(bond.payoutToken.toString(), 3)}
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '15%', textAlign: 'left' }}>0.00%</div>
                  <div style={{ width: '15%', textAlign: 'left' }}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(new BN(bond.totalBonded).toNumber())}
                    <ProgressBar
                      currentDebt={new BN(bond.totalBonded).toNumber()}
                      maxDebt={bond.maxPayoutAmount}
                    />
                    {console.log('ddddd', bond)}
                  </div>
                  {/* <p>
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
              <p>Total Bonded: {new BN(bond.totalBonded).toString()}</p> */}
                  <div style={{ width: '15%', textAlign: 'center' }}>
                    <button
                      className="bond-btn bond-btn-tertiary"
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
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Bond;
