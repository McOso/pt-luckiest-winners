import { PrizeDetails } from "../interfaces/local-types";
import { AwardedExternalErc20Tokens, PrizePoolData } from "../interfaces/response-types";
import { useQueries } from "react-query";
import { fetchWinnerBalance } from "../utils/fetchWinnerBalance";


export const useDetailedPrizes = (data: PrizePoolData) => {

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
}
