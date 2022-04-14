import { Program, web3 } from '@project-serum/anchor';

export const addresses = {
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

class SolanaUtils {
  program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  getPayoutAccount = async () =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('account'),
        new web3.PublicKey(addresses.treasury).toBuffer(),
        new web3.PublicKey(addresses.tokenAMint).toBuffer(),
      ],
      this.program.programId,
    );

  getTreasury = async (publicKey: any) =>
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('treasury'),
        new web3.PublicKey(addresses.tokenAMint).toBuffer(),
        publicKey.toBuffer(),
      ],
      this.program.programId,
    );

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
