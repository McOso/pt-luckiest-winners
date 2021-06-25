import React from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { LootBoxDetails } from './LootBoxDetails';
import styles from '../../assets/styles/Home.module.css'
import NumberFormat from 'react-number-format'

export const WinnerCard = (props) => {
  const { mwinner, mindex, main} = props

  return (
    <Card className={`mx-auto ${main ? styles.glow + ' mb-3' : ''}`}>
      <Card.Body>
        <Row className="mb-4">
          <Col className="text-left" xs={6}>
            <h1 className={styles.winnerRank}>{'#' + (mindex + 1)}</h1>
          </Col>
          <Col className="text-right" xs={6}>
            {mwinner.winDate.toDateString()}
          </Col>
        </Row>
        <LootBoxDetails mdata={mwinner}/>
      
        <div className="text-center mt-4 pt-4">
          <h2 className="mb-0 pb-0"><NumberFormat value={mwinner.balance.toFixed(2)} displayType={'text'} thousandSeparator={true} suffix={' ' + mwinner.poolSymbol} /></h2>
          <h4 className="mt-0 pt-0">Deposited</h4>
          <p className="mt-4 pt-4">
            Winning odds: 1 in <NumberFormat value={Math.floor(mwinner.odds)} displayType={'text'} thousandSeparator={true} />
          </p>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-${mwinner.address}`}>
                {mwinner.address}
              </Tooltip>
            }
          >
            <a className="mt-0 pt-0" href={`https://app.pooltogether.com/players/${mwinner.address}`} target="_blank">View Player</a>
          </OverlayTrigger>
        </div>
      </Card.Body>
    </Card>
  )
}
