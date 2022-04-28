import type { AppProps } from 'next/app';

import AppProviders from '../providers';
import Header from '../components/Header';
import SolanaWallet from '../components/SolanaWallet';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps | any) => (
  <AppProviders>
    <SolanaWallet>
      <Header />
      <Component {...pageProps} />
    </SolanaWallet>
  </AppProviders>
);

export default MyApp;
