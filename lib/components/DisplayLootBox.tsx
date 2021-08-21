import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { calculateGrossWinnings } from '../utils/calculateGrossWinnings';
import { calculateUSD } from '../utils/calculateUSD'
import styles from '../../assets/styles/Home.module.css'
import NumberFormat from 'react-number-format'


export const DisplayLootBox = (props) => {
  const { mdata, mresults} = props

  const totals = calculateUSD(mdata, mresults);

  const gross = calculateGrossWinnings(mdata, totals);

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>
            <NumberFormat value={gross.toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </h1>
        </Col>
      </Row>
    </>
  )
}
