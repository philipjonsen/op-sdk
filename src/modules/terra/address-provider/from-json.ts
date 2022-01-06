import { AddressProvider, COLLATERAL_DENOMS, MARKET_DENOMS } from './provider';

export interface AddressMap {
  //(aphex) we could possible use opaque types
  [key: string]: string;
  customBond: string;
  customTreasury: string;
  factory: string;
  subsidyRouter: string;
}

export type AllowedAddressKeys = keyof AddressMap;

export class AddressProviderFromJson implements AddressProvider {
  constructor(private data: AddressMap) {}

  customBond(): string {
    return this.data.customBond;
  }

  customTreasury(): string {
    return this.data.customBond;
  }

  factory(): string {
    return this.data.factory;
  }

  subsidyRouter(): string {
    return this.data.subsidyRouter;
  }

  getAddressByContractName(name: string): string {
    const address = this.data[name];
    if (!address) {
      throw new Error("AddressProvider doesn't include this address.");
    }
    return address;
  }
}
