import Head from 'next/head'
import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { LeaderBoard } from '../lib/components/LeaderBoard'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <Container>
      <Head>
        <title>PoolTogether Luckiest Winners</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          PoolTogether Luckiest Winners Leaderboard
        </h1>

        <LeaderBoard />
                
      </main>

      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </Container>
  )
}
