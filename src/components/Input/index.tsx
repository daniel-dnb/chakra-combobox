import React from 'react'
import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  SystemStyleObject
} from '@chakra-ui/react'
import { memo } from 'react'
import { MagnifyingGlass } from '../Icons'
import { InputProps } from './types'

export const Input: React.FC<InputProps> = memo(({ inputSx, ...rest }) => {
  const defaultSx: SystemStyleObject = {
    w: 'full',
    borderRadius: '0',
    borderWidth: '0',
    _active: {
      borderColor: 'transparent',
      outline: 'none'
    },
    _focus: {
      borderColor: 'transparent',
      outline: 'none',
      boxShadow: 'none'
    },
    h: '45px'
  }

  const sx = inputSx ? inputSx(defaultSx) : defaultSx

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        sx={{
          h: sx.h
        }}
      >
        <Icon as={MagnifyingGlass} boxSize={5} />
      </InputLeftElement>

      <ChakraInput {...rest} sx={sx} />
    </InputGroup>
  )
})
