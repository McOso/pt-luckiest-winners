import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { BalanceData } from "../interfaces/response-types";
import { CONSTANTS } from "../constants";

export const useWinnerBalance = (lockBlock, winnerAddress: string, tokenId: string) => {

  const ENDPOINT = CONSTANTS.PT_GRAPHQL_ENDPOINT_URI;
  const controlledBalanceId = winnerAddress + '-' + tokenId;

  return useQuery(["winnerBalance", lockBlock, winnerAddress, tokenId], async () => {
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
  },
  {
    enabled: !!lockBlock
  });
}