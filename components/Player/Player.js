import { Disc } from './Disc';
import { millisToMinutesAndSeconds } from '../../lib/time';
import { MdGraphicEq } from 'react-icons/md';
import { playlistState } from '../../atoms/playlistAtom';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../../atoms/songAtom';
import useSongInfo from '../../hooks/useSongInfo';
import useSpotify from '../../hooks/useSpotify';
import { FaHeart, FaVolumeMute } from 'react-icons/fa';
import { PlayerControl } from './player-control';
import { PlayerControls } from './player-controls';
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaStop,
  FaVolumeUp,
  FaVolumeDown,
} from 'react-icons/fa';
import { FiRepeat } from 'react-icons/fi';
import { RiPlayListFill } from 'react-icons/ri';
import {
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Image,
} from '@chakra-ui/react';
function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [seeking, setSeeking] = useState(false);
  const songInfo = useSongInfo();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentIdTrack(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!seeking)
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setDuration(data.body?.item.duration_ms);
          setProgress(data.body?.progress_ms);
        });
    }, 500);
    return () => clearInterval(interval);
  }, [seeking]);
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  const debouncedAdjustProgress = useCallback(
    debounce((progress) => {
      spotifyApi.seek(progress).catch((err) => {});
    }, 500),
    []
  );
  const playlist = useRecoilValue(playlistState);
  const skipToPrevious = () => {
    const previousTrackIndex =
      -1 +
      playlist?.tracks.items.findIndex((track) => {
        return track.track.id === currentTrackId;
      });

    if (previousTrackIndex >= 0) {
      spotifyApi.skipToPrevious();
      setCurrentIdTrack(playlist?.tracks.items[previousTrackIndex].track.id);
    }
  };
  const skipToNext = () => {
    const nextTrackIndex =
      1 +
      playlist?.tracks.items.findIndex((track) => {
        return track.track.id === currentTrackId;
      });

    if (nextTrackIndex < playlist?.tracks.items.length) {
      spotifyApi.skipToNext();
      setCurrentIdTrack(playlist?.tracks.items[nextTrackIndex].track.id);
    }
  };
  return (
    <Flex
      overflow="hidden"
      color="whiteAlpha.900"
      width="full"
      bg="gray.dark"
      height={['24', '24', '24', '32']}
      /* height={{ base: 24, '2xl': 32 }} */
      flexShrink={0}
      alignItems="center"
    >
      <Disc spinning={isPlaying} />

      <Container centerContent height="full" maxW="8xl">
        <HStack
          width="full"
          height="full"
          justifyContent="flex-start"
          spacing={12}
        >
          {/* <SongInfo /> */}
          <HStack spacing={1}>
            <Image
              width="56px"
              height="56px"
              minWidth="56px"
              minHeight="56px"
              rounded="xl"
              objectFit="cover"
              quality="75"
              src={songInfo?.album?.images?.[0]?.url}
              alt=""
            />
            <VStack spacing={2} alignItems="flex-start" w="36">
              <Heading size="sm">{songInfo?.name}</Heading>
              <Text fontSize={14} color="gray.light">
                {songInfo?.artists?.[0]?.name}
              </Text>
            </VStack>

            <PlayerControl
              label="Add to favorites"
              icon={<FaHeart />}
              color="brand.red"
            />
          </HStack>

          <PlayerControls
            controls={[
              {
                label: 'Previous song',
                icon: <FaStepBackward />,
                click: () => skipToPrevious(),
              },

              {
                label: isPlaying ? 'Stop song' : 'Play song',
                icon: isPlaying ? <FaStop /> : <FaPlay />,
                click: () => handlePlayPause(),
              },
              {
                label: 'Next song',
                icon: <FaStepForward />,
                click: () => skipToNext(),
              },
            ]}
          />
          {/* <PlayerProgress /> */}
          <HStack spacing={8} flex={1}>
            <Text fontSize={12} color="gray.light">
              {millisToMinutesAndSeconds(progress)}
            </Text>
            <Slider
              focusThumbOnChange={false}
              height="full"
              flex={1}
              width="full"
              position="relative"
              defaultValue={progress}
              value={progress}
              onChange={async (value) => {
                setSeeking(true);
                setProgress(value);
                await setTimeout(() => {
                  setSeeking(false);
                }, 3000);
                debouncedAdjustProgress(value);
              }}
              min={0}
              max={duration}
            >
              <SliderTrack bg="gray.light">
                <SliderFilledTrack bg="brand.red" />
              </SliderTrack>
              <SliderThumb
                _hover={{
                  background: 'whiteAlpha.900',
                }}
                bg="black"
                boxSize="6"
              >
                <PlayerControl
                  label={`${millisToMinutesAndSeconds(
                    duration - progress
                  )} left`}
                  icon={<MdGraphicEq />}
                  color="brand.red"
                  thumb={true}
                  size="lg"
                />
              </SliderThumb>
            </Slider>

            <Text fontSize={12} color="gray.light">
              {millisToMinutesAndSeconds(duration)}
            </Text>
          </HStack>

          <PlayerControls
            controls={[
              { label: 'Enable repeat', icon: <FiRepeat /> },
              { label: 'Playlist', icon: <RiPlayListFill /> },
            ]}
          />
          <HStack flex={1} height="full" spacing={2}>
            <PlayerControl
              label="Volume down"
              icon={<FaVolumeDown />}
              click={() =>
                volume > 0 && setVolume(volume >= 10 ? volume - 10 : 0)
              }
            />

            {/* Volume Slider */}
            <Slider
              focusThumbOnChange={false}
              height="full"
              maxW="106"
              flex={1}
              width="full"
              position="relative"
              defaultValue={50}
              value={volume}
              onChange={(value) => setVolume(value)}
              min={0}
              max={100}
            >
              <SliderTrack bg="gray.light">
                <SliderFilledTrack bg="brand.red" />
              </SliderTrack>
              <SliderThumb
                _hover={{
                  background: 'whiteAlpha.900',
                }}
                bg="black"
                boxSize="5"
              >
                <PlayerControl
                  label={`${volume}%`}
                  icon={volume ? <MdGraphicEq /> : <FaVolumeMute />}
                  color="brand.red"
                  thumb={true}
                />
              </SliderThumb>
            </Slider>
            <PlayerControl
              label="Volume up"
              icon={<FaVolumeUp />}
              click={() =>
                volume < 100 && setVolume(volume <= 90 ? volume + 10 : 100)
              }
            />
          </HStack>
        </HStack>
      </Container>
    </Flex>
  );
}
export default Player;
