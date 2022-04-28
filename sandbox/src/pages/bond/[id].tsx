import Identicon from 'react-identicons';
import { BN } from '@project-serum/anchor';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';

import { shorten } from '../../utils/solana';
import { LinkIcon } from '../../components/LinkIcon';
import useSolanaWorkspace from '../../hooks/useSolanaWorkspace';

const Bond: NextPage = () => {
  const router = useRouter();
  const { sdk, wallet } = useSolanaWorkspace();
  const { id, treasury } = router.query;
  const [amount, setAmount] = useState<string | number>('');
  const [bondDetails, setBondDetails] = useState<any>({});
  const [principalTokenBalance, setPrincipalTokenBalance] = useState<number>(0);
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [maxPayoutToken, setMaxPayoutToken] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (treasury) {
        const bonds = await sdk.bond.getAllBonders();
        const treasuryInfo = await sdk.bond.getTreasuryInfo(
          treasury.toString(),
        );

        const maxPayoutAmount = await sdk.bond.getSpecificTreasuryData(
          treasury.toString(),
        );
        setMaxPayoutToken(maxPayoutAmount.value.uiAmount);

        const bondInfo = bonds.find(
          ({ account }: any) => treasury === account.treasury.toString(),
        );
        setBondDetails({
          ...treasuryInfo,
          ...bondInfo?.account,
        });
      }
    })();
  }, [treasury]);

  useEffect(() => {
    (async () => {
      if (wallet.connected) {
        if (
          bondDetails.principalToken !== '' &&
          bondDetails.principalToken !== undefined
        ) {
          const details = await sdk.bond.getPrincipalTokenBalanceForUser(
            bondDetails.principalToken,
          );
          if (details.length) {
            const { tokenAmount } = details[0].account.data.parsed.info;
            setPrincipalTokenBalance(tokenAmount.uiAmount);
          }
        }

        if (
          bondDetails.maxPayoutPercent !== undefined &&
          bondDetails.payoutToken !== '' &&
          bondDetails.payoutToken !== undefined
        ) {
          // const maxPayoutPercent = new BN(bondDetails.maxPayoutPercent)
          //   .div(new BN(Math.pow(10, 3)))
          //   .toNumber();

          // const details = await sdk.bond.getTokenSupply(
          //   bondDetails.payoutToken,
          // );
          // if (details?.value?.uiAmount) {
          //   setMaxPayoutToken(
          //     (details.value.uiAmount * maxPayoutPercent) / 100,
          //   );
          // }
        }
      }
    })();
  }, [bondDetails]);

  const purchaseBond = async () => {
    if (!wallet || !wallet.signTransaction) throw new WalletNotConnectedError();
    if (amount === 0 || amount > principalTokenBalance) {
      throw new Error('Amount and maxPrice cannot be set as 0');
    }
    const { payoutToken, principalToken } = await sdk.bond.getTreasuryInfo(
      treasury,
    );

    await sdk.bond.purchaseBond({
      amount,
      maxPrice: amount,
      treasury,
      payoutToken,
      principalToken,
    });
    router.push('/bond');
  };

  return (
    <div className="bond bond-card">
      <h2 className="bond-title">{id && shorten(id.toString(), 12)}</h2>
      <div className="bond-content">
        <div style={{ height: '80px' }}>
          {bondDetails?.principalToken && (
            <>
              <Identicon
                size={35}
                count={5}
                bg="white"
                string={bondDetails.principalToken.toString()}
              />
              {/* {console.log(
                'principalToken',
                bondDetails.principalToken.toString(),
              )}
              {console.log('payoutToken', bondDetails.payoutToken.toString())} */}
            </>
          )}
          <div style={{ marginTop: '10px' }}>You Give</div>
        </div>
        <div style={{ height: '80px' }}>
          <div>
            <img
              src="https://pro.olympusdao.finance/static/media/Clock.5190707bed35f35aada2725920ecd865.svg"
              width="35"
              height="35"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            Vesting over {new BN(bondDetails.vestingTerm).toString()} days
          </div>
        </div>
        <div style={{ height: '80px' }}>
          {bondDetails?.payoutToken && (
            <Identicon
              size={35}
              count={5}
              bg="white"
              string={bondDetails.payoutToken.toString()}
            />
          )}
          <div style={{ marginTop: '10px' }}>You Get</div>
        </div>
      </div>

      <div style={{ margin: '25px auto 30px', width: '90%' }}>
        {principalTokenBalance !== 0 ? (
          <div style={{ display: 'flex' }}>
            <div
              style={{ width: '76%', marginRight: '2%', position: 'relative' }}
            >
              <input
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '3px',
                  color: 'white',
                  background: 'transparent',
                  outline: 'none',
                  border: '1px solid silver',
                }}
                type="text"
                value={amount}
                onInput={(e: any) => setAmount(+e.target.value)}
              />
              <span
                onClick={() => setAmount(principalTokenBalance)}
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  right: '15px',
                  top: '8px',
                }}
              >
                Max
              </span>
            </div>
            <button className="bond-btn" onClick={() => purchaseBond()}>
              Bond
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p
              style={{
                color: '#8E9DBA',
                fontSize: '16px',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              We could not detect the principal token in your wallet!!
              <br />
              {bondDetails.principalToken && (
                <span style={{ fontSize: '13px', color: 'white' }}>
                  {bondDetails.principalToken.toString()}
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      <div style={{ margin: '30px auto 0', width: '90%' }}>
        {bondDetails?.principalToken && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Your Balance</span>
            <span>
              {principalTokenBalance}{' '}
              {shorten(bondDetails.principalToken.toString(), 2)}
            </span>
          </div>
        )}
      </div>
      {bondDetails?.payoutToken && (
        <div style={{ margin: '15px auto 0', width: '90%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>You will get</span>
            <span>
              {payoutAmount} {shorten(bondDetails.payoutToken.toString(), 2)}
            </span>
          </div>
        </div>
      )}
      {bondDetails?.payoutToken && (
        <div style={{ margin: '15px auto 0', width: '90%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Max</span>
            <span>
              {maxPayoutToken} {shorten(bondDetails.payoutToken.toString(), 2)}
            </span>
          </div>
        </div>
      )}
      <div style={{ margin: '15px auto 0', width: '90%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>ROI</span>
          <span>N/A</span>
        </div>
      </div>
      <div style={{ margin: '15px auto 0', width: '90%' }}>
        {bondDetails?.vestingTerm && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Vesting Term</span>
            <span>{new BN(bondDetails.vestingTerm).toString()} days</span>
          </div>
        )}
      </div>
      <div style={{ margin: '15px auto', width: '90%' }}>
        {bondDetails?.vestingTerm && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Bond Contract</span>
            <a
              style={{ display: 'flex', alignItems: 'center' }}
              href={`https://explorer.solana.com/address/${bondDetails.bonder}?cluster=devnet`}
              target="_blank"
            >
              <span style={{ marginRight: '4px', fontSize: '15px' }}>View</span>
              <LinkIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bond;
