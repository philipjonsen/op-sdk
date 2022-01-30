# OlympusPro.js

op.js is a multi-chain client SDK for building applications that can interact with Olympus Pro Protocol from within JavaScript runtimes, such as web browsers, server backends, and on mobile through React Native.
Kindly forked from [Anchor.js](https://anchor-protocol.github.io/anchor.js/).

## Getting

op.js is available as a package on NPM and is intended to be used alongside Terra.js.

Add both:

- `@terra-money/terra.js`
- `@olympusdao/op.js`

To your JavaScript project's `package.json` as dependencies using your preferred package manager:

```sh
$ npm install -S @terra-money/terra.js @olympusdao/op.js
```

### Setup

Initializing the SDK:

```ts
import SDKBuilder, { Chain } from '@olympusdao/op-sdk';

//assemble configuration object for a specific method, ie:
const terraConfig = { lcdClient, addressProvider };

const sdk = new SDKBuilder().addModule(Chain.TERRA, terraConfig).build();

sdk(NetworkID.Mainnet).bond.redeemBond(...args);
```

### Using Facades

Olympus-Terra.js provides class wrapper facade for the usual operations available on
[webapp](https://pro.olympusdao.finance).

```ts
import { LCDClient, MnemonicKey, Fee, Wallet } from '@terra-money/terra.js';
import {
  Olympus,
  columbus5,
  AddressProviderFromJson,
  MARKET_DENOMS,
  OperationGasParameters,
} from '@olympus-dao/Olympus-Terra.js';

const addressProvider = new AddressProviderFromJson(columbus5);
const lcd = new LCDClient({
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-5',
});
const key = new MnemonicKey({
  mnemonic: 'your key',
});
const wallet = new Wallet(lcd, key);
const olympus = new Olympus(lcd, addressProvider);

// you can generate message only, using your wallet
const msgs = olympus.bond
  .depositAsset(amountOfDepositToken, maxPrice, depositorAddress)
  .generateWithWallet(wallet);

// you can ALSO generate message only, using your address in string
const msgs = olympus.bond
  .depositAsset(amountOfDepositToken, maxPrice, depositorAddress)
  .generateWithAddress('terra1...');

// or, you can broadcast the tx using your wallet
// below is the recommended default setting for gas parameters.
// of course you can tailor it to your needs
const gasParameters: OperationGasParameters = {
  gasAdjustment: 1.4,
  gasPrices: '0.15uusd',

  // or if you want to fixate gas, you can use `fee`
  fee: new Fee(gasToSpend, '100000uusd'),
};
const txResult = await olympus.bond
  .depositAsset(amountOfDepositToken, maxPrice, depositorAddress)
  .execute(wallet, gasParameters);
```

### Using Message Fabricators

Olympus-Terra.js provides facilities for 2 main use cases:

- query: runs smart contract queries through LCD
- execute: creates proper `MsgExecuteContract` objects to be used in transactions

Both of these functions are accessible through the [`Message Fabricators`](https://github.com/Anchor-Protocol/anchor.js/tree/master/src/fabricators).

To Use the message fabricators:

**Note**: Please note that `market` is a different variable from the coin denom. The denomination for the coins in the example is set to be `uusd`.

```ts
import {fabricateRedeemBond, fabricateDepositAsset} from '@anchor-protocol/anchor.js';
import {AddressProviderFromJson} from "@anchor-protocol/anchor.js";

// default -- uses bombay core contract addresses
const addressMap = somehowGetAddresses();
const addressProvider = new AddressProviderFromJson(addressMap);
    const redeemMsg = fabricateRedeemBond({
      depositor: 'terra123...',
    })(addressProvider);

    const depositMsg = fabricateDepositAsset({
      amount: 10,
      max_price: 500
      address: 'terra123...',
    })(addressProvider);
```

## Executing

A message fabricator contains functions for generating proper `MsgExecuteContract` messages to be included in a transaction and broadcasted.

```ts
import { LCDClient, Wallet, MnemonicKey, Fee } from '@terra-money/terra.js';

const olympus = new LCDClient({
  URL: 'https://bombay-lcd.terra.dev',
  chainID: 'bombay-12',
});
const owner = new MnemonicKey({ mnemonic: '....' });
const wallet = new Wallet(olympus, owner);

async function depositAsset() {
  const tx = await wallet.createAndSignTx({
    msgs: depositMsg,
    fee: new Fee(2_000_000, { uluna: 2_000_000 }),
  });
  return await olympus.tx.broadcast(tx);
}

async function main() {
  await depositAsset()
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}

main();
```

## List of contract addresses deployed to networks

TBD

## License

This software is licensed under the Apache 2.0 license. Read more about it [here](./LICENSE).

© 2022 OlympusDAO
