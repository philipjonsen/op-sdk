import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
}

export const fabricatePaySubsidy =
  ({ address }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    return [new MsgExecuteContract(address, '', {})];
  };
