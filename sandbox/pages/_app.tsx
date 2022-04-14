import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WagmiProvider, defaultChains } from 'wagmi';
import type { AppProps } from 'next/app';

import SolanaWallet from '../components/SolanaWallet';

import '../styles/globals.css';

const connectors = [
  new InjectedConnector({ chains: defaultChains }),
  new WalletConnectConnector({
    chains: defaultChains,
    options: {
      infuraId: 'Your infura id',
      qrcode: true,
    },
  }),
];

const MyApp = ({ Component, pageProps }: AppProps | any) => (
  <WagmiProvider autoConnect={false} connectors={connectors}>
    <SolanaWallet autoConnect={false}>
      <Component {...pageProps} />
    </SolanaWallet>
  </WagmiProvider>
);

export default MyApp;
