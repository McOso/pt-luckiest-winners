import React from 'react'
import { usePrizePoolWinners } from '../hooks/usePrizePoolWinners';
import { BigWinners } from './BigWinners';

export const LeaderBoard = () => {
  const {status, data, error} = usePrizePoolWinners();

  // TODO: Build layout for leaderboard cards here
  // this should be:
  //    DESKTOP: 1 main card for #1 winner and then 3 columns of cards
  //    MOBILE:  just 1 column of cards 
  return (
    <>
    {status === "loading" ? (<h4>Loading..</h4>) : status === "error" ? (
          <span>Error: {JSON.stringify(error)}</span>
        ) : <BigWinners mdata={data} />}
    </>
  )
}