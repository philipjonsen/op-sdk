import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  contract_address: string;
}

interface FeeTiers {
  tier_ceiling: number;
  fee_rate: number;
}

interface ConfigResponse {
  custom_treasury: string;
  payout_token: string;
  principal_token: unknown; // (TODO: (aphex) determine type
  olympus_treasury: string;
  subsidy_router: string;
  policy: string;
  olympus_dao: string;
  fee_tiers: Array<FeeTiers>;
  fee_in_payout: boolean;
}

export const queryConfig =
  ({ lcd, contract_address }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<ConfigResponse> => {
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      contract_address,
      {
        //... query props here
      },
    );
    return response;
  };
