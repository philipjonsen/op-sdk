import { useMemo, useState } from 'react';
import { Provider, Program } from '@project-serum/anchor';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import SDKBuilder, { Chain, NetworkID } from '@olympusdao/op.js';

import idl from '../idl/olympuspro_sol.json';
import SolanaUtils, { getPublicKey } from '../utils/solana';

const useSolanaUtils = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [sdk, setSdk] = useState<any>();
  const [program, setProgram] = useState<Program>();
  const [allUtils, setAllUtils] = useState<any>();

  useMemo(() => {
    if (wallet.connected) {
      const programId = getPublicKey('programId');
      const provider = new Provider(connection, wallet as any, {});
      const program = new Program(idl as any, programId, provider);
      setProgram(program);
      setAllUtils(new SolanaUtils(program));

      const config: any = { idl, wallet, connection, program };
      const sdk = SDKBuilder.addModule(Chain.SOLANA, config).build();
      setSdk(sdk.of(NetworkID.Solana_Mainnet));
    }
  }, [wallet]);

  return { sdk, program, wallet, connection, ...allUtils };
};

export default useSolanaUtils;
