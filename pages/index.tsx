import type { NextPage } from 'next'
import { getSession, GetSessionParams } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/sidebar/SideBar'

const Home: NextPage = () => {
  return (
    <>
      <SideBar/>
      
      {/* center */}
      {/* player */}
   </>
  )
}

export default Home


export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);
  
  return {
    props: {
      session,
    },
  };
}