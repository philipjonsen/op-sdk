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
  redeemBond: (options: ReedeemOptions) => unknown;
  // queries
  getBondInfo: (option: QueryOption) => unknown;
  getConfig: (option: QueryOption) => unknown;
  getPayoutFor: (option: QueryOption) => unknown;
  getCurrentOlympusFee: (option: QueryOption) => unknown;
  getState: (option: QueryOption) => unknown;
}

export type Modules = {
  [key in Chain]?: OpModule;
};
