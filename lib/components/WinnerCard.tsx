import React from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { LootBoxDetails } from './LootBoxDetails';
import styles from '../../assets/styles/Home.module.css'
import classes from '../../assets/styles/Card.module.css'
import NumberFormat from 'react-number-format'

export const WinnerCard = (props) => {
  const { mwinner, mindex, main} = props

  const playerClick = (address: string) => {
    const url = 'https://app.pooltogether.com/account/' + address
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const EMOJIS = [
    '✌ 🤑 🥇',
    '✨ 🥳 🥈',
    '💸 🤯 🥉',
    '🌊 😎 🏆',
    '💜 😍 🤞',
    '💃 🤩 🕺',
    '🌈 😮 🍀',
    '🎲 😛 🐠',
    '🌚 😏 🌝',
    '💰 😊 🎉'
  ]

  return (
    <Card className={`mx-auto ${classes.card}`} onClick={() => { playerClick(mwinner.address) }}>
      <Card.Body>
        <Row className="mb-4">
          <Col className="text-left" xs={5}>
            <p>{'Prize #' + (mindex + 1) + ' 🏆'}</p>
          </Col>
          <Col className="text-right" xs={7}>
            <p>{mwinner.winDate.toDateString()}</p>
          </Col>
        </Row>
        <div className={classes.cardCenter}>
          <LootBoxDetails mdata={mwinner}/>
        
          <div className="text-center">
            <p className="mb-0 pb-0">With only <span className={classes.deposit}><NumberFormat value={mwinner.balance.toFixed(0)} displayType={'text'} thousandSeparator={true} suffix={' ' + mwinner.poolSymbol} /></span> deposited!</p>
            <p className="mt-0 pt-0">
              Winning odds: 1 in <NumberFormat value={Math.floor(mwinner.odds)} displayType={'text'} thousandSeparator={true} />.
            </p>
            <span className={classes.emojiGroup}>{EMOJIS[mindex]}</span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className={`mx-auto ${classes.cardFooter}`}>
        <p>Click to View Player</p>
      </Card.Footer>
    </Card>
  )
}
