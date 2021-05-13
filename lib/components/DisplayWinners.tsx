import React from 'react'
import { Table } from 'react-bootstrap';
import { BalanceData } from '../interfaces/response-types';
import { calculateOdds } from '../utils/calculateOdds';
import { mapWinnerData } from '../utils/mapWinnerData';
import { processWinnerData } from '../utils/processWinnerData';
import { LootBoxDetails } from './LootBoxDetails';

export const DisplayWinners = (props) => {
  const { mprizes, mresults } = props

  const winnerDetails = mresults.map((x, index) => {
    mprizes[index].balance = (x.data as BalanceData).controlledTokenBalances[0].balance
    const odds = calculateOdds(mprizes[index])
    const winnerData = mapWinnerData(mprizes[index], odds)
    return winnerData;
  })
  const bigWinners = processWinnerData(winnerDetails);

  // TODO: 
  //  - truncate winner address => 0xe23..cf4
  //  - display lootbox winnings in a meaningful manner
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Address</th>
          <th>Prize Pool</th>
          <th>Win Date</th>
          <th>Tickets Entered</th>
          <th>Odds of Winning</th>
          <th>Main Prize Won</th>
          <th>Lootbox Prize Won</th>
          <th>Total Winnings</th>
        </tr>
      </thead>
      <tbody>
        {bigWinners.map((winner, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{winner.address}</td>
              <td>{winner.poolSymbol}</td>
              <td>{winner.winDate.toDateString()}</td>
              <td>{winner.balance.toFixed(2)}</td>
              <td>1 in {Math.floor(winner.odds)}</td>
              <td>{winner.winnings.toFixed(2) + ' ' + winner.poolSymbol}</td>
              <LootBoxDetails mdata={winner}/>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}