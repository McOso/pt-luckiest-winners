import Head from 'next/head'
import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { LeaderBoard } from '../lib/components/LeaderBoard'
import DiscordLogo from '../assets/res/discord-footer.svg'
import GithubLogo from '../assets/res/github-footer.svg'
import PTLogo from '../assets/res/pooltogether-logo.svg'
import styles from '../assets/styles/Home.module.css'


export default function Home() {
  return (
    <Container>
      <Head>
        <title>PoolTogether Luckiest Winners</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar>
          <Navbar.Brand>
            <Image width="200px" alt='discord logo' src={PTLogo} className='m-1' />
          </Navbar.Brand>
        </Navbar>
      </header>
      <br />
      <main>
        <h1 className={styles.titleMain}>
          Luckiest Winners Leaderboard
        </h1>

        <br />

        <LeaderBoard />

        <footer>
          <hr />
          <Nav>
            <Nav.Item>
              <Nav.Link href="https://discordapp.com/users/667834273289732116" target="_blank">
                <Image width="35px" alt='discord logo' src={DiscordLogo} className='m-1' />
                @McOso#7958
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com/McOso" target="_blank">
                <Image width="35px" alt='discord logo' src={GithubLogo} className='m-1' />
                @McOso
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </footer>
                
      </main>
    </Container>
  )
}
