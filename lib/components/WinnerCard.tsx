import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { LootBoxDetails } from './LootBoxDetails';

export const WinnerCard = (props) => {
  const { mwinner, mindex } = props

  return (
    <Card key={'innercard' + mindex + mwinner.address} className="mx-auto">
      <Card.Header>
        <Row>
          <Col className="text-left" xs={4}>
            <h1>{'#' + (mindex + 1)}</h1>
          </Col>
          <Col className="text-center" xs={4}>
            <h3>Odds</h3>
            <h4>1 in {Math.floor(mwinner.odds)}</h4>
          </Col>
          <Col className="text-right" xs={4}>
            {mwinner.winDate.toDateString()}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <div className="text-center">
          <p className="mb-0 pb-0">Deposit</p>
          <p className="mt-0 pt-0">{mwinner.balance.toFixed(2) + ' ' + mwinner.poolSymbol}</p>
          <p className="mb-0 pb-0">Player</p>
          <p className="mt-0 pt-0">{mwinner.address}</p>
        </div>
      </Card.Body>
      <LootBoxDetails mdata={mwinner}/>
    </Card>
  )
}