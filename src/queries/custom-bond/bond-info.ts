import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  contract_address: string;
  user: string;
}

//(TODO) (aphex) needs to be filled
interface BondInfo {
  payout: number;
  vesting: number;
  last_time: number;
  true_price_paid: number;
}

export const queryBondInfo =
  ({ lcd, contract_address, user }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<BondInfo> => {
    const response: BondInfo = await lcd.wasm.contractQuery(contract_address, {
      //TODO: (aphex) check if this is correct
      user,
    });
    return response;
  };
