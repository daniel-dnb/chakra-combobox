import React, { memo, useState, useMemo } from "react";
import { Box, Button, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { AsyncComboboxButtonProps, AsyncComboboxProps } from "./types";
import { Input } from "../Input";
import { VirtualizedScrollArea } from "../VirtualizedScrollArea";
import { DropdownIndicator } from "../DropdownIndicator";
import { debounce } from "../../helpers/debounce";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { makeCss } from "../../helpers/makeCss";
import { LuX } from "../Icons";

function AsyncComboboxComponent<OptionType>({
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
  loadingElement,
  emptyElement,
  isClearable = true,
  searchInputPlaceholder = "Search...",
  closeOnSelect = true,
}: AsyncComboboxProps<OptionType>) {
  const [isOpen, setIsOpen] = useState(false);

  const onInputChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const menuListCss = makeCss(
    {
      p: 0,
      overflow: "hidden",
    },
    chakraStyles?.menuList
  );

  const clearButtonCss = makeCss(
    {
      p: 0,
      minW: 6,
      h: 6,
    },
    chakraStyles?.clearButton
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

          <Flex gap={1} align="center">
            {isClearable && value && (
              <Button
                size="xs"
                variant="ghost"
                css={clearButtonCss}
                onClick={e => {
                  e.stopPropagation();
                  onSelect(undefined);
                }}
              >
                <Icon boxSize={4} as={LuX} />
              </Button>
            )}
            <DropdownIndicator
              customIcon={dropdownIndicator}
              dropdownIndicatorCss={chakraStyles?.dropdownIndicator}
            />
          </Flex>
        </Flex>
      </AsyncComboboxButton>

      <PopoverContent width="auto" css={menuListCss}>
        <Box px="10px" borderBottomWidth="1px" borderColor="inherit">
          <Input
            placeholder={searchInputPlaceholder}
            onChange={onInputChange}
            inputCss={chakraStyles?.input}
          />
        </Box>

        <VirtualizedScrollArea
          options={options}
          value={value}
          onSelect={selectedOption => {
            onSelect(selectedOption);
            if (closeOnSelect) setIsOpen(false);
          }}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          loadingElement={loadingElement}
          emptyElement={emptyElement}
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

export const AsyncCombobox = memo(AsyncComboboxComponent) as <OptionType>(
  props: AsyncComboboxProps<OptionType>
) => React.ReactElement;

const AsyncComboboxButton = memo(
  ({ controlCss, ...rest }: AsyncComboboxButtonProps) => {
    const finalControlCss = makeCss(
      {
        "&[aria-expanded='true']": {
          "& .dropdown-indicator": {
            transform: "rotate(180deg)",
          },
        },
        "& .dropdown-indicator": {
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
