import { PublicKey } from '@solana/web3.js';
import { Provider, Program } from '@project-serum/anchor';
import { useMemo, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

import idl from '../idl/olympuspro_sol.json';

const options: any = {
  commitment: 'processed',
  preflightCommitment: 'processed',
};

const programID = new PublicKey('61ZYzDJWf1KXdU6aEm6JEyE1z5Vjp3KHRSiKw9GAZaXp');

const useSolanaWorkspace = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [program, setProgram] = useState<any>();
  const [provider, setProvider] = useState<any>();

  useMemo(() => {
    const provider = new Provider(connection, wallet as any, options);
    const program = new Program(idl as any, programID, provider);
    setProgram(program);
    setProvider(provider);
  }, []);

  return {
    wallet,
    connection,
    provider,
    program,
  };
};

export default useSolanaWorkspace;
