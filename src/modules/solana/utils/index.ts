/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Program, Provider, web3 } from '@project-serum/anchor';

class SolanaUtils {
  program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  getPayoutAccount = async (
    treasury: string,
    payoutToken: string,
  ): Promise<any> =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        new web3.PublicKey(treasury).toBuffer(),
        new web3.PublicKey(payoutToken).toBuffer(),
      ],
      this.program.programId,
    );

  getTreasury = async (
    payoutToken: string,
    publicKey: web3.PublicKey,
  ): Promise<any> => {
    console.log({ publicKey });
    return await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('treasury'),
        new web3.PublicKey(payoutToken).toBuffer(),
        publicKey.toBuffer(),
      ],
      this.program.programId,
    );
  };

  getDaoPayoutAccount = async (payoutToken: string): Promise<any> =>
    await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), new web3.PublicKey(payoutToken).toBuffer()],
      this.program.programId,
    );

  getDaoPrincipalAccount = async (principalToken: string): Promise<any> =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('daoAccount'),
        new web3.PublicKey(principalToken).toBuffer(),
      ],
      this.program.programId,
    );

  getPrincipalAccount = async (
    treasury: string,
    principalToken: string,
  ): Promise<any> =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        new web3.PublicKey(treasury).toBuffer(),
        new web3.PublicKey(principalToken).toBuffer(),
      ],
      this.program.programId,
    );

  getBonder = async (
    treasury: string,
    principalToken: string,
  ): Promise<any> => {
    return await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('bonder'),
        new web3.PublicKey(treasury).toBuffer(),
        new web3.PublicKey(principalToken).toBuffer(),
      ],
      this.program.programId,
    );
  };

  getBondAccount = async (bond: web3.PublicKey): Promise<any> =>
    await web3.PublicKey.findProgramAddress(
      [Buffer.from('bond'), bond.toBuffer()],
      this.program.programId,
    );

  getTokenAuthority = async (treasury: string): Promise<any> =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('olympusAuthority'),
        new web3.PublicKey(treasury).toBuffer(),
      ],
      this.program.programId,
    );
}

export default SolanaUtils;
