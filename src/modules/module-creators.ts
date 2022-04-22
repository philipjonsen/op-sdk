import { Chain } from 'src/constants';
import { OpModule } from 'core/types';

import { TerraModule, TerraModuleConfig } from './terra';
import { SolanaModule, SolanaModuleConfig } from './solana';

type ModuleCreator = (config: ModuleConfig) => OpModule;
type Creators = { [key in Chain]: ModuleCreator };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModuleConfig = TerraModuleConfig | SolanaModuleConfig | any;

export const moduleCreators: Creators = {
  [Chain.TERRA]: (config: TerraModuleConfig) => new TerraModule(config),
  [Chain.SOLANA]: (config: SolanaModuleConfig) => new SolanaModule(config),
};
