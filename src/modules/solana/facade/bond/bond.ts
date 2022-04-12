/* eslint-disable */
import { NetworkID } from 'src/constants';
import { BondModule, QueryOption } from 'src/core/types';
import { SolanaModuleConfig } from '../..';
import { SolanaOperation } from '../../operations';
import { DataProvider } from 'src/core';
import {
  PurchaseBondOptions,
  GetBondPayoutOptions,
  Options,
  GetUserBondBalancesOptions,
} from 'src/core';

import { Wallet } from '@project-serum/anchor';
export interface GetBondInfoOption extends QueryOption {
  user: string;
}

export interface GetPayoutForOption extends QueryOption {
  value: string;
}

export class SolanaBond implements BondModule {
  wallet: Wallet;
  networkId: NetworkID;
  dataProvider: DataProvider;

  constructor(config: SolanaModuleConfig) {
    this.wallet = config.wallet;
    this.networkId = config.networkId;
    this.dataProvider = config.dataProvider;

    console.log('SolanaBond Config', config);
  }

  purchaseBond({ bond, value }: PurchaseBondOptions) {
    return Promise.resolve();
  }

  redeemBond({ bond }: Options) {
    return Promise.resolve();
  }

  redeemAllBonds() {
    return Promise.resolve();
  }

  getBondPayout({ bond, value }: GetBondPayoutOptions) {
    return Promise.resolve();
  }

  getUserBondBalances({ filterByNetwork = false }: GetUserBondBalancesOptions) {
    return Promise.resolve();
  }

  getUserBondInfo({ bond }: Options) {
    return Promise.resolve();
  }

  getBondCalculations({ bond }: Options) {
    return Promise.resolve();
  }
}
