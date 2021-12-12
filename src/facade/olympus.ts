import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../address-provider';
import { AnchorToken } from './anchor-token/anchor-token';
import { BLuna } from './bluna/bluna';
import { Borrow } from './borrow/borrow';
import { Bond } from './bond/bond';

// the frontier
export class Olympus {
  // sub-facades
  bond!: Bond;
  borrow!: Borrow;
  bluna!: BLuna;
  anchorToken!: AnchorToken;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.bond = new Bond(lcd, addressProvider);
    this.borrow = new Borrow(lcd, addressProvider);
    this.bluna = new BLuna(lcd, addressProvider);
    this.anchorToken = new AnchorToken(lcd, addressProvider);
  }
}
