import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LeaderBoard } from '../lib/components/LeaderBoard'
import LeaderboardTextImg from '../assets/res/leaderboard-text.png'
import BrandLogo from '../assets/res/brand.png'
import styles from '../assets/styles/Home.module.css'
import { DepositButton } from '../lib/components/DepositButton'
import ptIconImg from '../assets/res/pooltogether-icon.png'


export default function Home() {
  return (
    <>
    <Container>
      <Head>
        <title>PoolTogether Luckiest Winners</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jwv5rga.css" />
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="PoolTogether Luckiest Winners">
        <meta name="twitter:description" content="Leaderboard of the luckiest winners on PoolTogether!">
        <meta name="twitter:image" content="https://github.com/McOso/pt-luckiest-winners/blob/main/assets/res/small-fish-win_twitter.png?raw=true">
      </Head>

      <header>
        <div className={styles.textCenter}>
          <Image width="340" height="340" src={BrandLogo.src} layout="intrinsic" />
        </div>
      </header>
      <br />
      <main>
        <div className={styles.leaderboardText}>
          <Image width="584" height="253" src={LeaderboardTextImg.src} layout="intrinsic" />
        </div>

        <br />

        <LeaderBoard />

        <div className={styles.callToAction}>
          <h3>Want to test your luck?</h3>
          <DepositButton />
        </div>                
      </main>
    </Container>
    <footer id="mainFooter">
      <Container fluid className={styles.flexContainer}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row className={styles.flexRow}>
              <p className={styles.footerText}>Proudly made by</p>
              <Image width="50" height="50" src={ptIconImg.src} layout="intrinsic" />
              <p className={styles.footerText}>community ✌✨️</p>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  )
}
