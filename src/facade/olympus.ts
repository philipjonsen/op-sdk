import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../address-provider';
import { Bond } from './bond/bond';

// the frontier
export class OlympusTerra {
  // sub-facades
  bond!: Bond;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.bond = new Bond(lcd, addressProvider);
  }
}
