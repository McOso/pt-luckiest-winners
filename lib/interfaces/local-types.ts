import { AwardedExternalErc20Tokens } from "./response-types";

// id = Token.id
export interface PrizeDetails {
  underlyingCollateralSymbol: string,
  awardedTimestamp: string,
  lockBlock: number,
  totalTicketSupply: string,
  numberOfSubWinners: number,
  winner: string,
  amount: string,
  id: string,
  decimals: number,
  balance?: string,
  additionalAward?: AwardedExternalErc20Tokens[]
}

export interface WinnerData {
  address: string,
  poolSymbol: string,
  winDate: Date,
  winnings: number,
  balance: number,
  odds: number,
  externalAwards?: ExternalAward[]
}

export interface ExternalAward {
  symbol: string,
  amount: number
}