import { List, ListItem, VStack, Text } from '@chakra-ui/react';
import { NavItem } from './NavItem';
import { navData } from './navData';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState } from '../../atoms/playlistAtom';
import { hideSideBarState } from '../../atoms/hideSideBar';
import useSpotify from '../../hooks/useSpotify';
import { Logo } from './Logo';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
const SideBar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const hideSideBar = useRecoilValue(hideSideBarState);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(
          data.body.items.map((item) => {
            return { ...item, selected: false };
          })
        );
      });
    }
  }, [session, spotifyApi]);

  const selectPlaylist = (id) => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === id
          ? { ...playlist, selected: true }
          : { ...playlist, selected: false }
      )
    );
    setPlaylistId(id);
  };

  return (
    <VStack
      display={[
        hideSideBar ? 'none' : 'flex',
        hideSideBar ? 'none' : 'flex',
        hideSideBar ? 'none' : 'flex',
        'flex',
      ]}
      alignItems="flex-start"
      width="full"
      height="full"
      /*  maxW={{ base: 56, '2xl': 72 }} */
      maxW={'15rem'}
      flexShrink={0}
      mb="6"
    >
      <Accordion
        borderBottomColor="gray.dark"
        defaultIndex={[0]}
        allowMultiple
        w="full"
        mb="3"
      >
        <AccordionItem>
          <AccordionButton pb={0} display="visible">
            <AccordionIcon
              pb={0}
              mb={-2}
              transition="ease-out"
              transitionProperty="color"
              transitionDuration="normal"
              _hover={{
                color: 'whiteAlpha.900',
                cursor: 'pointer',
              }}
              height="1.8rem"
              width="1.8rem"
              color="gray.light"
            />
          </AccordionButton>
          <AccordionPanel>
            <Logo />

            <List width="full">
              {navData.map((item, index) => (
                <ListItem key={item.label}>
                  <NavItem
                    item={item}
                    isActive={index === 0}
                    isLogOut={index === 11}
                  />
                </ListItem>
              ))}
              <ListItem></ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/* Playlists... */}
      <List overflowY="auto" w="inherit">
        {playlists.map((playlist) => (
          <ListItem key={playlist.id}>
            <Text
              justify="flex-start"
              /* height={{ base: 5, '2xl': 7 }} */
              /* height={{ base: 5, '2xl': '6' }}
              letterSpacing={2}
              fontSize="sm"
              fontWeight="400" */
              height={8}
              letterSpacing={0.8}
              fontSize="xs"
              fontWeight="bold"
              transition="ease-out"
              transitionProperty="color"
              transitionDuration="normal"
              _hover={{
                color: 'whiteAlpha.900',
                cursor: 'pointer',
              }}
              mx={6}
              flex={1}
              isTruncated
              color={playlist.selected ? 'brand.red' : 'gray.light'}
              onClick={() => {
                selectPlaylist(playlist.id);
              }}
            >
              {playlist.name}
            </Text>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default SideBar;
