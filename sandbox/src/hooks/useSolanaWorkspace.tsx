import { useMemo, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import SDKBuilder, { Chain, NetworkID } from '@olympusdao/op.js';

import idl from '../idl/olympuspro_sol.json';

const useSolanaWorkspace = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [sdk, setSdk] = useState<any>();

  useMemo(() => {
    const config = { idl, wallet, connection };
    const sdk = SDKBuilder.addModule(Chain.SOLANA, config).build();
    setSdk(sdk.of(NetworkID.Solana_Mainnet));
  }, [wallet]);

  return { sdk, wallet, connection };
};

export default useSolanaWorkspace;
