import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from 'modules/terra/address-provider/provider';
import { validateInput } from 'modules/terra/utils/validate-input';
import { validateAddress } from 'modules/terra/utils/validation/address';

interface Option {
  address: string;
  max_price: string;
  depositor: string;
}

export const fabricateDepositAsset =
  ({ address, max_price, depositor }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const contractAddress = addressProvider.customBond();

    return [
      new MsgExecuteContract(address, contractAddress, {
        deposit: {
          max_price,
          depositor,
        },
      }),
      //TODO: (aphex): does this needs native funds?
    ];
  };
