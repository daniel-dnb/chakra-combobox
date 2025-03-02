import React, { memo, useState, useMemo } from "react";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { AsyncComboboxButtonProps, AsyncComboboxProps } from "./types";
import { Input } from "../Input";
import { VirtualizedScrollArea } from "../VirtualizedScrollArea";
import { DropdownIndicator } from "../DropdownIndicator";
import { debounce } from "../../helpers/debounce";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { makeCss } from "../../helpers/makeCss";

export const AsyncCombobox: React.FC<AsyncComboboxProps> = memo(
  ({
    getOptionLabel,
    getOptionValue,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    onSearchChange,
    fetchNextPage,
    options,
    value,
    onSelect,
    placeholder,
    dropdownIndicator,
    chakraStyles,
    closeOnSelect = true,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onInputChange = useMemo(
      () =>
        debounce((event: React.ChangeEvent<HTMLInputElement>) => {
          onSearchChange(event.target.value);
        }, 500),
      []
    );

    const menuListCss = makeCss(
      {
        p: 0,
        overflow: "hidden",
      },
      chakraStyles?.menuList
    );

    return (
      <PopoverRoot
        open={isOpen}
        onOpenChange={e => setIsOpen(e.open)}
        positioning={{ sameWidth: true }}
        lazyMount
        unmountOnExit
      >
        <AsyncComboboxButton controlCss={chakraStyles?.control}>
          <Text lineClamp={1}>
            {(value && getOptionLabel(value)) || placeholder}
          </Text>

          <Flex gap={2} align="center">
            {(isLoading || isFetchingNextPage) && <Spinner size="sm" />}

            <DropdownIndicator
              customIcon={dropdownIndicator}
              dropdownIndicatorCss={chakraStyles?.dropdownIndicator}
            />
          </Flex>
        </AsyncComboboxButton>

        <PopoverContent width="auto" css={menuListCss}>
          <Box px="10px" borderBottomWidth="1px" borderColor="inherit">
            <Input
              placeholder="Search..."
              onChange={onInputChange}
              inputCss={chakraStyles?.input}
            />
          </Box>

          <VirtualizedScrollArea
            options={options}
            value={value}
            onSelect={selectedOption => {
              onSelect(selectedOption);
              closeOnSelect && setIsOpen(false);
            }}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            optionCss={chakraStyles?.option}
            scrollAreaCss={chakraStyles?.scrollArea}
            scrollbarCss={chakraStyles?.scrollbar}
            scrollThumbCss={chakraStyles?.scrollThumb}
            scrollCornerCss={chakraStyles?.scrollCorner}
            loadingMessageCss={chakraStyles?.loadingMessage}
            emptyMessageCss={chakraStyles?.emptyMessage}
          />
        </PopoverContent>
      </PopoverRoot>
    );
  }
);

const AsyncComboboxButton = memo(
  ({ controlCss, ...rest }: AsyncComboboxButtonProps) => {
    const finalControlCss = makeCss(
      {
        "&[aria-expanded='true']": {
          "& svg": {
            transform: "rotate(180deg)",
          },
        },
        "& svg": {
          transition: "transform 0.1s ease-in-out",
        },
        justifyContent: "space-between",
        textAlign: "left",
        borderWidth: "1px",
        borderColor: "black",
        borderRadius: "md",
        fontSize: "md",
        color: "black",
        bg: "transparent",
        _hover: {
          bg: "transparent",
        },
        _active: {
          bg: "transparent",
        },
      },
      controlCss
    );

    return (
      <PopoverTrigger asChild>
        <Button {...rest} css={finalControlCss}>
          {rest.children}
        </Button>
      </PopoverTrigger>
    );
  }
);
