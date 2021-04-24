import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import { useDetailedPrizes } from '../hooks/useDetailedPrizes';
import { WinnerData } from '../interfaces/local-types';
import { BalanceData } from '../interfaces/response-types';
import { calculateOdds } from '../utils/calculateOdds';
import { mapWinnerData } from '../utils/mapWinnerData';
import { processWinnerData } from '../utils/processWinnerData';

export const DisplayWinners = (props) => {
  const { mprizes, mresults } = props

  const winnerDetails = mresults.map((x, index) => {
    mprizes[index].balance = (x.data as BalanceData).controlledTokenBalances[0].balance
    const odds = calculateOdds(mprizes[index])
    const winnerData = mapWinnerData(mprizes[index], odds)
    return winnerData;
  })
  const bigWinners = processWinnerData(winnerDetails);

  return (
    <Col xs={12} md={12}>
      <p>Data: {JSON.stringify(bigWinners)}</p>
      <p>This is the DisplayWinners</p>
    </Col>
  )
}