import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LeaderBoard } from '../lib/components/LeaderBoard'
import LeaderboardTextImg from '../public/Leaderboard-text.svg'
import BrandLogo from '../public/Brand.svg'
import styles from '../assets/styles/Home.module.css'
import { DepositButton } from '../lib/components/DepositButton'
import ptIconImg from '../public/PoolTogether-Icon.svg'


export default function Home() {
  return (
    <>
    <Container>
      <Head>
        <title>PoolTogether Luckiest Winners</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jwv5rga.css" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PoolTogether Luckiest Winners" />
        <meta name="twitter:description" content="Leaderboard of the luckiest winners on PoolTogether!" />
        <meta name="twitter:image" content="https://github.com/McOso/pt-luckiest-winners/blob/main/assets/res/small-fish-win_twitter.png?raw=true" />
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
    {/* <footer id="mainFooter">
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
    </footer> */}

    {/* <!--Waves Container--> */}
      <div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(126,70,242,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(126,70,242,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(126,70,242,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#7E46F2" />
          </g>
        </svg>
      </div>
    {/* <!--Waves end--> */}
    <div className="content-wave flex-wave">
      <p className={styles.footerText}>Proudly made by</p>
      <Image width="50" height="50" src={ptIconImg.src} layout="intrinsic" />
      <p className={styles.footerText}>community ✌✨️</p>
    </div>
    </>
  )
}
