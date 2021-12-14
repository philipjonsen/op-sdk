import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  fabricateDepositAsset,
  fabricateRedeemBond,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import {
  // queryMarketEpochState,
  queryBondInfo,
  queryBondPrice,
  queryConfig,
  queryCurrentDebt,
  queryCurrentOlympusFee,
  queryPayoutFor,
  queryState,
  StateResponse,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';
import { BLOCKS_PER_YEAR } from '../../constants';

// TODO (appleseed): fix for olympus
export type BondDepositAsset = OmitAddress<
  OptionType<typeof fabricateDepositAsset>
>;
export type BondWithdrawStableOption = OmitAddress<
  OptionType<typeof fabricateRedeemBond>
>;

export interface QueryOption {
  contractAddress: string;
}

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

export class Bond {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  depositAsset(depositAsset: BondDepositAsset): Operation {
    return new OperationImpl(
      fabricateDepositAsset,
      depositAsset,
      this._addressProvider,
    );
  }

  redeemBond(redeemBondOption: BondWithdrawStableOption): Operation {
    return new OperationImpl(
      fabricateRedeemBond,
      redeemBondOption,
      this._addressProvider,
    );
  }

  async getBondInfo({
    user,
    contractAddress: contract_address,
  }: GetBondInfoOption): Promise<unknown> {
    // const epochState = await queryMarketEpochState({
    //   lcd: this._lcd,
    //   market: getBondInfoOption.market,
    // })(this._addressProvider);
    // const userATerraBalance = await d({
    //   lcd: this._lcd,
    //   address: getBondInfoOption.address,
    //   token_address: this._addressProvider.aTerra(getBondInfoOption.market),
    // })(this._addressProvider);

    // return new Int(
    //   new Dec(epochState.exchange_rate).mul(userATerraBalance.balance),
    // )
    //   .div(1000000)
    //   .toString();
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

  // async getAPY(getAPYOption: GetApyOption): Promise<number> {
  //   const epochState = await queryOverseerEpochState({
  //     lcd: this._lcd,
  //     ...getAPYOption,
  //   })(this._addressProvider);
  //   return new Dec(epochState.deposit_rate).mul(BLOCKS_PER_YEAR).toNumber();
  // }
}
