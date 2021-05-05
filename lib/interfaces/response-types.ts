
export interface PrizePoolData {
  prizePools: [PrizePool]
}

export interface PrizePool {
  underlyingCollateralSymbol: string,
  prizes: [Prize]
}

export interface Prize {
  awardedTimestamp: string,
  lockBlock: number,
  totalTicketSupply: string,
  numberOfSubWinners: number,
  awardedControlledTokens: [AwardedControlledToken],
  awardedExternalErc20Tokens: [AwardedExternalErc20Tokens]
}

export interface AwardedExternalErc20Tokens {
  id: string,
  winner: string,
  balanceAwarded: string,
  symbol: string,
  decimals: number
}

export interface AwardedControlledToken {
  winner: string,
  amount: string,
  token: Token
}

export interface Token {
  id: string,
  decimals: number
}


export interface BalanceData {
  controlledTokenBalances: ControlledTokenBalance
}

export interface ControlledTokenBalance {
  balance: [string]
}

export interface UniTokenData {
  id: string,
  symbol: string,
  derivedETH: string
}