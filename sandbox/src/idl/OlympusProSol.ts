export type OlympusProSol = {
  "version": "0.1.0",
  "name": "olympuspro_sol",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "olympusData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "olympusDao",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "createTreasury",
      "accounts": [
        {
          "name": "olympusData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "olympusDao",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payoutMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "daoPayoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "treasuryWithdraw",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createBonder",
      "accounts": [
        {
          "name": "olympusData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "olympusDao",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "principalMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "principalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "daoPrincipalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bonder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeInPayout",
          "type": "bool"
        },
        {
          "name": "feePercent",
          "type": {
            "array": [
              "u64",
              5
            ]
          }
        },
        {
          "name": "feeTiers",
          "type": {
            "array": [
              "u64",
              4
            ]
          }
        }
      ]
    },
    {
      "name": "bonderSetting",
      "accounts": [
        {
          "name": "olympusDao",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "olympusData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bonder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "settings",
          "type": {
            "defined": "BonderSettings"
          }
        }
      ]
    },
    {
      "name": "bonderDeposit",
      "accounts": [
        {
          "name": "bonder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bond",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "principalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "principalMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payoutMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "daoPrincipalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "daoPayoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftToken",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "maxPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "bondRedeem",
      "accounts": [
        {
          "name": "bonder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "bondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bonder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "principalBump",
            "type": "u8"
          },
          {
            "name": "daoPrincipalAccountBump",
            "type": "u8"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalBonded",
            "type": "u64"
          },
          {
            "name": "totalPayout",
            "type": "u64"
          },
          {
            "name": "totalDebt",
            "type": "u64"
          },
          {
            "name": "controlVariable",
            "type": "u64"
          },
          {
            "name": "vestingTerm",
            "type": "u64"
          },
          {
            "name": "principalValue",
            "type": "u64"
          },
          {
            "name": "maxPayoutPercent",
            "type": "u64"
          },
          {
            "name": "maxDebt",
            "type": "u64"
          },
          {
            "name": "minimumPrice",
            "type": "u64"
          },
          {
            "name": "feeInPayout",
            "type": "bool"
          },
          {
            "name": "feePercentages",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "feeTiers",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          },
          {
            "name": "lastSlot",
            "type": "u64"
          },
          {
            "name": "lastTime",
            "type": "i64"
          },
          {
            "name": "bcvAdjustRate",
            "type": "u64"
          },
          {
            "name": "bcvAdjustTarget",
            "type": "u64"
          },
          {
            "name": "bcvAdjustBuffer",
            "type": "u64"
          },
          {
            "name": "bcvAdjustLast",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "bond",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vestingTerm",
            "type": "u64"
          },
          {
            "name": "vestingStart",
            "type": "i64"
          },
          {
            "name": "bonder",
            "type": "publicKey"
          },
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "bondAccountBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "treasury",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payoutToken",
            "type": "publicKey"
          },
          {
            "name": "payoutMint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "payoutAccountBump",
            "type": "u8"
          },
          {
            "name": "daoPayoutAccountBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "olympusData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "olympusDao",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BonderSettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxDebt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "vesting",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "maxPayoutPercent",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bcvAdjustTarget",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bcvAdjustRate",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bcvAdjustBuffer",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "MathOverflow",
      "msg": "Unexpected math over/underflow."
    },
    {
      "code": 6002,
      "name": "BondPriceOverLimitPrice",
      "msg": "Bond price greater than limit (max) price."
    },
    {
      "code": 6003,
      "name": "MaxDebtExceeded",
      "msg": "Maximum allowable debt exceeded."
    },
    {
      "code": 6004,
      "name": "FeeLevelsNotIncrementing",
      "msg": "The fee levels provided were not incrementing."
    },
    {
      "code": 6005,
      "name": "BackwardsTime",
      "msg": "Backwards time was computed."
    },
    {
      "code": 6006,
      "name": "BondPriceUnderMinimum",
      "msg": "The bond price is under the minimum price."
    },
    {
      "code": 6007,
      "name": "BondExceedsMaxPayout",
      "msg": "The bonds size exceeds the maximum payout."
    },
    {
      "code": 6008,
      "name": "NoTokensInNFTAccount",
      "msg": "The NFT Token account contains no tokens."
    },
    {
      "code": 6009,
      "name": "WrongNFTMint",
      "msg": "The wrong NFT token mint was supplied."
    },
    {
      "code": 6010,
      "name": "WrongTreasury",
      "msg": "The wrong treasury was supplied."
    },
    {
      "code": 6011,
      "name": "WrongBonder",
      "msg": "The wrong bonder was supplied."
    },
    {
      "code": 6012,
      "name": "WrongPrincipalMint",
      "msg": "The wrong principal mint was supplied."
    },
    {
      "code": 6013,
      "name": "WrongPayoutMint",
      "msg": "The wrong payout mint was supplied."
    }
  ]
};

export const IDL: OlympusProSol = {
  "version": "0.1.0",
  "name": "olympuspro_sol",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "olympusData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "olympusDao",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "createTreasury",
      "accounts": [
        {
          "name": "olympusData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "olympusDao",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payoutMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "daoPayoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "treasuryWithdraw",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createBonder",
      "accounts": [
        {
          "name": "olympusData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "olympusDao",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "principalMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "principalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "daoPrincipalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bonder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeInPayout",
          "type": "bool"
        },
        {
          "name": "feePercent",
          "type": {
            "array": [
              "u64",
              5
            ]
          }
        },
        {
          "name": "feeTiers",
          "type": {
            "array": [
              "u64",
              4
            ]
          }
        }
      ]
    },
    {
      "name": "bonderSetting",
      "accounts": [
        {
          "name": "olympusDao",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "olympusData",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bonder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "settings",
          "type": {
            "defined": "BonderSettings"
          }
        }
      ]
    },
    {
      "name": "bonderDeposit",
      "accounts": [
        {
          "name": "bonder",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bond",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "principalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "principalMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payoutMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "daoPrincipalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "daoPayoutAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftToken",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "maxPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "bondRedeem",
      "accounts": [
        {
          "name": "bonder",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "bond",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "bondAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bonder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "principalBump",
            "type": "u8"
          },
          {
            "name": "daoPrincipalAccountBump",
            "type": "u8"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalBonded",
            "type": "u64"
          },
          {
            "name": "totalPayout",
            "type": "u64"
          },
          {
            "name": "totalDebt",
            "type": "u64"
          },
          {
            "name": "controlVariable",
            "type": "u64"
          },
          {
            "name": "vestingTerm",
            "type": "u64"
          },
          {
            "name": "principalValue",
            "type": "u64"
          },
          {
            "name": "maxPayoutPercent",
            "type": "u64"
          },
          {
            "name": "maxDebt",
            "type": "u64"
          },
          {
            "name": "minimumPrice",
            "type": "u64"
          },
          {
            "name": "feeInPayout",
            "type": "bool"
          },
          {
            "name": "feePercentages",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "feeTiers",
            "type": {
              "array": [
                "u64",
                4
              ]
            }
          },
          {
            "name": "lastSlot",
            "type": "u64"
          },
          {
            "name": "lastTime",
            "type": "i64"
          },
          {
            "name": "bcvAdjustRate",
            "type": "u64"
          },
          {
            "name": "bcvAdjustTarget",
            "type": "u64"
          },
          {
            "name": "bcvAdjustBuffer",
            "type": "u64"
          },
          {
            "name": "bcvAdjustLast",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "bond",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vestingTerm",
            "type": "u64"
          },
          {
            "name": "vestingStart",
            "type": "i64"
          },
          {
            "name": "bonder",
            "type": "publicKey"
          },
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "bondAccountBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "treasury",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "payoutToken",
            "type": "publicKey"
          },
          {
            "name": "payoutMint",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "payoutAccountBump",
            "type": "u8"
          },
          {
            "name": "daoPayoutAccountBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "olympusData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "olympusDao",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BonderSettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxDebt",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "vesting",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "maxPayoutPercent",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bcvAdjustTarget",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bcvAdjustRate",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "bcvAdjustBuffer",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "MathOverflow",
      "msg": "Unexpected math over/underflow."
    },
    {
      "code": 6002,
      "name": "BondPriceOverLimitPrice",
      "msg": "Bond price greater than limit (max) price."
    },
    {
      "code": 6003,
      "name": "MaxDebtExceeded",
      "msg": "Maximum allowable debt exceeded."
    },
    {
      "code": 6004,
      "name": "FeeLevelsNotIncrementing",
      "msg": "The fee levels provided were not incrementing."
    },
    {
      "code": 6005,
      "name": "BackwardsTime",
      "msg": "Backwards time was computed."
    },
    {
      "code": 6006,
      "name": "BondPriceUnderMinimum",
      "msg": "The bond price is under the minimum price."
    },
    {
      "code": 6007,
      "name": "BondExceedsMaxPayout",
      "msg": "The bonds size exceeds the maximum payout."
    },
    {
      "code": 6008,
      "name": "NoTokensInNFTAccount",
      "msg": "The NFT Token account contains no tokens."
    },
    {
      "code": 6009,
      "name": "WrongNFTMint",
      "msg": "The wrong NFT token mint was supplied."
    },
    {
      "code": 6010,
      "name": "WrongTreasury",
      "msg": "The wrong treasury was supplied."
    },
    {
      "code": 6011,
      "name": "WrongBonder",
      "msg": "The wrong bonder was supplied."
    },
    {
      "code": 6012,
      "name": "WrongPrincipalMint",
      "msg": "The wrong principal mint was supplied."
    },
    {
      "code": 6013,
      "name": "WrongPayoutMint",
      "msg": "The wrong payout mint was supplied."
    }
  ]
};
