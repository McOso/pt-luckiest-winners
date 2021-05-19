import React from 'react'
import { Button, Card, CardColumns, Col, Container, Modal, Row } from 'react-bootstrap';
import { calculateGrossWinnings } from '../utils/calculateGrossWinnings';
import { calculateUSD } from '../utils/calculateUSD'
import styles from '../../assets/styles/Home.module.css'


function LootBoxDetailsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.lootBoxModalBackdrop}
      contentClassName={styles.lootBoxModalContent}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.lootBoxTitle} id="contained-modal-title-vcenter">
          Loot Box Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <CardColumns>
            {props.isloot ? props.loot.map((award, index) => {
              return (
                <Card key={'loot' + index + award.amount} className="mx-auto">
                  <Card.Body>
                    <p>{award.amount.toPrecision(8) + ' ' + award.symbol}</p>
                    <p>{'$' + award.amountUSD.toFixed(2)}</p>
                  </Card.Body>
                </Card>
              )
            }) : <></>}
          </CardColumns>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export const DisplayLootBox = (props) => {
  const { mdata, mresults} = props

  const [lootBoxShow, setLootBoxShow] = React.useState(false);

  const totals = calculateUSD(mdata, mresults);

  const gross = calculateGrossWinnings(mdata, totals);

  return (
    <>
      <Card.Footer>
        <Row>
          <Col xs={6}>
            <p className="mb-0 pb-0">Main Prize</p>
            <p className="mt-0 pt-0">{mdata.winnings.toFixed(2) + ' ' + mdata.poolSymbol}</p>
          </Col>
          <Col className="text-right" xs={6}>
            {mdata.externalAwards ? <Button className={styles.lootBoxButton} variant="warning" onClick={() => setLootBoxShow(true)}>
              Loot Box
            </Button> : <></>}
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3>Total Prize</h3>
            <h4 className={styles.textColor}>{'$' + gross.toFixed(2)}</h4>
          </Col>
        </Row>
      </Card.Footer>

      <LootBoxDetailsModal
        show={lootBoxShow}
        isloot={mdata.externalAwards ? "true" : "false"}
        loot={totals}
        onHide={() => setLootBoxShow(false)}
      />
    </>
  )
}