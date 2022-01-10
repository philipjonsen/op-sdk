import { Chain, NetworkID, supportedNetworkDetails } from '..';
import { Modules, OpModule, SDK } from './types';
import { moduleCreators, ModuleConfig } from '../modules';

export const createSDK = (modules: Modules): SDK => {
  return (networkID: NetworkID): OpModule => {
    const chain = supportedNetworkDetails[networkID].chain;

    if (!modules[chain]) {
      throw new Error('OlympusSDK called with an unsupported chain id');
    }

    return modules[chain] as OpModule;
  };
};

export class SDKBuilder {
  modules?: Modules;

  addModule(name: Chain, config: ModuleConfig): SDKBuilder {
    if (!this.modules) this.modules = {};
    const creator = moduleCreators[name];

    this.modules[name] = creator(config);

    return this;
  }

  build(): SDK {
    if (!this.modules) {
      throw new Error("Can't initialize SDK without at least one module");
    }

    return createSDK(this.modules);
  }
}
