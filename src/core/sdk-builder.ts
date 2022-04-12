import { Chain, NetworkID, supportedNetworkDetails } from 'src/constants';
import { moduleCreators, ModuleConfig } from 'modules';
import { Modules, OpModule } from 'core/types';

export class SDKBuilder {
  modules?: Modules;

  addModule(name: Chain, config: ModuleConfig): SDKBuilder {
    if (!this.modules) this.modules = {};

    const createModule = moduleCreators[name];

    this.modules[name] = createModule(config);

    return this;
  }

  build(): OpSDK {
    if (!this.modules) {
      throw new Error(
        "OlympusSDK: Can't initialize SDK without at least one module",
      );
    }

    return new OpSDK(this.modules);
  }
}

export class OpSDK {
  modules: Modules;

  constructor(modules: Modules) {
    this.modules = modules;
  }

  of(networkID: NetworkID): OpModule {
    const chain = supportedNetworkDetails[networkID]?.chain;

    if (!this.modules[chain]) {
      throw new Error('OlympusSDK: called with an unsupported chain id');
    }

    return this.modules[chain] as OpModule;
  }
}
