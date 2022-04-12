import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SolanaWallet from '../components/SolanaWallet';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SolanaWallet>
    <Component {...pageProps} />
  </SolanaWallet>
);

export default MyApp;
