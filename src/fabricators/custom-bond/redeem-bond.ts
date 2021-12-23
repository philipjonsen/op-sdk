import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

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
