import { OpModule, Chain } from '../..';

export interface DepositOptions {
  depositor: string;
  max_price: string;
}

export interface ReedeemOptions {
  a: unknown;
}

export interface QueryOption {
  contractAddress: string;
}

export interface BondModule {
  // writes
  depositAsset: (options: DepositOptions) => unknown;
  //TODO: implement option type
  redeemBond: (options: never) => unknown;
  // queries
  //TODO: implement option type
  getBondInfo: (option: never) => unknown;
  getConfig: (option: QueryOption) => unknown;
  //TODO: implement option type
  getPayoutFor: (option: never) => unknown;
  getCurrentOlympusFee: (option: QueryOption) => unknown;
  getState: (option: QueryOption) => unknown;
}

export type Modules = {
  [key in Chain]?: OpModule;
};
