import { request, gql } from "graphql-request";
import { QUERY } from "../interfaces/local-types";
import { BalanceData } from "../interfaces/response-types";

export const fetchWinnerBalance = async (lockBlock, winnerAddress: string, tokenId: string, queryType: QUERY) => {

  let ENDPOINT = ''
  switch (queryType){
    case QUERY.V1: 
      ENDPOINT = process.env.PT_GRAPHQL_ENDPOINT_URI
      break;
    case QUERY.V3: 
      ENDPOINT = process.env.PT_GRAPHQL_V3_ENDPOINT_URI
      break;
    case QUERY.POLY: 
      ENDPOINT = process.env.PT_GRAPHQL_POLY_ENDPOINT_URI
      break;
  }
  const controlledBalanceId = winnerAddress + '-' + tokenId;

  const data: BalanceData = await request(
    ENDPOINT,
    gql`
      query Winners($lockBlock: Int, $winnerAddress: ID!, $controlledBalanceId: ID!){
        controlledTokenBalances(block: {number: $lockBlock}, where: {account: $winnerAddress, id: $controlledBalanceId}){
          balance
        }
      }
    `,
    {
      lockBlock: lockBlock,
      winnerAddress: winnerAddress,
      controlledBalanceId: controlledBalanceId
    }
  );
  return data;
}