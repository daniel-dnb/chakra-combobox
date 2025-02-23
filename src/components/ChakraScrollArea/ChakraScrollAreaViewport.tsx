import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Viewport, ScrollAreaViewportProps } from '@radix-ui/react-scroll-area'
import { forwardRef } from 'react'

type ChakraScrollAreaViewportProps = BoxProps & ScrollAreaViewportProps

export const ChakraScrollAreaViewport = forwardRef<
  HTMLDivElement,
  ChakraScrollAreaViewportProps
>((props, ref) => (
  <Box
    as={Viewport}
    ref={ref}
    w='100%'
    maxH='225px'
    h='full'
    borderRadius='inherit'
    px='calc(var(--scrollbar-size) + 4px)'
    {...props}
  >
    {props.children}
  </Box>
))
