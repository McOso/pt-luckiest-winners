import React from 'react'
import { usePrizePoolWinners } from '../hooks/usePrizePoolWinners';
import { BigWinners } from './BigWinners';
import styles from '../../assets/styles/Home.module.css'

export const LeaderBoard = () => {
  const {status, data, error} = usePrizePoolWinners();

  return (
    <>
    {status === "loading" ? (<h4 className={styles.textWhite}>Loading..</h4>) : status === "error" ? (
          <span className={styles.textWhite}>Error: {JSON.stringify(error)}</span>
        ) : <BigWinners mdata={data} />}
    </>
  )
}