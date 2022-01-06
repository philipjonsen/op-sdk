export interface AddressProvider {
  customBond(): string;
  customTreasury(): string;
  factory(): string;
  subsidyRouter(): string;
  getAddressByContractName(name: string): string;
}

export enum MARKET_DENOMS {
  UUSD = 'uusd',
  UKRW = 'ukrw',
}

export enum COLLATERAL_DENOMS {
  UBLUNA = 'ubluna',
  UBETH = 'ubeth',
}
