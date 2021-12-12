import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
  olympus_treasury?: string;
}

export const fabricateUpdateConfig =
  ({ address, olympus_treasury }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    return [new MsgExecuteContract(address, '', {})];
  };
