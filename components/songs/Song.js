import { Grid, Image, Text, GridItem } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../../atoms/songAtom';
import useSpotify from '../../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../../lib/time';
function Song({ track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };
  return (
    <Grid
      fontSize="xs"
      fontWeight="semibold"
      letterSpacing={0.6}
      alignItems="center"
      px={4}
      templateColumns="repeat(60, 1fr)"
      w="full"
      transition="ease-out"
      transitionProperty="background"
      transitionDuration="normal"
      borderRadius="lg"
      /* py={{ base: 2, '2xl': 2 }} */
      py={2}
      color="whiteAlpha.900"
      _hover={{
        background: 'gray.dark',
        cursor: 'pointer',
      }}
      onClick={playSong}
    >
      <GridItem colSpan={['16', '16', '8', '8']} maxW="50%">
        <Image
          width="40px"
          height="40px"
          minWidth="46px"
          minHeight="46px"
          rounded="xl"
          objectFit="cover"
          quality="75"
          src={track.track.album.images[0].url}
          alt=""
        />
      </GridItem>
      <GridItem colSpan={['25', '25', '17', '17']} maxW="50%">
        <Text isTruncated>{track.track.name}</Text>
      </GridItem>
      <GridItem colSpan={17} maxW="50%">
        <Text isTruncated>{track.track.artists[0].name}</Text>
      </GridItem>

      <GridItem
        colSpan={17}
        maxW="50%"
        display={['none', 'none', 'flex', 'flex']}
      >
        <Text isTruncated>{track.track.album.name}</Text>
      </GridItem>
      <GridItem colStart={60} colEnd={60}>
        <Text>{millisToMinutesAndSeconds(track.track.duration_ms)}</Text>
      </GridItem>
    </Grid>
  );
}
export default Song;
