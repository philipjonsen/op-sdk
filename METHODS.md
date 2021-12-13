# a list of contract methods to handle in TerraSDK

## calculateUserBondDetails - AccountSlice

| status | contract | method           | notes | terra-olympus-pro |
| -------|----------|------------------|-------|-------------------|
| pseudo | bonds    | bondInfo         | details | [PayoutInfo](https://github.com/sandclock-org/terra-olympus-pro/blob/54aee406b0ad86e334758f4c42a220d7d234870c/packages/olympus_pro/src/custom_bond.rs#L74)|
|    ?   | bonds    | percentVestedFor | | |
|    ?   | bonds    | pendingPayoutFor | | |
|    ?   | bondToken | allowance       | is this necessary in terra? | |
|  maybe | bondToken | balanceOf       | | [queryTokenBalance](https://github.com/OlympusDAO/Olympus-Terra.js/blob/1641df04c910790c7bd6e1afe8e5de90162d46a2/src/queries/cw20/token-balance.ts#L14) |

## loadAccountDetails - AccountSlice

| status | contract  | method                | notes | terra-olympus-pro |
| -------|-----------|-----------------------|-------|-------------------|
|  maybe | bonds     | getBondTokenBalance   | some version of: | [queryTokenBalance](https://github.com/OlympusDAO/Olympus-Terra.js/blob/1641df04c910790c7bd6e1afe8e5de90162d46a2/src/queries/cw20/token-balance.ts#L14) |
|  maybe | bonds     | getPayoutTokenBalance | some version of: | [queryTokenBalance](https://github.com/OlympusDAO/Olympus-Terra.js/blob/1641df04c910790c7bd6e1afe8e5de90162d46a2/src/queries/cw20/token-balance.ts#L14) |

## getBalances - Account Slice -... looks exactly the same as loadAccountDetails

## changeApproval - BondSlice

| status | contract  | method  | notes | terra-olympus-pro |
|--------|-----------|---------|-|-------------------|
|   ?    | bondToken | approve | is this necessary in terra? | |

## calcBondPayout - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------|
| pseudo | bond      | maxPayout | | [get_max_payout](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L99) |
| pseudo | bond      | payoutFor | | [get_payout_for](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L69) |

## calcBondDetails - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------|
|    ?   | bond      | terms | > can be queried by State | |
| pseudo | bond      | maxPayout | | see calcBondPayout above |
| pseudo | bond      | currentDebt | | [get_current_debt](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L21) |
| pseudo | bond      | debtRatio | | [get_debt_ratio](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L47) |
|    ?   | lpToken   | totalSupply | lpBonds only | |
|    ?   | lpToken   | getTotalAmounts / getReserves | lpBonds only - this is the token1/token2 quantities | |
| pseudo | bond      | trueBondPrice | | see bondAsset table below|
|    ?   | bond      | totalPrincipalBonded | | > can be queried by State |
|  maybe | bond      | getTreasuryBalance | | similar loadAccountDetails funcs |
| pseudo | bond      | payoutFor | | see calcBondPayout table above |

## bondAsset - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------|
| pseudo | bond      | trueBondPrice | | [get_true_bond_price](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/utils.rs#L59) |
| pseudo | bond      | deposit | | [deposit](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/execute.rs#L167) |

## redeemBond - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------|
| pseudo | bond      | redeem | | [redeem](https://github.com/sandclock-org/terra-olympus-pro/blob/feature/custom_bond/contracts/custom_bond/src/execute.rs#L337) |

## redeemAllBonds - BondSlice

| status | contract  | method    | notes | terra-olympus-pro |
| -------|-----------|-----------|-|-------------------|
|        | redeemHelperContract      | redeemAll | | |
