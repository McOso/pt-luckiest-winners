import { ethers } from 'ethers'
import { UseQueryResult } from 'react-query'
import { ExternalAward, WinnerData } from '../interfaces/local-types'
import { UniTokenData } from '../interfaces/response-types'

export const calculateUSD = (winner: WinnerData, results: UseQueryResult<unknown, unknown>[]) => {
  const uniTokenDataList: ExternalAward[] = results.map((x, index) => {
    const uniTokenResponses = (x.data as UniTokenData[]);

    let usdOffset: number;
    let tokenPrice: number;

    const usdcTokenData = uniTokenResponses?.find(x => x.symbol === 'USDC');
    if (usdcTokenData){
      usdOffset = 1 / parseFloat(usdcTokenData.derivedETH);
    }

    const extTokenData = uniTokenResponses?.find(x => x.symbol !== 'USDC');
    if (extTokenData){
      tokenPrice = usdOffset * parseFloat(extTokenData.derivedETH);
    }

    if (!tokenPrice){
      return null
    }
    const extAward = winner.externalAwards[index];
    extAward.amountUSD = tokenPrice;

    return extAward;
  })

}

