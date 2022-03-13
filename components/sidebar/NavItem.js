import NextLink from 'next/link'
import { Icon, Text, HStack, Box, Link, Spacer } from '@chakra-ui/react'

export const NavItem = ({ isActive, item }) => {
  const { label, icon } = item
  if (label === 'Spacer') return <Box h={{ base: 5, '2xl': 7 }}></Box>

  return (
    <NextLink href="#" passHref>
      <Link variant="unstyled" _hover={{ textDecoration: 'none' }}>
        <HStack
          align="center"
          justify="flex-start"
          height={{ base: 10, '2xl': 14 }}
          transition="ease-out"
          transitionProperty="background"
          transitionDuration="normal"
          _hover={{
            background: 'gray.dark',
          }}
        >
          <Icon
            width={5}
            height={5}
            mr={4}
            ml={8}
            color={isActive ? 'brand.red' : 'gray.light'}
            as={icon}
          />
          <Text
            fontSize="md"
            fontWeight="medium"
            flex={1}
            letterSpacing="wider"
            color={isActive ? 'brand.red' : 'whiteAlpha.900'}
          >
            {label}
          </Text>
          {isActive && <Box width={1} height={6} bg="brand.red" />}
        </HStack>
      </Link>
    </NextLink>
  )
}
