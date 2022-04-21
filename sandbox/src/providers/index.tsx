import React from 'react';
import { MetaMaskProvider } from 'metamask-react';

const AppProviders: React.FC = ({ children }) => (
  <MetaMaskProvider>{children}</MetaMaskProvider>
);

export default AppProviders;
