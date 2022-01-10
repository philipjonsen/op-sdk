import { Modules, NetworkID, supportedNetworkDetails, SDK } from '..';
import { OpModule } from './types';

export const createSDK = (modules: Modules): SDK => {
  return (networkID: NetworkID): OpModule => {
    const chain = supportedNetworkDetails[networkID].chain;

    if (!modules[chain]) {
      throw new Error('OlympusSDK called with an unsupported chain id');
    }

    return modules[chain] as OpModule;
  };
};
