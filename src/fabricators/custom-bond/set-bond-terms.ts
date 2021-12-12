import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';

export enum BondTermParameter {
  Vesting = 'vesting',
  Payout = 'payout',
  Debt = 'debt',
}

interface Option {
  address: string;
  parameter: BondTermParameter;
  input: number;
}

export const fabricateSetBondTerms =
  ({ address, parameter, input }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    return [new MsgExecuteContract(address, '', {})];
  };
