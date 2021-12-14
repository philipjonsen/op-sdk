import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
  amount: string;
  max_price: string;
  depositor: string;
}

export const fabricateDepositAsset =
  ({ address, max_price, depositor }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const contractAddress = ''; // TODO: (aphex) figure out how to get contract for differnt bonds dinamically

    return [
      new MsgExecuteContract(address, contractAddress, {
        deposit: {
          max_price,
          depositor,
        },
      }),
      //TODO: (aphex): needs to receive native funds??
    ];
  };
