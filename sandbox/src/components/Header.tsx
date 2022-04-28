import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    }}
  >
    <Link href="/bond">
      <h2 style={{ cursor: 'pointer' }}>Solana SDK Sandbox</h2>
    </Link>
    <div>
      <WalletMultiButton className="connect" />
    </div>
  </div>
);

export default Header;
