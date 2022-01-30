import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from 'modules/terra/address-provider';

interface Option {
  lcd: LCDClient;
  contract_address: string;
  value: string;
}

//(TODO) (aphex) needs to be filled
interface Response {
  a: unknown;
}

export const queryPayoutFor =
  ({ lcd, contract_address, value }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<Response> => {
    const response: Response = await lcd.wasm.contractQuery(contract_address, {
      //TODO: (aphex) check if this is correct
      payoutFor: { value },
    });
    return response;
  };
