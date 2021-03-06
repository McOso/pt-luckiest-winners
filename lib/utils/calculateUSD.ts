import { UseQueryResult } from 'react-query'
import { ExternalAward, WinnerData } from '../interfaces/local-types'
import { UniTokenData, UniTokenDataResult } from '../interfaces/response-types'

export const calculateUSD = (winner: WinnerData, results: UseQueryResult<UniTokenDataResult, unknown>[]) => {

  if (results.some(x => x.status === 'idle')){
    const emptyArr = new Array<ExternalAward>();
    return emptyArr;
  }

  const tokenResults: UniTokenData[] = results.flatMap(record => record.data.token)

  let usdOffset: number;

  const refinedTokenResults = tokenResults.map((t) => {
    if (t){
      return t;
    }
    return {id: 'NAN', symbol: 'NAN', derivedETH: '0.0'}
  })

  const usdcTokenData = refinedTokenResults?.find(x => x.symbol === 'USDC');
  if (usdcTokenData){
    usdOffset = 1 / parseFloat(usdcTokenData.derivedETH);
  }

  const lookupTokens = [...refinedTokenResults]
  lookupTokens.pop()

  const totals: ExternalAward[] = lookupTokens.map((tokenData, index) => {
    const tokenPrice = usdOffset * parseFloat(tokenData.derivedETH);
    let extAward: ExternalAward;
    if (!(winner.externalAwards) || (index + 1) > winner.externalAwards.length){ // if we enter here than we must be getting price for main prize of non-stablecoin pool
      extAward = {address: winner.poolToken, symbol: winner.poolSymbol, amount: winner.winnings};
    }else{
      extAward = winner.externalAwards[index];
    }
    extAward.amountUSD = tokenPrice * extAward.amount;
    return extAward;
  })

  return totals;
}

