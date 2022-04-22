import { Connection } from '@solana/web3.js';
import { Idl, Program, Wallet } from '@project-serum/anchor';

import { SolanaBond } from './facade';
import { DataProvider, OpModule } from 'core/types';
export interface SolanaModuleConfig {
  idl: Idl;
  wallet: Wallet;
  program: Program;
  connection: Connection;
  dataProvider: DataProvider;
}

export class SolanaModule implements OpModule {
  bond!: SolanaBond;

  constructor(config: SolanaModuleConfig) {
    this.bond = new SolanaBond(config);
  }
}
