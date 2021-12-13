import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  contract_address: string;
}

//(TODO) (aphex) needs to be filled
interface Response {
  a: unknown;
}

export const queryBondPrice =
  ({ lcd, contract_address }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<Response> => {
    const response: Response = await lcd.wasm.contractQuery(contract_address, {
      //...(TODO: query props here if applicable)
    });
    return response;
  };
