import { Wallet } from '@project-serum/anchor';
import { DataProvider, OpModule } from 'core/types';
import { NetworkID } from 'src/constants';
import { SolanaBond } from './facade';

export interface SolanaModuleConfig {
  wallet: Wallet;
  dataProvider: DataProvider;
  networkId: NetworkID;
}

export class SolanaModule implements OpModule {
  bond!: SolanaBond;

  constructor(config: SolanaModuleConfig) {
    this.bond = new SolanaBond(config);
  }
}
