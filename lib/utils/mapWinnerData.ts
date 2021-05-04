import { ExternalAward, PrizeDetails, WinnerData } from "../interfaces/local-types";
import { ethers } from 'ethers'

export const mapWinnerData = (prizeDetails: PrizeDetails, odds: number) => {
  const usersBalance = Number(ethers.utils.formatUnits(prizeDetails.balance, Number(prizeDetails.decimals)))
  const usersWinnings = Number(ethers.utils.formatUnits(prizeDetails.amount, Number(prizeDetails.decimals)))
  const dateWon = new Date(Number(prizeDetails.awardedTimestamp) * 1000)

  const winner: WinnerData = {
    address: prizeDetails.winner,
    poolSymbol: prizeDetails.underlyingCollateralSymbol,
    winDate: dateWon,
    winnings: usersWinnings,
    balance: usersBalance,
    odds: odds
  }

  if (prizeDetails.additionalAward && prizeDetails.additionalAward.length > 0){
    winner.externalAwards = prizeDetails.additionalAward.map((award) => {
      const extraWinnings = Number(ethers.utils.formatUnits(award.balanceAwarded, Number(award.decimals)))
      const extAward: ExternalAward = {
        address: getTokenAddress(award.id),
        symbol: award.symbol,
        amount: extraWinnings
      }
      return extAward;
    });
  }

  return winner;
}

const getTokenAddress = (concatted: string): string => {
  const splitted = concatted.split('-');
  if (splitted.length === 3)
    return splitted[2];
  return '0x0';
}