import { IconProps, SystemStyleObject } from '@chakra-ui/react'
import { ElementType } from 'react'

export interface DropdownIndicatorProps extends IconProps {
  customIcon?: ElementType
  dropdownIndicatorSx?: (provided: SystemStyleObject) => SystemStyleObject
}
