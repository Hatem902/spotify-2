import { motion } from 'framer-motion'
import { Box, Flex } from '@chakra-ui/react'

import { Image } from '../Image'

const MotionBox = motion(Box)

export const Disc = ({ spinning }) => {
  return (
    <MotionBox
      display={{ base: 'none', xl: 'flex' }}
      animate={{
        rotate: spinning ? 360 : 0,
      }}
      transition={{
        duration: spinning ? 3 : 0,
        repeat: Infinity,
        type: 'tween',
        ease: 'linear',
      }}
      rounded="full"
      overflow="hidden"
      position="relative"
      maxW={20}
      maxH={20}
      width="full"
      height="full"
      ml="8"
    >
      <Image
        width="80px"
        height="80px"
        src="/gradient-mesh.png"
        objectFit="cover"
      />
      <Flex
        position="absolute"
        inset={0}
        alignItems="center"
        justifyContent="center"
      >
        <Box width={6} height={6} bg="gray.dark" rounded="full" />
      </Flex>
    </MotionBox>
  )
}
