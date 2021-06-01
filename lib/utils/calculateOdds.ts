/* Inspired by: https://github.com/pooltogether/pooltogether-community-ui/blob/master/lib/utils/calculateOdds.js */

import { ethers } from 'ethers'
import { PrizeDetails } from '../interfaces/local-types'

export const calculateOdds = (winner: PrizeDetails) => {
  if (!winner || !winner.balance || winner.balance === "0") {
    return 0
  }

  const usersBalanceFloat = Number(ethers.utils.formatUnits(winner.balance, Number(winner.decimals)))

  const totalSupplyFloat = Number(ethers.utils.formatUnits(winner.totalTicketSupply, Number(winner.decimals)))

  // Calculate odds of winning at least 1 of the possible scenarios.
  // 1/N, 2/N ... N-1/N, N/N
  // Then we always display "1 in ____" so 1 / X.
  return 1 / (1 - Math.pow((totalSupplyFloat - usersBalanceFloat) / totalSupplyFloat, winner.numberOfSubWinners))
}