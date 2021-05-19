import React from 'react'
import { useUniswapUSD } from '../hooks/useUniswapUSD'
import { DisplayLootBox } from './DisplayLootBox';
import styles from '../../assets/styles/Home.module.css'

export const LootBoxDetails = (props) => {
  const { mdata } = props

  const results = useUniswapUSD(mdata);

  return (
    <>
    {results.some(x => x.isError) ? (<span className={styles.textWhite}>Error: {JSON.stringify(results.find(x => x.error))}</span>) : results.some(x => x.isLoading) ? (
      <p className={styles.textWhite}>Loading..</p>
    ) : <DisplayLootBox mdata={mdata} mresults={results} />}
    </>
  )
}