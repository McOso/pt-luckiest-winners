import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { PrizePoolData } from "../interfaces/response-types";

export const usePrizePoolWinners = () => {
  const ENDPOINT = process.env.PT_GRAPHQL_ENDPOINT_URI;

  return useQuery("prizePoolWinners", async () => {
    const data: PrizePoolData = await request(
      ENDPOINT,
      gql`
        query {
          prizePools(where: {owner: "0x42cd8312d2bce04277dd5161832460e95b24262e"}){
            underlyingCollateralSymbol
            underlyingCollateralToken
            prizes{
              awardedTimestamp
              lockBlock
              totalTicketSupply
              numberOfSubWinners
              awardedControlledTokens{
                winner
                amount
                token{
                  id
                  decimals
                }
              }
              awardedExternalErc20Tokens{
                id
                winner
                balanceAwarded
                symbol
                decimals
              }
            }
          }
        }
      `
    );
    
    return data;
  });
}