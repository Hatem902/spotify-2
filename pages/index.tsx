
import Center from '../components/center/Center'
import type { NextPage } from 'next'
import { getSession, GetSessionParams } from 'next-auth/react'
import SideBar from '../components/sidebar/SideBar'
import { HStack } from '@chakra-ui/react'
import Player from '../components/Player/Player'

const Home: NextPage = () => {
  return (
    <>
      <HStack spacing={0} w='full' flex={1} overflow='hidden'>
      <SideBar/>
        <Center />
      </HStack>
      <Player/>
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