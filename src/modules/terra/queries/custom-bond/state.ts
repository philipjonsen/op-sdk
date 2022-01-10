import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  contract_address: string;
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
export interface StateResponse {
  total_debt: number;
  terms: Terms;
  last_decay: number;
  adjustment: Adjustment;
  payout_since_last_subsidy: number;
  total_principal_bonded: number;
  total_payout_given: number;
}

export const queryState =
  ({ lcd, contract_address }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<StateResponse> => {
    const response: StateResponse = await lcd.wasm.contractQuery(
      contract_address,
      {
        state: {},
      },
    );
    return response;
  };
