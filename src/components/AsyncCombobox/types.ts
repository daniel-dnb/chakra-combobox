import { ButtonProps, SystemStyleObject } from '@chakra-ui/react'
import { ElementType } from 'react'

export interface AsyncComboboxProps {
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  options: any[]
  value: string
  placeholder: string
  getOptionLabel: (option: any) => string
  getOptionValue: (option: any) => string
  handleSearchChange: (value: string) => void
  fetchNextPage: () => void
  onChange: (option: any) => void
  dropdownIndicator?: ElementType
  chakraStyles?: {
    control?: (provided: SystemStyleObject) => SystemStyleObject
    dropdownIndicator?: (provided: SystemStyleObject) => SystemStyleObject
    menuList?: (provided: SystemStyleObject) => SystemStyleObject
    option?: (provided: SystemStyleObject) => SystemStyleObject
    input?: (provided: SystemStyleObject) => SystemStyleObject
    scrollArea?: (provided: SystemStyleObject) => SystemStyleObject
    scrollbar?: (provided: SystemStyleObject) => SystemStyleObject
    scrollThumb?: (provided: SystemStyleObject) => SystemStyleObject
    scrollCorner?: (provided: SystemStyleObject) => SystemStyleObject
    loadingMessage?: (provided: SystemStyleObject) => SystemStyleObject
    emptyMessage?: (provided: SystemStyleObject) => SystemStyleObject
  }
}

export type AsyncComboboxButtonProps = ButtonProps & {
  controlSx?: (provided: SystemStyleObject) => SystemStyleObject
}
