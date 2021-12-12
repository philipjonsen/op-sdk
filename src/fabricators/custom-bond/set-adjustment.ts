import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
  addition: boolean;
  increment: string;
  target: string;
  buffer: string;
}

export const fabricateSetAdjustment =
  ({ address, addition, increment, target, buffer }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    return [new MsgExecuteContract(address, '', {})];
  };
