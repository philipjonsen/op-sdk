import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  contract_address: string;
  value: string;
}

interface Terms {
  control_variable: number;
  vesting_term: number;
  minimum_price: number;
  max_payout: number;
  max_debt: number;
}

interface Adjustment {
  addition: boolean;
  rate: number;
  target: number;
  buffer: number;
  last_time: number;
}

//(TODO) (aphex) needs to be filled
interface StateResponse {
  total_debt: number;
  terms: Terms;
  last_decat: number;
  adjustment: Adjustment;
  payout_since_last_subsidy: number;
  total_principal_bonded: number;
  total_payout_given: number;
}

export const queryState =
  ({ lcd, contract_address, value }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<StateResponse> => {
    const response: StateResponse = await lcd.wasm.contractQuery(
      contract_address,
      {
        //TODO: (aphex) check if this is correct
        value,
      },
    );
    return response;
  };
