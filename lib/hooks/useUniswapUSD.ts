import { useQueries } from "react-query";
import { ExternalAward, WinnerData } from "../interfaces/local-types";
import { fetchUniswapUSD } from "../utils/fetchUniswapUSD";

export const useUniswapUSD = (winnerData: WinnerData) => {

  const externalAwards = winnerData.externalAwards ? winnerData.externalAwards : [{address: 'NAN', symbol: 'NAN', amount: 0}] as ExternalAward[]

  const lookupAddresses = externalAwards.flatMap((award) => award.address)
  if (!lookupAddresses.find((x) => x === 'NAN')){
    lookupAddresses.push(process.env.PT_USDC_MAIN_ADDRESS)
  }

  let lockBlock = Number(winnerData.lockBlock)

  const results = useQueries(
    lookupAddresses.map(addy => {
      if (addy === 'NAN'){
        lockBlock = undefined
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