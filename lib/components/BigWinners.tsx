import React from 'react'
import { useDetailedPrizes } from '../hooks/useDetailedPrizes';
import { DisplayWinners } from './DisplayWinners';
import styles from '../../assets/styles/Home.module.css'

export const BigWinners = (props) => {
  const { mdata } = props

  const {detailedPrizes, results} = useDetailedPrizes(mdata);

  return (
    <>
    {results.some(x => x.isError) ? (<span className={styles.textWhite}>Error: {JSON.stringify(results.find(x => x.error))}</span>) : results.some(x => x.isLoading) ? (
      <h4 className={styles.textWhite}>Loading..</h4>
    ) : <DisplayWinners mprizes={detailedPrizes} mresults={results} />}
    </>
  )
}