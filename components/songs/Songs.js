import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../../atoms/playlistAtom';
import Song from './Song';
function Songs() {
  const playlist = useRecoilValue(playlistState);
  const HeaderCell = ({ value }) => (
    <Heading
      fontSize="xs"
      fontWeight="semibold"
      letterSpacing={0.3}
      isTruncated
      textTransform="none"
      color="gray.light"
    >
      {value}
    </Heading>
  );
  return (
    <Flex
      flex={1}
      flexDir="column"
      spacing={0}
      align="flex-start"
      height="full"
      mx="3.8rem"
    >
      <Grid
        minW="full"
        /* py={{ base: 3, '2xl': 3 }} */
        py={3}
        alignItems="center"
        px={4}
        templateColumns="repeat(60, 1fr)"
        w="full"
      >
        <GridItem colSpan={['16', '16', '8', '8']} maxW="50%">
          <HeaderCell value="" />
        </GridItem>
        <GridItem colSpan={['25', '25', '17', '17']} maxW="50%">
          <HeaderCell value="Name" />
        </GridItem>
        <GridItem colSpan={17} maxW="50%">
          <HeaderCell value="Producer" />
        </GridItem>
        <GridItem
          colSpan={17}
          maxW="50%"
          display={['none', 'none', 'flex', 'flex']}
        >
          <HeaderCell value="Album" />
        </GridItem>
        <GridItem colStart={60} colEnd={60}>
          <HeaderCell value="Time" />
        </GridItem>
      </Grid>
      <Box overflowY="auto">
        {playlist?.tracks.items.map((track) => (
          <Song key={track.track.id} track={track} />
        ))}
      </Box>
    </Flex>
  );
}
export default Songs;
