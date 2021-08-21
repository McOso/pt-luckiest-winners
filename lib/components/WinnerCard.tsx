import React from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { LootBoxDetails } from './LootBoxDetails';
import styles from '../../assets/styles/Home.module.css'
import classes from '../../assets/styles/Card.module.css'
import NumberFormat from 'react-number-format'

export const WinnerCard = (props) => {
  const { mwinner, mindex, main} = props

  return (
    <Card className={`mx-auto ${classes.card}`}>
      <Card.Body>
        <Row className="mb-4">
          <Col className="text-left" xs={6}>
            <p>{'Prize #' + (mindex + 1) + ' 🏆'}</p>
          </Col>
          <Col className="text-right" xs={6}>
            <p>{mwinner.winDate.toDateString()}</p>
          </Col>
        </Row>
        <div className={classes.cardCenter}>
          <LootBoxDetails mdata={mwinner}/>
        
          <div className="text-center">
            <p className="mb-0 pb-0">With only <span className={classes.deposit}><NumberFormat value={mwinner.balance.toFixed(0)} displayType={'text'} thousandSeparator={true} suffix={' ' + mwinner.poolSymbol} /></span> deposited! 😮</p>
            <p className="mt-0 pt-0">
              Winning odds: 1 in <NumberFormat value={Math.floor(mwinner.odds)} displayType={'text'} thousandSeparator={true} />.
            </p>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className={`mx-auto ${classes.cardFooter}`}>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-${mwinner.address}`}>
              {mwinner.address}
            </Tooltip>
          }
        >
          <a className="" href={`https://app.pooltogether.com/players/${mwinner.address}`} target="_blank">View Player</a>
        </OverlayTrigger>
      </Card.Footer>
    </Card>
  )
}
