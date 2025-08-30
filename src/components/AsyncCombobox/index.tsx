import React, { memo, useState, useMemo } from "react";
import {
  Button,
  Flex,
  Icon,
  Spinner,
  Text,
  Popover,
  Portal,
} from "@chakra-ui/react";
import { AsyncComboboxButtonProps, AsyncComboboxProps } from "./types";
import { DropdownIndicator } from "../DropdownIndicator";
import { debounce } from "../../helpers/debounce";
import { makeCss } from "../../helpers/makeCss";
import { LuX } from "../Icons";
import { ListboxVirtualized } from "../ListboxVirtualized";

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
  isClearable = false,
  loadingElement = "Loading...",
  emptyElement = "No results found",
  searchInputPlaceholder = "Search...",
  closeOnSelect = false,
  insideDialog = false,
  listboxProps,
  withIndicator,
  withCheckmark,
}: AsyncComboboxProps<OptionType>) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onInputChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const popoverContentCss = makeCss(
    {
      p: 0,
      overflow: "hidden",
    },
    chakraStyles?.popoverContentCss
  );

  const clearButtonCss = makeCss(
    {
      p: 0,
      minW: 6,
      h: 6,
    },
    chakraStyles?.clearButton
  );

  const selectedOptions =
    value?.map(v =>
      getOptionLabel(
        options.find(option => getOptionValue(option) === v) ||
          ({} as OptionType)
      )
    ) || [];

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={e => setIsOpen(e.open)}
      positioning={{ sameWidth: true }}
      lazyMount
      unmountOnExit
    >
      <Popover.Trigger asChild>
        <AsyncComboboxButton controlCss={chakraStyles?.control}>
          <Text lineClamp={1}>
            {(selectedOptions.length > 0 && selectedOptions.join(", ")) ||
              placeholder}
          </Text>

          <Flex gap={2} align="center">
            {(isLoading || isFetchingNextPage) && <Spinner size="sm" />}

            <Flex gap={1} align="center">
              {isClearable && value && (
                <Button
                  as="span"
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
      </Popover.Trigger>

      <Portal disabled={insideDialog}>
        <Popover.Positioner>
          <Popover.Content
            width="auto"
            minH={options.length > 7 ? "250px" : "auto"}
            css={popoverContentCss}
          >
            <ListboxVirtualized<OptionType>
              options={options}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              searchInputPlaceholder={searchInputPlaceholder}
              onInputChange={e => {
                setInputValue(e.target.value);
                onInputChange(e);
              }}
              value={value || []}
              onSelect={selectedOption => {
                onSelect(selectedOption);
                if (closeOnSelect) setIsOpen(false);
              }}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              loadingElement={loadingElement}
              emptyElement={emptyElement}
              loadingMessageCss={chakraStyles?.loadingMessage}
              emptyMessageCss={chakraStyles?.emptyMessage}
              inputCss={chakraStyles?.input}
              listboxProps={listboxProps}
              withIndicator={withIndicator}
              withCheckmark={withCheckmark}
              searchValue={inputValue}
            />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
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
      <Button {...rest} css={finalControlCss}>
        {rest.children}
      </Button>
    );
  }
);
