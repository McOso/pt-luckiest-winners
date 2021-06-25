import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { PrizePoolData } from "../interfaces/response-types";

export const usePrizePoolWinners = () => {
  const ENDPOINT_V1 = process.env.PT_GRAPHQL_ENDPOINT_URI;
  const ENDPOINT_V3 = process.env.PT_GRAPHQL_V3_ENDPOINT_URI;
  const ENDPOINT_POLY = process.env.PT_GRAPHQL_POLY_ENDPOINT_URI;

  const prizePoolsV1 = useQuery("prizePoolWinnersV1", async () => {
    const data: PrizePoolData = await request(
      ENDPOINT_V1,
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

  const prizePoolsV3 = useQuery("prizePoolWinnersV3", async () => {
    const data: PrizePoolData = await request(
      ENDPOINT_V3,
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

  const prizePoolsPoly = useQuery("prizePoolWinnersPoly", async () => {
    const data: PrizePoolData = await request(
      ENDPOINT_POLY,
      gql`
        query {
          prizePools(where: {id: "0x887e17d791dcb44bfdda3023d26f7a04ca9c7ef4"}){
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

  const prizePoolWrapper = { prizePoolsV1, prizePoolsV3, prizePoolsPoly }
  return prizePoolWrapper
}