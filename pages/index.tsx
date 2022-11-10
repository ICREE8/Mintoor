import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Disconnected from '../components/Disconnected'
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"
import dynamic from 'next/dynamic';

const WalletDisconnectButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
  { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const { connected } = useWallet()

  return (
    <div className={styles.container}>
      <Head>
        <title>Buildoors</title>
        <meta name="The NFT Collection for Buildoors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={"url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
					{ /* NavBar */ }
          <div className={styles.walletButtons}>
                    <WalletMultiButtonDynamic />
                    <WalletDisconnectButtonDynamic />
                </div>
            <NavBar />

          <Spacer />
          //Dynamic buttons
          
          <Center>
						{ /* If connected, the second view, otherwise the first */ }
            {connected ? <Connected /> : <Disconnected />}
                </Center>
          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://twitter.com/1cree8"
                target="_blank"
                rel="noopener noreferrer"
              >
                built by @1cree8
              </a>
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}

export default Home