import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { Col } from 'react-bootstrap';
import { useDetailedPrizes } from '../hooks/useDetailedPrizes';
import { WinnerData } from '../interfaces/local-types';

export const BigWinners = (props) => {
  const { mdata } = props
  const [bigWinners, setBigWinners] = useState(new Array<WinnerData>())

  const queryClient = useQueryClient();

  useDetailedPrizes(mdata, setBigWinners);

  return (
    <Col xs={12} md={12}>
      <p>Data: {JSON.stringify(bigWinners)}</p>
      <p>This is the BigWinners</p>
    </Col>
  )
}