import React, { memo, useState, useMemo } from 'react'
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  SystemStyleObject,
  Text
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { AsyncComboboxButtonProps, AsyncComboboxProps } from './types'
import { Input } from '../Input'
import { VirtualizedScrollArea } from '../VirtualizedScrollArea'
import { DropdownIndicator } from '../DropdownIndicator'

export const AsyncCombobox: React.FC<AsyncComboboxProps> = memo(
  ({
    getOptionLabel,
    getOptionValue,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleSearchChange,
    fetchNextPage,
    options,
    value,
    onChange,
    placeholder,
    dropdownIndicator,
    chakraStyles
  }) => {
    const [isOpen, setIsOpen] = useState(false)

    const onInputChange = useMemo(
      () =>
        debounce((event: React.ChangeEvent<HTMLInputElement>) => {
          handleSearchChange(event.target.value)
        }, 500),
      []
    )

    const defaultMenuListSx: SystemStyleObject = {
      p: 0,
      overflow: 'hidden'
    }

    const menuListSx = chakraStyles?.menuList
      ? chakraStyles.menuList(defaultMenuListSx)
      : defaultMenuListSx

    return (
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        matchWidth
      >
        <AsyncComboboxButton
          controlSx={chakraStyles?.control}
          rightIcon={
            <DropdownIndicator
              customIcon={dropdownIndicator}
              dropdownIndicatorSx={chakraStyles?.dropdownIndicator}
            />
          }
        >
          <Text noOfLines={1}>
            {(value && getOptionLabel(value)) || placeholder}
          </Text>

          {(isLoading || isFetchingNextPage) && <Spinner size='sm' />}
        </AsyncComboboxButton>
        <MenuList sx={menuListSx}>
          <Box px='10px' borderBottomWidth='1px' borderColor='inherit'>
            <Input
              placeholder='Search...'
              onChange={onInputChange}
              inputSx={chakraStyles?.input}
            />
          </Box>

          <VirtualizedScrollArea
            options={options}
            value={value}
            onSelect={(selectedOption) => {
              onChange(selectedOption)
              setIsOpen(false)
            }}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            optionSx={chakraStyles?.option}
            scrollAreaSx={chakraStyles?.scrollArea}
            scrollbarSx={chakraStyles?.scrollbar}
            scrollThumbSx={chakraStyles?.scrollThumb}
            scrollCornerSx={chakraStyles?.scrollCorner}
            loadingMessageSx={chakraStyles?.loadingMessage}
            emptyMessageSx={chakraStyles?.emptyMessage}
          />
        </MenuList>
      </Menu>
    )
  }
)

const AsyncComboboxButton = memo(
  ({ controlSx, ...rest }: AsyncComboboxButtonProps) => {
    const defaultControlSx: SystemStyleObject = {
      "&[aria-expanded='true']": {
        svg: {
          transform: 'rotate(180deg)'
        }
      },
      svg: {
        transition: 'transform 0.1s ease-in-out'
      },
      textAlign: 'left',
      borderWidth: '1px',
      borderColor: 'black',
      color: 'black',
      bg: 'transparent',
      _hover: {
        bg: 'transparent'
      },
      _active: {
        bg: 'transparent'
      }
    }

    const finalControlSx = controlSx
      ? controlSx(defaultControlSx)
      : defaultControlSx

    return (
      <MenuButton as={Button} {...rest} sx={finalControlSx}>
        <Flex justify='space-between' gap={1} align='center'>
          {rest.children}
        </Flex>
      </MenuButton>
    )
  }
)
