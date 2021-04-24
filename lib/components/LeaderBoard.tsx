import React from 'react'
import { useQueryClient } from 'react-query';
import { usePrizePoolWinners } from '../hooks/usePrizePoolWinners';
import { Col } from 'react-bootstrap';
import { BigWinners } from './BigWinners';

export const LeaderBoard = () => {
  const queryClient = useQueryClient();
  const {status, data, error, isFetching} = usePrizePoolWinners();

  return (
    <>
    {status === "loading" ? (<h4>Loading..</h4>) : status === "error" ? (
          <span>Error: {JSON.stringify(error)}</span>
        ) : <BigWinners mdata={data} />}
    </>
  )
}