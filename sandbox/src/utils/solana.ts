import { Program, web3 } from '@project-serum/anchor';

export const SYSTEM_PROGRAM_ID = web3.SystemProgram.programId;
export const SYSVAR_RENT_PUBKEY = web3.SYSVAR_RENT_PUBKEY;
export const SYSTEM_CLOCK_PUBKEY = web3.SYSVAR_CLOCK_PUBKEY;

const address: any = {
  programId: '61ZYzDJWf1KXdU6aEm6JEyE1z5Vjp3KHRSiKw9GAZaXp',
  tokenAMint: '3tUcARoV8dprVydwzQG82Uy57j5C1aqnfFx8q4ruABhW',
  tokenBMint: 'EUxox5R2bACVWs4Kh1T55aPyy5eyHwCsU9GHhxZTEUBx',
  partnerTokenA: 'CYNcMTUD4UojuFANHwwwwWyVwnM1J9V8MpXKtoixcXY4',
  partnerTokenB: 'FYdupDTA5Y8ABgiBT7sywcYmHiseBJveyvpEgeC4ufEX',
  olympusTokenA: '3GaSmgJo23HjdjE5AuuMmTarvbMY6LJpkb5fwvPBaM7u',
  olympusTokenB: 'X8pbUyT5QNNx2ZAYMBuzKksRK1UL6VJQMcux1eHBQxa',
  userTokenA: '8PoFWKmVrJ8zETBzkgcG9fdDBmShzEjXeEjkh36YmKbc',
  userTokenB: '7fKcDLvZVADyE1XRT5n8qu85tq6toVdp3C43fPKvamTs',
  treasury: '7zzUdm9P5FNDY7W8XZ8tHZVpmST8NpKEXyDQQosQoD29',
  bonder: 'CcUNZLZPTGu1WVGSQpg7YzM6dfBMF1oUQde16rMQMfop',
};

export const getPublicKey = (name: string): web3.PublicKey =>
  new web3.PublicKey(address[name]);

class SolanaUtils {
  program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  getPayoutAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        getPublicKey('treasury').toBuffer(),
        getPublicKey('tokenAMint').toBuffer(),
      ],
      this.program.programId,
    );

  getTreasury = async (publicKey: any) =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('treasury'),
        getPublicKey('tokenAMint').toBuffer(),
        publicKey.toBuffer(),
      ],
      this.program.programId,
    );

  getDaoPayoutAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), getPublicKey('tokenAMint').toBuffer()],
      this.program.programId,
    );

  getDaoPrincipalAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [Buffer.from('daoAccount'), getPublicKey('tokenBMint').toBuffer()],
      this.program.programId,
    );

  getPrincipalAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        getPublicKey('treasury').toBuffer(),
        getPublicKey('tokenBMint').toBuffer(),
      ],
      this.program.programId,
    );

  getBonder = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('bonder'),
        getPublicKey('treasury').toBuffer(),
        getPublicKey('tokenBMint').toBuffer(),
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
      [Buffer.from('olympusAuthority'), getPublicKey('treasury').toBuffer()],
      this.program.programId,
    );
}

export default SolanaUtils;
