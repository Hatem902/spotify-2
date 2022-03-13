import { Box } from '@chakra-ui/layout'
const Layout = ({ children }) => {
  return (
    <Box height="100vh" bg="black" width="full" overflow="hidden">
      {children}
    </Box>
  )
}

export default Layout
