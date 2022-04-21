import React from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const SolanaWallet: React.FC<{ autoConnect?: boolean }> = (props) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);
  const wallets = React.useMemo(() => [new PhantomWalletAdapter()], [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={props.autoConnect || true}>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWallet;
