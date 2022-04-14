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

import { Idl, Wallet } from '@project-serum/anchor';
import fabricatePurchaseBond from '../../fabricators/bond/purchase-bond';
import fabricateRedeemBond from '../../fabricators/bond/redeem-bond';
import { Cluster } from '@solana/web3.js';

export interface GetBondInfoOption extends QueryOption {
  user: string;
}

export interface GetPayoutForOption extends QueryOption {
  value: string;
}

export class SolanaBond implements BondModule {
  wallet: Wallet;
  networkId: Cluster;
  dataProvider: DataProvider;
  idl: Idl;

  constructor(config: SolanaModuleConfig) {
    this.wallet = config.wallet;
    this.networkId = config.networkId;
    this.dataProvider = config.dataProvider;
    this.idl = config.idl;

    console.log('SolanaBond Config', config);
  }

  purchaseBond({ bond, value }: PurchaseBondOptions) {
    const fabricator = fabricatePurchaseBond({
      //takes method/contract specifics
    });
    return new SolanaOperation(
      this.networkId,
      this.wallet,
      this.idl,
      fabricator,
    ).execute();
  }

  redeemBond({ bond }: Options) {
    const fabricator = fabricateRedeemBond({
      //method/contract args
    });

    return new SolanaOperation(
      this.networkId,
      this.wallet,
      this.idl,
      fabricator,
    ).execute();
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
