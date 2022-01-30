import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from 'modules/terra/address-provider';
import {
  fabricateDepositAsset,
  fabricateRedeemBond,
  OmitAddress,
  OptionType,
} from 'modules/terra/fabricators';
import {
  queryBondInfo,
  queryBondPrice,
  queryConfig,
  queryCurrentDebt,
  queryCurrentOlympusFee,
  queryPayoutFor,
  queryState,
  StateResponse,
} from 'modules/terra/queries';
import { Operation, OperationImpl } from 'core/operation';

import { BondModule, QueryOption } from 'modules/types/bond';

// TODO (appleseed): fix for olympus
export type BondDepositAsset = OmitAddress<
  OptionType<typeof fabricateDepositAsset>
>;
export type BondWithdrawStableOption = OmitAddress<
  OptionType<typeof fabricateRedeemBond>
>;

export interface GetBondInfoOption extends QueryOption {
  user: string;
}

// TODO (appleseed): should this be number? BigNumber on evm pro
export interface GetPayoutForOption extends QueryOption {
  value: string;
}

export interface GetApyOption {
  market: MARKET_DENOMS;
}

export class TerraBond implements BondModule {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  depositAsset(depositAssetOptions: BondDepositAsset): Operation {
    return new OperationImpl(
      fabricateDepositAsset,
      depositAssetOptions,
      this._addressProvider,
    );
  }

  redeemBond(redeemBondOptions: BondWithdrawStableOption): Operation {
    return new OperationImpl(
      fabricateRedeemBond,
      redeemBondOptions,
      this._addressProvider,
    );
  }

  async getBondInfo({
    user,
    contractAddress: contract_address,
  }: GetBondInfoOption): Promise<unknown> {
    return await queryBondInfo({
      lcd: this._lcd,
      contract_address,
      user,
    })(this._addressProvider);
  }

  async getBondPrice({ contractAddress }: QueryOption): Promise<unknown> {
    const bondPrice = await queryBondPrice({
      lcd: this._lcd,
      contract_address: contractAddress,
    })(this._addressProvider);
    return bondPrice;
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  async getConfig({ contractAddress }: QueryOption): Promise<unknown> {
    const config = await queryConfig({
      lcd: this._lcd,
      contract_address: contractAddress,
    })(this._addressProvider);
    return config;
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  // 1. is payout_total_supply a req'd parameter?
  async getPayoutFor({
    contractAddress,
    value,
  }: GetPayoutForOption): Promise<unknown> {
    const payoutFor = await queryPayoutFor({
      lcd: this._lcd,
      contract_address: contractAddress,
      value,
    })(this._addressProvider);
    return payoutFor;
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  // 1. is current_time a req'd parameter?
  async getCurrentDebt({ contractAddress }: QueryOption): Promise<unknown> {
    const currentDebt = await queryCurrentDebt({
      lcd: this._lcd,
      contract_address: contractAddress,
    })(this._addressProvider);
    return currentDebt;
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  async getCurrentOlympusFee({
    contractAddress,
  }: QueryOption): Promise<unknown> {
    const debtRatio = await queryCurrentOlympusFee({
      lcd: this._lcd,
      contract_address: contractAddress,
    })(this._addressProvider);
    return debtRatio;
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  async getState({ contractAddress }: QueryOption): Promise<StateResponse> {
    const state = await queryState({
      lcd: this._lcd,
      contract_address: contractAddress,
    })(this._addressProvider);
    return state;
  }
}
