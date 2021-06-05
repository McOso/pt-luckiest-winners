import React from 'react'
import { usePrizePoolWinners } from '../hooks/usePrizePoolWinners';
import { BigWinners } from './BigWinners';
import styles from '../../assets/styles/Home.module.css'

export const LeaderBoard = () => {
  const prizePoolWrapper = usePrizePoolWinners();

  return (
    <>
    {(prizePoolWrapper.prizePoolsV1.status || prizePoolWrapper.prizePoolsV3.status || prizePoolWrapper.prizePoolsPoly.status) === "loading" 
      ? (<h4 className={styles.textWhite}>Loading..</h4>) 
      : (prizePoolWrapper.prizePoolsV1.error || prizePoolWrapper.prizePoolsV3.error || prizePoolWrapper.prizePoolsPoly.error) === "error" 
      ? (
          <span className={styles.textWhite}>Error: Something went wrong..</span>
        ) :  <BigWinners mdata={prizePoolWrapper} />}
    </>
  )
}