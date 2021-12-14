import { AddressProvider, COLLATERAL_DENOMS, MARKET_DENOMS } from './provider';

export interface AddressMap {
  customBond: string;
}

export type AllowedAddressKeys = keyof AddressMap;

// export class AddressProviderFromJson implements AddressProvider {
//   constructor(private data: AddressMap) {}
//
//   customBond(): string {
//     return this.data.customBond;
//   }
// }
