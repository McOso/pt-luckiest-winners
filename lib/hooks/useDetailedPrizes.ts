import { useWinnerBalance } from "./useWinnerBalance";
import { WinnerData, PrizeDetails } from "../interfaces/local-types";
import { AwardedExternalErc20Tokens, BalanceData, Prize, PrizePoolData } from "../interfaces/response-types";
import { calculateOdds } from "../utils/calculateOdds";
import { useEffect, useState } from 'react'
import { mapWinnerData } from "../utils/mapWinnerData";
import { processWinnerData } from "../utils/processWinnerData";
import { QueryClient, useQueries } from "react-query";
import { fetchWinnerBalance } from "../utils/fetchWinnerBalance";


export const useDetailedPrizes = (data: PrizePoolData, setBigWinners: React.Dispatch<React.SetStateAction<WinnerData[]>>) => {

  let detailedPrizes = new Array<PrizeDetails>();

  data?.prizePools.forEach((prizePool) => {
    prizePool.prizes.forEach((prize) => {
      let extAwardTokens = new Array<AwardedExternalErc20Tokens>();
      prize.awardedExternalErc20Tokens.forEach((token) => {
        extAwardTokens.push(token);
      })
      prize.awardedControlledTokens.forEach((award) => {
        let details: PrizeDetails = {
          underlyingCollateralSymbol: prizePool.underlyingCollateralSymbol,
          awardedTimestamp: prize.awardedTimestamp,
          lockBlock: prize.lockBlock,
          totalTicketSupply: prize.totalTicketSupply,
          numberOfSubWinners: prize.numberOfSubWinners,
          winner: award.winner,
          amount: award.amount,
          id: award.token.id,
          decimals: award.token.decimals
        }
        if (extAwardTokens && (extAwardTokens[0].winner === details.winner)){
          details.additionalAward = [...extAwardTokens];
        }
        detailedPrizes.push(details)
      })
    });
  });

  //const [winnerDetails, setWinnerDetails] = useState(new Array<WinnerData>());

  const results = useQueries(
    detailedPrizes.map(prize => {
      let lockBlock: number;
      if (prize.lockBlock){
        lockBlock = Number(prize.lockBlock)
      }
      return {
        queryKey: ['winnerBalance', lockBlock, prize.winner, prize.id],
        queryFn: () => fetchWinnerBalance(lockBlock, prize.winner, prize.id),
        enabled: !!lockBlock
      }
    })
  )

  return {
    detailedPrizes,
    results
  };

  // useEffect(() =>{
  //   if (results.some(x => x.isError)){
  //     console.error(JSON.stringify(results.find(x => x.error)))
  //   }
  //   else if (results.some(x => x.isLoading)){
  //     // maybe set loading display
  //   }
  //   else if (results.every(x => x.status === 'success')){
  //     const winnerDetails = results.map((x, index) => {
  //       detailedPrizes[index].balance = (x.data as BalanceData).controlledTokenBalances[0].balance
  //       const odds = calculateOdds(detailedPrizes[index])
  //       const winnerData = mapWinnerData(detailedPrizes[index], odds)
  //       return winnerData;
  //     })

  //     const bigWinners = processWinnerData(winnerDetails);
  //     setBigWinners(bigWinners);
  //   }

  // }, [results])
}
