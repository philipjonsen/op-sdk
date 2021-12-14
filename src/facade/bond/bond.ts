import { Int, Dec, LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  fabricateDepositAsset,
  fabricateRedeemBond,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import {
  // queryMarketEpochState,
  queryMaxPayout,
  queryBondInfo,
  queryTokenBalance,
  queryPayoutFor,
  queryCurrentDebt,
  queryDebtRatio,
  queryTrueBondPrice,
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

export interface GetBondInfoOption {
  address: string;
}

// TODO (appleseed): should this be number? BigNumber on evm pro
export interface GetPayoutForOption {
  tokenAmount: string;
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

  async getBondInfo(getBondInfoOption: GetBondInfoOption): Promise<string> {
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
      address: getBondInfoOption.address,
    })(this._addressProvider);
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  async getMaxPayout(): Promise<number> {
    const maxPayout = await queryMaxPayout({
      lcd: this._lcd,
    })(this._addressProvider);
    return maxPayout.toNumber();
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  // 1. is payout_total_supply a req'd parameter?
  async getPayoutFor(getPayoutForOption: GetPayoutForOption): Promise<number> {
    const payoutFor = await queryPayoutFor({
      lcd: this._lcd,
      token_amount: getPayoutForOption.tokenAmount,
    })(this._addressProvider);
    return payoutFor.toNumber();
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  // 1. is current_time a req'd parameter?
  async getCurrentDebt(): Promise<number> {
    const currentDebt = await queryCurrentDebt({
      lcd: this._lcd,
    })(this._addressProvider);
    return currentDebt.toNumber();
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  async getDebtRatio(): Promise<number> {
    const debtRatio = await queryDebtRatio({
      lcd: this._lcd,
    })(this._addressProvider);
    return debtRatio.toNumber();
  }

  // TODO (appleseed): what's the return value (number on evm pro)
  async getTrueBondPrice(): Promise<number> {
    const trueBondPrice = await queryTrueBondPrice({
      lcd: this._lcd,
    })(this._addressProvider);
    return trueBondPrice.toNumber();
  }

  // async getAPY(getAPYOption: GetApyOption): Promise<number> {
  //   const epochState = await queryOverseerEpochState({
  //     lcd: this._lcd,
  //     ...getAPYOption,
  //   })(this._addressProvider);
  //   return new Dec(epochState.deposit_rate).mul(BLOCKS_PER_YEAR).toNumber();
  // }
}
