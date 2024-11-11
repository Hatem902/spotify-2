import Songs from '../songs/Songs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../../atoms/playlistAtom';
import useSpotify from '../../hooks/useSpotify';
import {
  Button,
  Flex,
  Text,
  Image,
  HStack,
  Box,
  Heading,
} from '@chakra-ui/react';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { hideSideBarState } from '../../atoms/hideSideBar';
import { FaChevronDown } from 'react-icons/fa';
const colors = [
  'blue.200',
  'green.200',
  'red.200',
  'yellow.200',
  'pink.200',
  'purple.200',
];
function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [hideSideBar, setHideSideBar] = useRecoilState(hideSideBarState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('Something went wrong!', err));
  }, [spotifyApi, playlistId]);

  return (
    <Flex pl={1} flexDir="column" width="full" height="full" overflowY="scroll">
      <Box
        onClick={() =>
          hideSideBar ? setHideSideBar(false) : setHideSideBar(true)
        }
        display={['flex', 'flex', 'flex', 'none']}
        spacing={3}
        position="absolute"
        top="9"
        right="170"
        alignItems="center"
        bg="gray.dark"
        borderRadius="full"
        opacity="90%"
        _hover={{
          opacity: '70%',
          cursor: 'pointer',
        }}
        p="1"
        px="2"
      >
        <RiMenuUnfoldLine color="white" />
      </Box>
      <HStack
        spacing={3}
        position="absolute"
        top="8"
        right="8"
        alignItems="center"
        bg="gray.dark"
        borderRadius="full"
        opacity="90%"
        _hover={{
          opacity: '70%',
          cursor: 'pointer',
        }}
        p="1"
        pr="2"
      >
        <Image
          h="6"
          w="6"
          borderRadius="full"
          src={session?.user.image}
          alt=""
          opacity="revert"
        />
        <Text opacity="100%" color="whiteAlpha.900">
          {session?.user.name}
        </Text>
        <FaChevronDown color="white" height="16" width="16" />
      </HStack>

      <Flex
        bgGradient={`linear(to-b,${color}, black )`}
        alignItems="flex-end"
        p="8"
        pb="28"
        color="whiteAlpha.900"
        mb={-8}
      >
        <Image
          ml="2.8rem"
          mt="38"
          mr="7"
          mb="2"
          height="44"
          width="44"
          shadow="2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <Box>
          <Text
            color="gray.dark"
            fontWeight="normal"
            letterSpacing={16}
            /* mt={['2', '3', '3', '4']} */
            mt={4}
            mb={0}
            /* fontSize={['lg', 'xl', 'xl', '2xl']} */
            fontSize="2xl"
          >
            PLAYLIST
          </Text>
          <Heading
            fontWeight="bold"
            fontSize={['3xl', '3xl', '5xl', '5xl']} /* fontSize="5xl" */
          >
            {playlist?.name}
          </Heading>
        </Box>
      </Flex>

      <Songs />
    </Flex>
  );
}

export default Center;
