import React from 'react'
import { useUniswapUSD } from '../hooks/useUniswapUSD'
import { DisplayLootBox } from './DisplayLootBox';

export const LootBoxDetails = (props) => {
  const { mdata } = props

  const results = useUniswapUSD(mdata);

  return (
    <>
    {results.some(x => x.isError) ? (<span>Error: {JSON.stringify(results.find(x => x.error))}</span>) : results.some(x => x.isLoading) ? (
      <td>Loading..</td>
    ) : <DisplayLootBox mdata={mdata} mresults={results} />}
    </>
  )
}