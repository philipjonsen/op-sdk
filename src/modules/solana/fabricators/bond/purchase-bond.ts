import { Signer } from '@solana/web3.js';

export type PurchaseBondOptions = {
  [key: string]: string;
};

export type PurchaseBondReturn = {
  methodName: string;
  options: Array<unknown>;
  signers: Array<Signer>;
};

export const fabricatePurchaseBond = (
  args: PurchaseBondOptions,
): PurchaseBondReturn => {
  let arg1, arg2;
  let accounts;

  return {
    methodName: 'bonderDeposit',
    options: [arg1, arg2, accounts],
    signers: [],
  };
};

export default fabricatePurchaseBond;
