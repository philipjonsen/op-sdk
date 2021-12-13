# a list of contract methods to handle in TerraSDK

## calculateUserBondDetails - AccountSlice

| status | contract | method           | notes | terra-olympus-pro |
| -------|----------|------------------|-------|-------------------|
|        | bonds    | bondInfo         | details | |
|        | bonds    | percentVestedFor | | |
|        | bonds    | pendingPayoutFor | | |
|        | bondToken | allowance       | is this necessary in terra? | |
|        | bondToken | balanceOf       | | |

## loadAccountDetails - AccountSlice

| status | contract  | method                | notes | terra-olympus-pro |
| -------|-----------|-----------------------|-|-------------------| |
|        | bonds     | getBondTokenBalance   | | |
|        | bonds     | getPayoutTokenBalance | | |

## getBalances - Account Slice -... looks exactly the same as loadAccountDetails

## changeApproval - BondSlice

| status | contract  | method  | notes | terra-olympus-pro |
|--------|-----------|---------|-|-------------------| |
|        | bondToken | approve | is this necessary in terra? | |

## calcBondPayout - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------| |
|        | bond      | maxPayout | | [get_max_payout](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L99) |
|        | bond      | payoutFor | | [get_payout_for](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L69) |

## calcBondDetails - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------| |
|        | bond      | terms | | |
|        | bond      | maxPayout | | |
|        | bond      | currentDebt | | [get_current_debt](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L21) |
|        | bond      | debtRatio | | [get_debt_ratio](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L47) |
|        | lpToken   | totalSupply | lpBonds only | |
|        | lpToken   | getTotalAmounts / getReserves | lpBonds only - this is the token1/token2 quantities | |
|        | bond      | trueBondPrice | | see bondAsset table below|
|        | bond      | totalPrincipalBonded | | |
|        | bond      | getTreasuryBalance | | |
|        | bond      | payoutFor | | see calcBondPayout table above |

## bondAsset - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------| |
|        | bond      | trueBondPrice | | [get_true_bond_price](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L59) |
|        | bond      | deposit | | [deposit](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/execute.rs#L167) |

## redeemBond - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------| |
|        | bond      | redeem | | [redeem](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/execute.rs#L337) |

## redeemAllBonds - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------| |
|        | redeemHelperContract      | redeemAll | | |
