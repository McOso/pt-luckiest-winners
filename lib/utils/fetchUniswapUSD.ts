import { request, gql } from "graphql-request";
import { BalanceData } from "../interfaces/response-types";

export const fetchUniswapUSD = async (lBlock, tId: string) => {

  const ENDPOINT = process.env.PT_UNISWAP_ENDPOINT_URI;
  const USDC_ADDRESS = process.env.PT_USDC_MAIN_ADDRESS;

  const data: BalanceData = await request(
    ENDPOINT,
    gql`
      query UniswapUSD($lockBlock: Int, $tokenAddress: ID!, $usdcAddress: ID!){
        tokens(where: {id_in: [$tokenAddress, $usdcAddress]}, block: {number: $lockBlock}) {
          id
          symbol
          derivedETH
        }
      }
    `,
    {
      lockBlock: lBlock,
      tokenAddress: tId,
      usdcAddress: USDC_ADDRESS
    }
  );
  return data;
}