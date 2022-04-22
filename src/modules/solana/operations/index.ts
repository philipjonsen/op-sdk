import { Wallet, Provider, Program, Idl } from '@project-serum/anchor';
import {
  Connection,
  Transaction,
  Cluster,
  ConfirmOptions,
  // PublicKey,
} from '@solana/web3.js';
// import { solTestAddresses } from '../dev-addresses.js';

const opts: ConfirmOptions = {
  preflightCommitment: 'processed',
};

type Fabricator = {
  methodName: string;
};

// const dummyWalletPubKey = new PublicKey(
//   '7MJ3hTSDkJhGDVz2VnjC55pvGWHxP7vwczWjKJhVSokV',
// );

export class SolanaOperation {
  // private transaction: Transaction;
  private wallet: Wallet;
  networkId: Cluster;
  idl: Idl;
  programId: any;
  fabricator: Fabricator;
  options: any;

  constructor(
    networkId: Cluster,
    wallet: Wallet,
    idl: Idl,
    fabricator: Fabricator,
  ) {
    // this.transaction = new Transaction();
    this.networkId = networkId;
    this.wallet = wallet;
    this.idl = idl;
    console.log('idl', idl);
    // this.programId = new PublicKey(idl.metadata?.address);
    this.fabricator = fabricator;
  }

  private getProvider(): Provider {
    const connection = new Connection(this.networkId);
    const provider = new Provider(connection, this.wallet, opts);
    console.log({ provider });
    return provider;
  }

  getProgram(): Program<Idl> {
    const provider = this.getProvider();
    const program = new Program(this.idl, this.programId, provider);
    console.log({ program });
    return program;
  }

  execute(): void {
    // const program = this.getProgram();
    // const fabric = this.fabricator();
    // try {
    //   const tx = await program.rpc[fabric.methodName](...fabric.options);
    // } catch (err) {
    //   console.log(err);
    // }
  }

  executePurchaseBond(): null {
    return null;
  }
  //   const program = this.getProgram();
  //   const { wallet } = program;

  //   const tokenAMint = new PublicKey(solTestAddresses.tokenAMint);
  //   const tokenBMint = new PublicKey(solTestAddresses.tokenBMint);
  //   const partnerTokenAccountA = new PublicKey(solTestAddresses.partnerTokenA);
  //   const partnerTokenAccountB = new PublicKey(solTestAddresses.partnerTokenB);
  //   const olympusTokenA = new PublicKey(solTestAddresses.olympusTokenA);
  //   const olympusTokenB = new PublicKey(solTestAddresses.olympusTokenB);
  //   const userTokenA = new PublicKey(solTestAddresses.userTokenA);
  //   const userTokenB = new PublicKey(solTestAddresses.userTokenB);

  //   const bondKey = web3.Keypair.generate();
  //   const treasuryAccount = web3.Keypair.generate();

  //   const [olympusData, olympusDataBump] =
  //     await web3.PublicKey.findProgramAddress(
  //       [Buffer.from('olympus')],
  //       program.programId,
  //     );
  //   const [treasury, treasuryBump] = await web3.PublicKey.findProgramAddress(
  //     [
  //       Buffer.from('treasury'),
  //       tokenAMint.toBuffer(),
  //       wallet.publicKey.toBuffer(),
  //     ],
  //     program.programId,
  //   );
  //   const [payoutAccount, payoutAccountBump] =
  //     await web3.PublicKey.findProgramAddress(
  //       [Buffer.from('account'), treasury.toBuffer(), tokenAMint.toBuffer()],
  //       program.programId,
  //     );
  //   const [daoPayoutAccount, daoPayoutAccountBump] =
  //     await web3.PublicKey.findProgramAddress(
  //       [Buffer.from('daoAccount'), tokenAMint.toBuffer()],
  //       program.programId,
  //     );
  //   const [daoPrincipalAccount, daoPrincipalAccountBump] =
  //     await web3.PublicKey.findProgramAddress(
  //       [Buffer.from('daoAccount'), tokenBMint.toBuffer()],
  //       program.programId,
  //     );
  //   const [principalAccount, principalAccountBump] =
  //     await web3.PublicKey.findProgramAddress(
  //       [Buffer.from('account'), treasury.toBuffer(), tokenBMint.toBuffer()],
  //       program.programId,
  //     );
  //   const [bonder, bonderBump] = await web3.PublicKey.findProgramAddress(
  //     [Buffer.from('bonder'), treasury.toBuffer(), tokenBMint.toBuffer()],
  //     program.programId,
  //   );
  //   const [bond, bondBump] = await web3.PublicKey.findProgramAddress(
  //     [Buffer.from('bond'), bondKey.toBuffer()],
  //     program.programId,
  //   );
  //   const [authority, bump] = await web3.PublicKey.findProgramAddress(
  //     [Buffer.from('olympusAuthority'), treasuryAccount.toBuffer()],
  //     program.programId,
  //   );

  //   const tx = program.transaction.bonderDeposit(
  //     new BN(100),
  //     new BN(100000000),
  //     {
  //       accounts: {
  //         authority: dummyWalletPubKey,
  //         principalAccount,
  //         tokenAccount: bonderTokenB,
  //         payoutMint: tokenAMint.publicKey,
  //         principalMint: tokenBMint.publicKey,
  //         payoutAccount,
  //         daoPrincipalAccount,
  //         daoPayoutAccount,
  //         treasury,
  //         bondAccount,
  //         bond: bond.publicKey,
  //         payer: dummyWalletPubKey,
  //         bonder,
  //         tokenAuthority: authority,
  //         systemProgram: web3.SystemProgram.programId,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         clock: web3.SYSVAR_CLOCK_PUBKEY,
  //         rent: web3.SYSVAR_RENT_PUBKEY,
  //       },
  //     },
  //   );
  // }
}
