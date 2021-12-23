export interface AddressProvider {
  customBond(): string;
}

export enum MARKET_DENOMS {
  UUSD = 'uusd',
  UKRW = 'ukrw',
}

export enum COLLATERAL_DENOMS {
  UBLUNA = 'ubluna',
  UBETH = 'ubeth',
}
