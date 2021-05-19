import React from 'react'
import { CardDeck, Col, Row } from 'react-bootstrap';
import { BalanceData } from '../interfaces/response-types';
import { calculateOdds } from '../utils/calculateOdds';
import { mapWinnerData } from '../utils/mapWinnerData';
import { processWinnerData } from '../utils/processWinnerData';
import { WinnerCard } from './WinnerCard';

export const DisplayWinners = (props) => {
  const { mprizes, mresults } = props

  const winnerDetails = mresults.map((x, index) => {
    mprizes[index].balance = (x.data as BalanceData).controlledTokenBalances[0].balance
    const odds = calculateOdds(mprizes[index])
    const winnerData = mapWinnerData(mprizes[index], odds)
    return winnerData;
  })
  const bigWinners = processWinnerData(winnerDetails);

  const firstWinner = bigWinners[0];
  const twoToTenWinners = bigWinners.slice(1,10);

  // TODO: 
  //  - truncate winner address => 0xe23..cf4
  //  - display lootbox winnings in a meaningful manner
  return (
    <>
      <CardDeck className="mx-auto mb-2">
        <WinnerCard key={'card' + 0 + firstWinner.address} mwinner={firstWinner} mindex={0} main/>
      </CardDeck>
      <CardDeck>
        {twoToTenWinners.map((winner, index) => {
          return (
            <Col key={'col' + (index + 1) + firstWinner.address} xl={4} lg={4} md={12} sm={12} xs={12} className="mb-2">
              <WinnerCard key={'card' + (index + 1) + firstWinner.address} mwinner={winner} mindex={(index + 1)} />
            </Col>
          )
        })}
      </CardDeck>
    </>
  )
}