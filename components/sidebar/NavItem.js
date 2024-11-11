import NextLink from 'next/link';
import { Heading, Icon, Text, HStack, Box, Link } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

export const NavItem = ({ isActive, item, isLogOut }) => {
  const { label } = item;

  if (item.type === 'link') {
    const { icon } = item;

    return (
      <NextLink href="#" passHref>
        <Link variant="unstyled" _hover={{ textDecoration: 'none' }}>
          <HStack
            onClick={() => isLogOut && signOut()}
            align="center"
            justify="flex-start"
            /*  height={{ base: 10, '2xl': 14 }} */
            height={10}
            transition="ease"
            transitionProperty="background"
            transitionDuration="normal"
            _hover={{
              background: 'gray.dark',
            }}
          >
            <Icon
              width={5}
              height={5}
              mr={2}
              ml={2}
              color={isActive ? 'brand.red' : 'gray.light'}
              as={icon}
            />
            <Text
              fontSize="sm"
              fontWeight="medium"
              flex={0.86}
              letterSpacing="wider"
              color={isActive ? 'brand.red' : 'whiteAlpha.900'}
            >
              {label}
            </Text>
            {isActive && <Box width={1} height={6} bg="brand.red" />}
          </HStack>
        </Link>
      </NextLink>
    );
  }

  return (
    <Heading
      color="gray.light"
      fontWeight="normal"
      textTransform="uppercase"
      letterSpacing={8}
      fontSize="sm"
      ml={2}
      /* mt={{ base: 2, '2xl': 4 }} */
      mt={2}
      mb={2}
    >
      {label}
    </Heading>
  );
};
