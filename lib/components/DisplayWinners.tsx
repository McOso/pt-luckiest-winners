import React from 'react'
import { CardDeck, Col } from 'react-bootstrap';
import { BalanceData } from '../interfaces/response-types';
import { calculateOdds } from '../utils/calculateOdds';
import { mapWinnerData } from '../utils/mapWinnerData';
import { processWinnerData } from '../utils/processWinnerData';
import { WinnerCard } from './WinnerCard';

export const DisplayWinners = (props) => {
  const { wrapperv1, wrapperv3, wrapperpoly } = props

  const winnerDetailsV1 = MapWinnerDetails(wrapperv1)
  const winnerDetailsV3 = MapWinnerDetails(wrapperv3)
  const winnerDetailsPoly = MapWinnerDetails(wrapperpoly)
  const bigWinners = processWinnerData(winnerDetailsV1, winnerDetailsV3, winnerDetailsPoly);

  const firstWinner = bigWinners[0];
  const twoToTenWinners = bigWinners.slice(1,10);

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

const MapWinnerDetails = (prizeDetailWrapper) => {
  const winnerDetails = prizeDetailWrapper.results.map((x, index) => {
    prizeDetailWrapper.detailedPrizes[index].balance = (x.data as BalanceData).controlledTokenBalances[0].balance
    const odds = calculateOdds(prizeDetailWrapper.detailedPrizes[index])
    const winnerData = mapWinnerData(prizeDetailWrapper.detailedPrizes[index], odds)
    return winnerData;
  })
  return winnerDetails
}
