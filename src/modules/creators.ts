import { Chain } from '..';
import { OpModule } from '..';
import { TerraModule, TerraModuleConfig } from './terra';

type ModuleCreator = (config: ModuleConfig) => OpModule;
type Creators = { [key in Chain]: ModuleCreator };

export type ModuleConfig = TerraModuleConfig;

export const moduleCreators: Creators = {
  [Chain.TERRA]: (config: TerraModuleConfig) => new TerraModule(config),
  [Chain.SOLANA]: () => ({} as OpModule),
};
