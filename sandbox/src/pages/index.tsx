import type { NextPage } from 'next';
import { BN } from '@project-serum/anchor';
import { Fragment, useEffect, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';

import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';

import useSolanaUtils from '../hooks/useSolanaUtils';

const getFormattedDate = (timestamp: number) =>
  format(fromUnixTime(timestamp), 'yyyy-MM-dd HH:mm:ss');

const shorten = (str: string, len: number = 10) => {
  if (str.length < 10) return str;
  return `${str.slice(0, len)}...${str.slice(str.length - len)}`;
};

const Index: NextPage = () => {
  const { sdk, wallet } = useSolanaUtils();
  const [amount, setAmount] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [allUserBonds, setAllUserBonds] = useState([]);

  useEffect(() => {
    if (wallet.connected) {
      getUserBondInfo();
    }
    if (!wallet.publicKey) {
      setAllUserBonds([]);
    }
  }, [wallet]);

  const getUserBondInfo = async () =>
    setAllUserBonds(await sdk.bond.getUserBondInfo());

  const bonderDeposit = async () => {
    if (!wallet || !wallet.signTransaction) throw new WalletNotConnectedError();
    if (amount === 0 || maxPrice === 0) {
      throw new Error('Amount and maxPrice cannot be set as 0');
    }
    await sdk.bond.purchaseBond({ amount, maxPrice });
    getUserBondInfo();
  };

  const redeemBond = async (bond: string, nftMint: string) => {
    if (!wallet || !wallet.signTransaction) throw new WalletNotConnectedError();
    await sdk.bond.redeemBond({ bond, nftMint });
    getUserBondInfo();
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>Solana SDK Sandbox</h2>
        <div>
          <WalletMultiButton className="connect" />
        </div>
      </div>

      <main style={{ margin: '20px 0' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 400,
            padding: '18px',
            marginBottom: '20px',
            borderRadius: '3px',
            color: '#856404',
            backgroundColor: '#fff3cd',
            borderColor: '#ffeeba',
          }}
        >
          This page is specific to the following bond address
          <strong> 28e4LSSTfqKmsocNjTgGWahjWMo56tngLXb6HoUGTo4u</strong> only at
          the moment and does not include every available bond.
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '25%', marginRight: '15px' }}>
            <div
              style={{
                width: '100%',
                color: '#FAFAFB',
                padding: '6px 20px 20px',
                marginBottom: '20px',
                borderRadius: '6px',
                background:
                  'linear-gradient(237.43deg, #2B313D -12.81%, #171A20 132.72%)',
              }}
            >
              <h5
                style={{
                  fontSize: '24px',
                  textAlign: 'center',
                  marginTop: '25px',
                  marginBottom: '25px',
                }}
              >
                {shorten('28e4LSSTfqKmsocNjTgGWahjWMo56tngLXb6HoUGTo4u', 3)}{' '}
                Bond
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: '15px',
                    fontFamily: 'Square',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  Amount:
                </label>
                <input
                  type="number"
                  style={{
                    color: '#FCFCFC',
                    border: 'none',
                    background: 'rgba(54, 56, 64, 0.4)',
                    borderRadius: '3px',
                    padding: '14px',
                  }}
                  value={amount}
                  onInput={(e: any) => setAmount(+e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  style={{
                    fontSize: '15px',
                    fontFamily: 'Square',
                    fontWeight: 500,
                    marginTop: '15px',
                    marginBottom: '8px',
                  }}
                >
                  Max Price:
                </label>
                <input
                  type="number"
                  style={{
                    color: '#FCFCFC',
                    border: 'none',
                    background: 'rgba(54, 56, 64, 0.4)',
                    borderRadius: '3px',
                    padding: '14px',
                  }}
                  value={maxPrice}
                  onInput={(e: any) => setMaxPrice(+e.target.value)}
                />
              </div>
              <button
                style={{
                  marginTop: '20px',
                  color: '#333333',
                  height: '43px',
                  border: 0,
                  fontWeight: 500,
                  fontSize: '16px',
                  borderRadius: '3px',
                  padding: '0 25px',
                  width: '100%',
                  backgroundColor: '#F8CC82',
                  cursor: 'pointer',
                }}
                onClick={bonderDeposit}
              >
                Bond
              </button>
            </div>
          </div>
          <div style={{ width: '75%' }}>
            <div
              style={{
                width: '100%',
                color: '#FAFAFB',
                padding: '6px 30px 20px',
                borderRadius: '6px',
                background:
                  'linear-gradient(237.43deg, #2B313D -12.81%, #171A20 132.72%)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px',
                }}
              >
                <h5
                  style={{
                    fontSize: '24px',
                    marginTop: '25px',
                    marginBottom: '20px',
                    fontWeight: 600,
                  }}
                >
                  Purchased Bonds{' '}
                  <span style={{ fontSize: '12px', fontWeight: 400 }}>
                    (
                    {wallet.publicKey
                      ? wallet.publicKey?.toString()
                      : 'Wallet Not Connected'}
                    )
                  </span>
                </h5>
              </div>

              {allUserBonds.length > 0 && wallet.publicKey ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      width: '30%',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    Bond Address
                  </div>
                  <div
                    style={{
                      width: '30%',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    NFT Mint Address
                  </div>
                  <div
                    style={{
                      width: '20%',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    Vesting Start
                  </div>
                  <div
                    style={{
                      width: '10%',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    Term
                  </div>
                  <div style={{ width: '10%', marginLeft: '20px' }}>&nbsp;</div>
                </div>
              ) : null}

              {allUserBonds.length > 0 && wallet.publicKey ? (
                allUserBonds
                  ?.sort(
                    (a: any, b: any) =>
                      a.account.vestingStart - b.account.vestingStart,
                  )
                  ?.map((bond: any, i) => (
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
                          {shorten(bond.publicKey.toString())}
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
                          {getFormattedDate(
                            +new BN(bond.account.vestingStart, 16),
                          )}
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
                            onClick={() =>
                              redeemBond(bond.publicKey, bond.account.nftMint)
                            }
                          >
                            Redeem
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ))
              ) : (
                <div style={{ textAlign: 'center' }}>No Bonds Purchased</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
