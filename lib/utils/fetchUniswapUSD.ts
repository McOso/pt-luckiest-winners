import { request, gql } from "graphql-request";
import { BalanceData } from "../interfaces/response-types";

export const fetchUniswapUSD = async (lBlock, tId: string) => {

  const ENDPOINT = process.env.PT_UNISWAP_ENDPOINT_URI;

  const data: BalanceData = await request(
    ENDPOINT,
    gql`
      query UniswapUSD($lockBlock: Int, $tokenAddress: ID!){
        token(id: $tokenAddress, block: {number: $lockBlock}) {
          id
          symbol
          derivedETH
        }
      }
    `,
    {
      lockBlock: lBlock,
      tokenAddress: tId
    }
  );
  return data;
}