import { useQueries } from "react-query";
import { ExternalAward, WinnerData } from "../interfaces/local-types";
import { fetchUniswapUSD } from "../utils/fetchUniswapUSD";

export const useUniswapUSD = (winnerData: WinnerData) => {

  const externalAwards = winnerData.externalAwards ? winnerData.externalAwards : [{address: 'NAN', symbol: 'NAN', amount: 0}] as ExternalAward[]

  const lookupAddresses = externalAwards.flatMap((award) => award.address)
  if (!lookupAddresses.find((x) => x === 'NAN') || (!(winnerData.poolSymbol === 'USDC' || winnerData.poolSymbol === 'DAI' || winnerData.poolSymbol === 'USDT'))){
    if (!(winnerData.poolSymbol === 'USDC' || winnerData.poolSymbol === 'DAI' || winnerData.poolSymbol === 'USDT')){
      const indexToTrash = lookupAddresses.findIndex(x => x === 'NAN');
      if (indexToTrash > -1){
        lookupAddresses.splice(indexToTrash, 1)
      }
      lookupAddresses.push(winnerData.poolToken);
    }
    lookupAddresses.push(process.env.PT_USDC_MAIN_ADDRESS)
  }

  let lockBlock;

  const results = useQueries(
    lookupAddresses.map(addy => {
      if (addy === 'NAN'){
        lockBlock = undefined
      }else{
        lockBlock = Number(winnerData.lockBlock)
      }
      return {
        queryKey: ['uniswapToUSD', lockBlock, addy],
        queryFn: () => fetchUniswapUSD(lockBlock, addy),
        enabled: !!lockBlock
      }
    })
  )

  return results;
}