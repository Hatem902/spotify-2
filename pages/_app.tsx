import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import Layout from "../components/layout/Layout"
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return <SessionProvider session={session}> <RecoilRoot> <ChakraProvider theme={theme}><Layout><Component {...pageProps} /></Layout></ChakraProvider></RecoilRoot></SessionProvider>
}

export default MyApp

