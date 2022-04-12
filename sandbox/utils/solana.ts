import { Program, web3 } from '@project-serum/anchor';

export const addresses = {
  tokenAMint: 'GiSZhnhuUK8JY9wTsCbx6G7B71GXw4x1trou8NSjcECe',
  tokenBMint: 'J8tCXMyWeFCcW8H6hF6RVGHhX9Y5PAPFsrJnxbAXLJ3d',
  partnerTokenA: '5D6vRB87xfWRmKBgLtFZAxJpZYTqHvNRCCP2WWq5DPp6',
  partnerTokenB: '4cPawGGTYW8m7YRibJsSHkg7MXut8kR7yYg9tFVgjSBs',
  olympusTokenA: '2rX8FPtYzpTo8h9tAhzejNHdDRdTPKJjvvbVg6MRYkFa',
  olympusTokenB: 'FydrZd42QUFgX764DvMDvAh4ZxtXuZ4LhqtQrm6jer26',
  userTokenA: 'AH5X6UCJw3qq6pjQ5macDo1EZLJTkVqFnqNKYTn3oCKG',
  userTokenB: 'DgGXnnMhQqAD8QfesMFewuerXtvM9kV1JkBK5dGBURzL',
  treasury: 'BoP2izadvgR9uVjm9pj13LHWMEUjpX7RhncrWv86BBy',
  bonder: '6rKz5eMkNR2P1rrKv3jRSKJorHRMFWE8Cfn2EUNVVjqb',
};

class SolanaUtils {
  program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  getPayoutAccount = async () => {
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        new web3.PublicKey(addresses.treasury).toBuffer(),
        new web3.PublicKey(addresses.tokenAMint).toBuffer(),
      ],
      this.program.programId,
    );
  };

  getDaoPayoutAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('daoAccount'),
        new web3.PublicKey(addresses.tokenAMint).toBuffer(),
      ],
      this.program.programId,
    );

  getDaoPrincipalAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('daoAccount'),
        new web3.PublicKey(addresses.tokenBMint).toBuffer(),
      ],
      this.program.programId,
    );

  getPrincipalAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        new web3.PublicKey(addresses.treasury).toBuffer(),
        new web3.PublicKey(addresses.tokenBMint).toBuffer(),
      ],
      this.program.programId,
    );

  getBondAccount = async (bond: any) =>
    await web3.PublicKey.findProgramAddress(
      [Buffer.from('bond'), bond.publicKey.toBuffer()],
      this.program.programId,
    );

  getTokenAuthority = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('olympusAuthority'),
        new web3.PublicKey(addresses.treasury).toBuffer(),
      ],
      this.program.programId,
    );
}

export default SolanaUtils;
