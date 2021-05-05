import React from 'react'
import { calculateUSD } from '../utils/calculateUSD'

export const DisplayLootBox = (props) => {
  const { mdata, mresults} = props

  const totals = calculateUSD(mdata, mresults);

  return (
    <>
    <td></td>
    <td></td>
    </>
  )
}