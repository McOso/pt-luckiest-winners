import { useQueries, useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { PrizePoolData } from "../interfaces/response-types";
import { ExternalAward, WinnerData } from "../interfaces/local-types";
import { fetchUniswapUSD } from "../utils/fetchUniswapUSD";

export const useUniswapUSD = (winnerData: WinnerData) => {

const externalAwards = winnerData.externalAwards ? winnerData.externalAwards : [{address: 'NAN', symbol: 'NAN', amount: 0}] as ExternalAward[]
  const results = useQueries(
    externalAwards.map(prize => {
      let lockBlock: number;
      if (winnerData.lockBlock && prize.address !== 'NAN'){
        lockBlock = Number(winnerData.lockBlock)
      }
      return {
        queryKey: ['uniswapToUSD', lockBlock, prize.address],
        queryFn: () => fetchUniswapUSD(lockBlock, prize.address),
        enabled: !!lockBlock
      }
    })
  )

  return results;
}