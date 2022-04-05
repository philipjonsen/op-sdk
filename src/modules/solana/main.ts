import { OpModule } from 'core/types';
import { SolanaBond } from './facade';

export interface SolanaModuleConfig {
  connection?: unknown;
}

export class SolanaModule implements OpModule {
  bond!: SolanaBond;

  constructor(config: SolanaModuleConfig) {
    this.bond = new SolanaBond(config);
  }
}
