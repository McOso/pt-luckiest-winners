import React from 'react'
import { Button } from 'react-bootstrap';
import classes from '../../assets/styles/Button.module.css'

export const DepositButton = () => {

  return (
    <Button id="depositButton" className={classes.button} href="https://app.pooltogether.com/" target="_blank">
      DEPOSIT NOW!
    </Button>
  )
}
