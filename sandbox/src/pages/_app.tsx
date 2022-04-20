import type { AppProps } from 'next/app';

import AppProviders from '../providers';
import SolanaWallet from '../components/SolanaWallet';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps | any) => (
  <AppProviders>
    <SolanaWallet>
      <Component {...pageProps} />
    </SolanaWallet>
  </AppProviders>
);

export default MyApp;
