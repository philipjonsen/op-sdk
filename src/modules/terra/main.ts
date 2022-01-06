import { TerraBond } from './facade';
import { OpModule } from '../..';
import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from './address-provider';

export interface TerraModuleConfig {
  lcd: LCDClient;
  addressProvider: AddressProvider;
}

export class TerraModule implements OpModule {
  bond!: TerraBond;

  constructor({ lcd, addressProvider }: TerraModuleConfig) {
    this.bond = new TerraBond(lcd, addressProvider);
  }
}
