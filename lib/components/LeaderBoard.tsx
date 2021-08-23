import React from 'react'
import { usePrizePoolWinners } from '../hooks/usePrizePoolWinners';
import { BigWinners } from './BigWinners';
import styles from '../../assets/styles/Home.module.css'
import { Loader } from './Loader';

export const LeaderBoard = () => {
  const prizePoolWrapper = usePrizePoolWinners();

  return (
    <>
    {(prizePoolWrapper.prizePoolsV1.status || prizePoolWrapper.prizePoolsV3.status || prizePoolWrapper.prizePoolsPoly.status) === "loading" 
      ? (<Loader />) 
      : (prizePoolWrapper.prizePoolsV1.error || prizePoolWrapper.prizePoolsV3.error || prizePoolWrapper.prizePoolsPoly.error) === "error" 
      ? (
          <span className={styles.textWhite}>Error: Something went wrong..</span>
        ) :  <BigWinners mdata={prizePoolWrapper} />}
    </>
  )
}