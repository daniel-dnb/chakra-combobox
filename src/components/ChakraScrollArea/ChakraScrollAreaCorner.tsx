import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Corner, ScrollAreaThumbProps } from '@radix-ui/react-scroll-area'

type ChakraScrollAreaCornerProps = BoxProps & ScrollAreaThumbProps

export const ChakraScrollAreaCorner: React.FC<ChakraScrollAreaCornerProps> = ({
  ...rest
}) => {
  return <Box as={Corner} {...rest} />
}
