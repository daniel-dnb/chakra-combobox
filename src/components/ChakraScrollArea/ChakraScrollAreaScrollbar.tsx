import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import {
  Scrollbar,
  ScrollAreaScrollbarProps
} from '@radix-ui/react-scroll-area'

type ChakraScrollAreaScrollbarProps = BoxProps & ScrollAreaScrollbarProps

export const ChakraScrollAreaScrollbar: React.FC<
  ChakraScrollAreaScrollbarProps
> = ({ children, ...rest }) => {
  return (
    <Box as={Scrollbar} {...rest} userSelect='none' display='flex'>
      {children}
    </Box>
  )
}
