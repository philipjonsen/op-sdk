import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from 'modules/terra/address-provider/provider';
import { validateInput } from 'modules/terra/utils/validate-input';
import { validateAddress } from 'modules/terra/utils/validation/address';

interface Option {
  address: string;
  contractAddress: string;
  depositor: string;
}

export const fabricateRedeemBond =
  ({ address, contractAddress, depositor }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address), validateAddress(contractAddress)]);

    return [
      new MsgExecuteContract(address, contractAddress, {
        redeem_bond: {
          depositor,
        },
      }),
    ];
  };
