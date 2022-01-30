import { Chain, NetworkID, supportedNetworkDetails } from 'src/constants';
import { moduleCreators, ModuleConfig } from 'modules';
import { Modules, OpModule, SDK } from 'core/types';

export class SDKBuilder {
  modules?: Modules;

  addModule(name: Chain, config: ModuleConfig): SDKBuilder {
    if (!this.modules) this.modules = {};

    const createModule = moduleCreators[name];

    this.modules[name] = createModule(config);

    return this;
  }

  build(): SDK {
    if (!this.modules) {
      throw new Error("Can't initialize SDK without at least one module");
    }

    return createSDK(this.modules);
  }
}

export const createSDK = (modules: Modules): SDK => {
  return function (networkID: NetworkID): OpModule {
    const chain = supportedNetworkDetails[networkID]?.chain;

    if (!modules[chain]) {
      throw new Error('OlympusSDK called with an unsupported chain id');
    }

    return modules[chain] as OpModule;
  };
};
