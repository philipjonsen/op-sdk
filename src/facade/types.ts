import { TerraBond } from '../modules/terra/facade';
import { NetworkID, Chain } from '../constants';

export interface SlippageToleranceConfig {
  beliefPrice: string;
  maxSpread: string;
}

export interface OpModule {
  bond: TerraBond;
}

export interface DepositOptions {
  a: unknown;
}

export interface ReedeemOptions {
  a: unknown;
}

export interface QueryOption {
  contractAddress: string;
}

export interface BondModule {
  depositAsset: (options: DepositOptions) => unknown;
  redeemBond: (options: DepositOptions) => unknown;
  getBondInfo: (option: QueryOption) => unknown;
  getConfig: (option: QueryOption) => unknown;
  getPayoutFor: (option: QueryOption) => unknown;
  getCurrentOlympusFee: (option: QueryOption) => unknown;
  getState: (option: QueryOption) => unknown;
}

export type Modules = {
  [key in Chain]?: OpModule;
};

export type SDK = (networkID: NetworkID) => OpModule;
