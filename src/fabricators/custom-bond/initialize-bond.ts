import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
  control_variable: string;
  vesting_term: string;
  minimum_price: string;
  max_payout: string;
  max_debt: string;
  initial_debt: string;
}

export const fabricateInitializeCustomBond =
  ({
    address,
    control_variable,
    vesting_term,
    minimum_price,
    max_payout,
    max_debt,
    initial_debt,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(control_variable),
      validateIsNumber(vesting_term),
      validateIsNumber(minimum_price),
      validateIsNumber(max_payout),
      validateIsNumber(max_debt),
      validateIsNumber(initial_debt),
    ]);
    const targetAddress = '';

    return [new MsgExecuteContract(address, targetAddress, {})];
  };
