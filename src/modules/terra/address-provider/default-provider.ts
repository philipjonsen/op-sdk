import { AddressProvider } from '.';
import { columbus5 } from '.';

export const defaultAddressProvider: AddressProvider = {
  customBond: () => columbus5.customBond,
  customTreasury: () => columbus5.customTreasury,
  factory: () => columbus5.factory,
  subsidyRouter: () => columbus5.subsidyRouter,
  getAddressByContractName: (name) => name,
};
