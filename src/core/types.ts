/* eslint-disable @typescript-eslint/no-explicit-any */
import { TerraBond } from 'modules/terra/facade';
import { SolanaBond } from 'modules/solana/facade';
import { NetworkID, Chain } from 'src/constants';

export interface QueryOption {
  contractAddress: string;
}

export interface SlippageToleranceConfig {
  beliefPrice: string;
  maxSpread: string;
}

export interface OpModule {
  bond: TerraBond | SolanaBond;
}

export interface DepositOptions {
  a: unknown;
}

export interface ReedeemOptions {
  a: unknown;
}

export interface DataProvider {
  bonds: { [key: string]: string };
  tokenAddresses: { [key: string]: string };
  tokenPrices: { [key: string]: string };
}

export interface Bond {
  name: string;
}

export interface Options {
  bond: Bond;
  address?: string;
}

export interface PurchaseBondOptions extends Options {
  amount: number;
  maxPrice: number;
  treasury: string;
  payoutToken: string;
  principalToken: string;
}

export interface RedeemBondOptions extends Options {
  bond: any;
  nftMint: string;
  treasury: string;
  payoutToken: string;
  principalToken: string;
}

export interface ReedeemAllBondsOptions extends Omit<Options, 'bond'> {
  bonds: Array<Bond>;
}

export interface GetBondPayoutOptions extends Omit<Options, 'address'> {
  value: number;
}

export interface GetUserBondBalancesOptions extends Omit<Options, 'bond'> {
  filterByNetwork: boolean;
}

export interface BondModule {
  purchaseBond: (options: PurchaseBondOptions | any) => Promise<unknown> | any;
  redeemBond: (options: RedeemBondOptions | any) => Promise<unknown> | any;
  // Get payout details for a single bond
  getBondPayout?: (option: GetBondPayoutOptions) => Promise<unknown>;
  // Get total user bond balance
  getUserBondBalances?: (
    option: GetUserBondBalancesOptions,
  ) => Promise<unknown>;
  // Get a single user bond balance and details
  getUserBondInfo: (option?: Options | any) => Promise<unknown> | any;
  getBondCalculations?: (option: Options) => Promise<unknown>;
}

export type Modules = {
  [key in Chain]?: OpModule;
};

export type SDK = (networkID: NetworkID) => OpModule;

export interface BaseOperation<T, R> {
  execute: (args: T) => R;
}
