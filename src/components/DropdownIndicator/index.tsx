import React from 'react'
import { Icon } from '@chakra-ui/react'
import { memo } from 'react'
import { CaretDown } from '../Icons'
import { DropdownIndicatorProps } from './types'

export const DropdownIndicator = memo(
  ({ customIcon, dropdownIndicatorSx, ...rest }: DropdownIndicatorProps) => {
    const sx = dropdownIndicatorSx ? dropdownIndicatorSx({}) : {}

    return <Icon as={customIcon || CaretDown} {...rest} sx={sx} />
  }
)
