import { Signer } from '@solana/web3.js';

export type RedeemBondOptions = {
  [key: string]: string;
};

export type RedeemBondReturn = {
  methodName: string;
  options: Array<unknown>;
  signers: Array<Signer>;
};

export const fabricateRedeemBond = (
  args: RedeemBondOptions,
): RedeemBondReturn => {
  let arg1, arg2;
  let accounts;
  console.log({ args });
  return {
    methodName: 'redeemBond',
    options: [arg1, arg2, accounts],
    signers: [],
  };
};

export default fabricateRedeemBond;
