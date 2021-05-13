import React from 'react'
import { usePrizePoolWinners } from '../hooks/usePrizePoolWinners';
import { BigWinners } from './BigWinners';

export const LeaderBoard = () => {
  const {status, data, error} = usePrizePoolWinners();

  return (
    <>
    {status === "loading" ? (<h4>Loading..</h4>) : status === "error" ? (
          <span>Error: {JSON.stringify(error)}</span>
        ) : <BigWinners mdata={data} />}
    </>
  )
}