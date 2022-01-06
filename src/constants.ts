export enum Chain {
  TERRA = 'terra',
  SOLANA = 'solana',
}

export enum NetworkID {
  Terra_Mainnet = 'columbus-5',
  Terra_Testnet = 'bombay-12',
  Solana_Mainnet = 'replace-me',
  Solana_Testnet = 'replace-me',
}

export const networks: Networks = {
  [NetworkID.Terra_Mainnet]: {
    id: NetworkID.Terra_Mainnet,
    chain: Chain.TERRA,
  },
  [NetworkID.Terra_Testnet]: {
    id: NetworkID.Terra_Testnet,
    chain: Chain.TERRA,
  },

  [NetworkID.Solana_Mainnet]: {
    id: NetworkID.Solana_Mainnet,
    chain: Chain.SOLANA,
  },

  [NetworkID.Solana_Testnet]: {
    id: NetworkID.Terra_Testnet,
    chain: Chain.SOLANA,
  },
};

export type Networks = {
  [key in NetworkID]: {
    id: NetworkID;
    chain: Chain;
  };
};
