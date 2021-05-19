import React from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { shorten } from '../utils/shorten';
import { LootBoxDetails } from './LootBoxDetails';
import styles from '../../assets/styles/Home.module.css'

export const WinnerCard = (props) => {
  const { mwinner, mindex } = props

  return (
    <Card className="mx-auto">
      <Card.Header>
        <Row>
          <Col className="text-left" xs={6}>
            <h1>{'#' + (mindex + 1)}</h1>
          </Col>
          <Col className="text-right" xs={6}>
            {mwinner.winDate.toDateString()}
          </Col>
        </Row>
        <Row>
          <Col className="text-center" xs={12}>
            <h3>Odds</h3>
            <h4>1 in <span className={styles.textBold}>{Math.floor(mwinner.odds)}</span></h4>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <div className="text-center">
          <p className="mb-0 pb-0">Deposit</p>
          <p className="mt-0 pt-0">{mwinner.balance.toFixed(2) + ' ' + mwinner.poolSymbol}</p>
          <p className="mb-0 pb-0">Player</p>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-${mwinner.address}`}>
                {mwinner.address}
              </Tooltip>
            }
          >
            <a className="mt-0 pt-0" href={`https://app.pooltogether.com/players/${mwinner.address}`} target="_blank">{shorten(mwinner.address)}</a>
          </OverlayTrigger>
          
        </div>
      </Card.Body>
      <LootBoxDetails mdata={mwinner}/>
    </Card>
  )
}