# a list of contract methods to handle in TerraSDK

## calculateUserBondDetails - AccountSlice

| status | contract | method           | notes |
| -------|----------|------------------|-------|
|        | bonds    | bondInfo         | details |
|        | bonds    | percentVestedFor | |
|        | bonds    | pendingPayoutFor | |
|        | bondToken | allowance       | is this necessary in terra? |
|        | bondToken | balanceOf       | |

## loadAccountDetails - AccountSlice

| status | contract  | method                | notes |
| -------|-----------|-----------------------|-|
|        | bonds     | getBondTokenBalance   | |
|        | bonds     | getPayoutTokenBalance | |

## getBalances - Account Slice -... looks exactly the same as loadAccountDetails

## changeApproval - BondSlice

| status | contract  | method  | notes |
|--------|-----------|---------|-|
|        | bondToken | approve | is this necessary in terra? |

## calcBondPayout - BondSlice

| status | contract  | method    | notes |
| -------|-----------|-----------|-|
|        | bond      | maxPayout | |
|        | bond      | payoutFor | |

## calcBondDetails - BondSlice

| status | contract  | method    | notes |
| -------|-----------|-----------|-|
|        | bond      | terms | |
|        | bond      | maxPayout | |
|        | bond      | currentDebt | |
|        | bond      | debtRatio | |
|        | lpToken   | totalSupply | lpBonds only |
|        | lpToken   | getTotalAmounts / getReserves | lpBonds only - this is the token1/token2 quantities |
|        | bond      | trueBondPrice | |
|        | bond      | totalPrincipalBonded | |
|        | bond      | getTreasuryBalance | |
|        | bond      | payoutFor | |

## bondAsset - BondSlice

| status | contract  | method    | notes |
| -------|-----------|-----------|-|
|        | bond      | trueBondPrice | |
|        | bond      | deposit | |

## redeemBond - BondSlice

| status | contract  | method    | notes |
| -------|-----------|-----------|-|
|        | bond      | redeem | |

## redeemAllBonds - BondSlice

| status | contract  | method    | notes |
| -------|-----------|-----------|-|
|        | redeemHelperContract      | redeemAll | |
