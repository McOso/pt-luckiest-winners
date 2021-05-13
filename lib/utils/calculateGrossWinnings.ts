import { ExternalAward, WinnerData } from '../interfaces/local-types'

export const calculateGrossWinnings = (winner: WinnerData, totals: ExternalAward[]) => {

  let extTotalUSD = 0;
  const extTotals = totals.flatMap(x => x.amountUSD)
  if (extTotals.length > 0){
    extTotalUSD = extTotals.reduce((agg, curr) => {
      return agg + curr;
    })
  }

  // TODO: get main prize non stable coin usd price - like UNI

  if (winner.poolSymbol === 'USDC' || winner.poolSymbol === 'DAI'){
    winner.grossUSDWinnings = winner.winnings + extTotalUSD;
  }else{
    winner.grossUSDWinnings = extTotalUSD;
  }

  return winner.grossUSDWinnings;
}
