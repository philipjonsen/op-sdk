import { Connection } from '@solana/web3.js';
import { Idl, Wallet } from '@project-serum/anchor';

import { SolanaBond } from './facade';
import { OpModule } from 'core/types';

export interface SolanaModuleConfig {
  idl: Idl;
  wallet: Wallet;
  connection: Connection;
}

export class SolanaModule implements OpModule {
  bond!: SolanaBond;

  constructor(config: SolanaModuleConfig) {
    this.bond = new SolanaBond(config);
  }
}
