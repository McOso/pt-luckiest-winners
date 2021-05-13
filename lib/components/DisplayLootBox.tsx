import React from 'react'
import { calculateGrossWinnings } from '../utils/calculateGrossWinnings';
import { calculateUSD } from '../utils/calculateUSD'

export const DisplayLootBox = (props) => {
  const { mdata, mresults} = props

  const totals = calculateUSD(mdata, mresults);

  const gross = calculateGrossWinnings(mdata, totals);

  return (
    <>
    <td>
    {mdata.externalAwards ? totals.map((award, index) => {
          return (
            <>
            <p>{award.amount.toPrecision(8) + ' ' + award.symbol}</p>
            <p>{'$' + award.amountUSD.toFixed(2)}</p>
            </>
          )
        }) : <></>}
    </td>
    <td>{'$' + gross.toFixed(2)}</td>
    </>
  )
}