import { Button, List, ListItem, VStack } from '@chakra-ui/react'
import { NavItem } from './NavItem'
import { navData } from './navData'
import { signOut, useSession } from 'next-auth/react'
const SideBar = () => {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <VStack
      alignItems="flex-start"
      width="full"
      height="full"
      maxW={{ base: 56, '2xl': 72 }}
      borderRightColor="gray.dark"
      borderRightWidth={2}
      flexShrink={0}
    >
      <Button onClick={() => signOut()}> Log out</Button>
      {/*  <Logo /> */}

      <List width="full" overflowY="auto">
        {navData.map((item, index) => (
          <ListItem key={item.label}>
            <NavItem item={item} isActive={index === 0} />
          </ListItem>
        ))}
      </List>
    </VStack>
  )
}

export default SideBar
