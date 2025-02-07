import { Chain } from 'src/constants';
import { OpModule } from 'core/types';

import { TerraModule, TerraModuleConfig } from './terra';
import { SolanaModule, SolanaModuleConfig } from './solana';

type ModuleCreator = (config: ModuleConfig) => OpModule;
type Creators = { [key in Chain]: ModuleCreator };

export type ModuleConfig = TerraModuleConfig & SolanaModuleConfig;

export const moduleCreators: Creators = {
  [Chain.TERRA]: (config: TerraModuleConfig) => new TerraModule(config),
  [Chain.SOLANA]: (config: SolanaModuleConfig) => new SolanaModule(config),
};
