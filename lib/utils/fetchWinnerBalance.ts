import { request, gql } from "graphql-request";
import { BalanceData } from "../interfaces/response-types";

export const fetchWinnerBalance = async (lockBlock, winnerAddress: string, tokenId: string) => {

  const ENDPOINT = process.env.PT_GRAPHQL_ENDPOINT_URI;
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