import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { Col } from 'react-bootstrap';
import { useDetailedPrizes } from '../hooks/useDetailedPrizes';
import { WinnerData } from '../interfaces/local-types';
import { DisplayWinners } from './DisplayWinners';

export const BigWinners = (props) => {
  const { mdata } = props
  const [bigWinners, setBigWinners] = useState(new Array<WinnerData>())

  const queryClient = useQueryClient();

  const {detailedPrizes, results} = useDetailedPrizes(mdata, setBigWinners);

  return (
    <Col xs={12} md={12}>
      {results.some(x => x.isError) ? (<span>Error: {JSON.stringify(results.find(x => x.error))}</span>) : results.some(x => x.isLoading) ? (
          <h4>Loading..</h4>
        ) : <DisplayWinners mprizes={detailedPrizes} mresults={results} />}
      <p>This is the BigWinners</p>
    </Col>
  )
}