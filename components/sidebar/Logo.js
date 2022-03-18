import { Heading, HStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <HStack pl={2} pt={2} pb={4}>
      <Image src="/spotify-white.png" />
      <Heading fontSize="2xl" color="whiteAlpha.900">
        Spotify
      </Heading>
    </HStack>
  );
};
