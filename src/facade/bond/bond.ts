import { Int, Dec, LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  fabricateDepositAsset,
  fabricateRedeemBond,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import {
  queryMarketEpochState,
  queryOverseerEpochState,
  queryTokenBalance,
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

export interface GetTotalDepositOption {
  market: MARKET_DENOMS;
  address: string;
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

  async getTotalDeposit(
    getTotalDepositOption: GetTotalDepositOption,
  ): Promise<string> {
    const epochState = await queryMarketEpochState({
      lcd: this._lcd,
      market: getTotalDepositOption.market,
    })(this._addressProvider);
    const userATerraBalance = await queryTokenBalance({
      lcd: this._lcd,
      address: getTotalDepositOption.address,
      token_address: this._addressProvider.aTerra(getTotalDepositOption.market),
    })(this._addressProvider);

    return new Int(
      new Dec(epochState.exchange_rate).mul(userATerraBalance.balance),
    )
      .div(1000000)
      .toString();
  }

  async getAPY(getAPYOption: GetApyOption): Promise<number> {
    const epochState = await queryOverseerEpochState({
      lcd: this._lcd,
      ...getAPYOption,
    })(this._addressProvider);
    return new Dec(epochState.deposit_rate).mul(BLOCKS_PER_YEAR).toNumber();
  }
}
