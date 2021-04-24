import { useWinnerBalance } from "./useWinnerBalance";
import { WinnerData, PrizeDetails } from "../interfaces/local-types";
import { AwardedExternalErc20Tokens, Prize, PrizePoolData } from "../interfaces/response-types";
import { calculateOdds } from "../utils/calculateOdds";
import { useEffect, useState } from 'react'
import { mapWinnerData } from "../utils/mapWinnerData";
import { processWinnerData } from "../utils/processWinnerData";
import { QueryClient } from "react-query";


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

  const [winnerDetails, setWinnerDetails] = useState(new Array<WinnerData>());

  for (let i = 0; i < 300; i++) {
    let lockBlock, winnerAddress, tokenId;

    if (detailedPrizes.length > i){
      lockBlock = detailedPrizes[i].lockBlock;
      winnerAddress = detailedPrizes[i].winner;
      tokenId = detailedPrizes[i].id;
    }
    const {status, data, error, isFetching} = useWinnerBalance(lockBlock ? parseInt(lockBlock) : null, winnerAddress, tokenId);
    useEffect(() => {
      if (status === 'success' && data && data.controlledTokenBalances && data.controlledTokenBalances[0]){
        detailedPrizes[i].balance = data.controlledTokenBalances[0].balance
        const odds = calculateOdds(detailedPrizes[i])
        setWinnerDetails(prevArr => [...prevArr, mapWinnerData(detailedPrizes[i], odds)])
      }
    }, [data])
  }

  useEffect(() =>{
    if (winnerDetails.length === detailedPrizes.length){
      const bigWinners = processWinnerData(winnerDetails);
      setBigWinners(bigWinners);
    }
  }, [winnerDetails])
}
