import { useMemo, useState } from 'react';
import { Provider, Program } from '@project-serum/anchor';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

import idl from '../idl/olympuspro_sol.json';
import SolanaUtils, { getPublicKey } from '../utils/solana';

const useSolanaUtils = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<Program>();
  const [allUtils, setAllUtils] = useState<any>();

  useMemo(() => {
    const programId = getPublicKey('programId');
    const provider = new Provider(connection, wallet as any, {});
    const program = new Program(idl as any, programId, provider);
    setProgram(program);
    setAllUtils(new SolanaUtils(program));
  }, []);

  return { program, wallet, connection, ...allUtils };
};

export default useSolanaUtils;
