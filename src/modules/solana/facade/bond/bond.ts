/* eslint-disable */
import { BondModule, QueryOption } from 'modules/types/bond';

export interface GetBondInfoOption extends QueryOption {
  user: string;
}

export interface GetPayoutForOption extends QueryOption {
  value: string;
}

export class SolanaBond implements BondModule {
  constructor(config: unknown) {
    console.log('SolanaBond Config', config);
  }

  depositAsset(depositAssetOptions: any) {
    console.log({ depositAssetOptions });
    return null;
  }

  redeemBond(redeemBondOptions: any) {
    console.log({ redeemBondOptions });
    return null;
  }

  getBondInfo({ user, contractAddress }: GetBondInfoOption) {
    console.log({ user, contractAddress });
    return null;
  }

  getBondPrice({ contractAddress }: QueryOption) {
    console.log({ contractAddress });
    return null;
  }

  getConfig({ contractAddress }: QueryOption) {
    console.log({ contractAddress });
    return null;
  }

  getPayoutFor({ contractAddress, value }: GetPayoutForOption) {
    console.log({ value });
    console.log({ contractAddress });
    return null;
  }

  getCurrentDebt({ contractAddress }: QueryOption) {
    console.log({ contractAddress });
    return null;
  }

  getCurrentOlympusFee({ contractAddress }: QueryOption) {
    console.log({ contractAddress });
    return null;
  }

  getState({ contractAddress }: QueryOption) {
    console.log({ contractAddress });
    return null;
  }
}
