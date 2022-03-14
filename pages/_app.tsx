import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import Layout from "../components/layout/Layout"
import {SessionProvider} from 'next-auth/react'
function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return <SessionProvider session={session}> <ChakraProvider theme={theme}><Layout><Component {...pageProps} /></Layout></ChakraProvider></SessionProvider>
}

export default MyApp


/* height="100vh"
      bg="black"
      width="full"
      overflow="hidden" */