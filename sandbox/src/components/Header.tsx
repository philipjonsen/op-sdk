import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1024px',
      margin: '0 auto',
      textAlign: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Link href="/bond">
      <h2 style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <img
          alt="logo"
          src="https://pro.olympusdao.finance/static/media/OlympusProLogo.dc3fbcfa12ae01a419efec433dad77b4.svg"
        />
        <span
          style={{
            background: 'white',
            color: '#2b313d',
            padding: '3px 6px',
            borderRadius: '2px',
            fontSize: '9px',
            marginLeft: '8px',
            marginTop: '8px',
            letterSpacing: '-0.5px',
          }}
        >
          SDK Sandbox
        </span>
      </h2>
    </Link>
    <div style={{ display: 'flex' }}>
      <button className="connect wallet-adapter-button">Solana</button>
      <WalletMultiButton className="connect" />
    </div>
  </div>
);

export default Header;
