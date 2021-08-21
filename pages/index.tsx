import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LeaderBoard } from '../lib/components/LeaderBoard'
import DiscordLogo from '../assets/res/discord-footer.svg'
import GithubLogo from '../assets/res/github-footer.svg'
import LeaderboardTextImg from '../assets/res/LeaderBoard_text.png'
import BrandLogo from '../assets/res/Brand.png'
import styles from '../assets/styles/Home.module.css'


export default function Home() {
  return (
    <Container>
      <Head>
        <title>PoolTogether Luckiest Winners</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jwv5rga.css" />
      </Head>

      <header>
        <div className={styles.textCenter}>
          <Image width="340" height="340" src={BrandLogo} layout="intrinsic" />
        </div>
      </header>
      <br />
      <main>
        <div className={styles.leaderboardText}>
          <Image width="584" height="253" src={LeaderboardTextImg} layout="intrinsic" />
        </div>

        <br />

        <LeaderBoard />

        <footer>
          <hr />
          {/* <Nav>
            <Nav.Item>
              <Nav.Link href="https://discordapp.com/users/667834273289732116" target="_blank">
                <Image width="35px" alt='discord logo' src={DiscordLogo} className='m-1' />
                @McOso#7958
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com/McOso" target="_blank">
                <Image width="35px" alt='github logo' src={GithubLogo} className='m-1' />
                @McOso
              </Nav.Link>
            </Nav.Item>
          </Nav> */}
        </footer>
                
      </main>
    </Container>
  )
}
