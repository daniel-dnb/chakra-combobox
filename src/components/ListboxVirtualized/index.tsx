"use client";

import {
  Box,
  Checkmark,
  CheckmarkProps,
  Flex,
  Listbox,
  Show,
  SystemStyleObject,
  Text,
  createListCollection,
  useListboxItemContext,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useListboxVirtualizer } from "../../hooks/useListboxVirtualizer";
import { Input } from "../Input";
import { makeCss } from "../../helpers/makeCss";
import { ListboxProps } from "../AsyncCombobox/types";

interface ListboxVirtualizedProps<OptionType> {
  options: OptionType[];
  searchInputPlaceholder: string;
  value: string[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  loadingElement?: React.ReactNode;
  emptyElement?: React.ReactNode;
  listboxProps?: ListboxProps;
  withIndicator?: boolean;
  withCheckmark?: boolean;
  searchValue?: string;
  getOptionLabel: (option: OptionType) => string;
  getOptionValue: (option: OptionType) => string;
  fetchNextPage: () => void;
  onSelect: (option: string[]) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputCss?: (provided: SystemStyleObject) => SystemStyleObject;
  emptyMessageCss?: (provided: SystemStyleObject) => SystemStyleObject;
  loadingMessageCss?: (provided: SystemStyleObject) => SystemStyleObject;
}

export function ListboxVirtualized<OptionType>({
  options,
  searchInputPlaceholder,
  value,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  loadingElement,
  emptyElement,
  listboxProps,
  withCheckmark = false,
  withIndicator = true,
  searchValue,
  getOptionLabel,
  getOptionValue,
  fetchNextPage,
  onSelect,
  onInputChange,
  inputCss,
  emptyMessageCss,
  loadingMessageCss,
}: ListboxVirtualizedProps<OptionType>) {
  const virtual = useListboxVirtualizer({
    count: options.length,
    onScrollEnd: fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  });

  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: item => getOptionLabel(item as OptionType),
        itemToValue: item => getOptionValue(item as OptionType),
      }),
    [options, getOptionValue, getOptionLabel]
  );

  const emptyMessageFinalCss = makeCss(
    {
      py: 2,
      px: 2,
      fontSize: "md",
    },
    emptyMessageCss
  );

  const loadingMessageFinalCss = makeCss(
    {
      py: 2,
      px: 2,
      fontSize: "md",
    },
    loadingMessageCss
  );

  return (
    <Listbox.Root
      {...listboxProps?.Root}
      maxW="full"
      collection={collection}
      scrollToIndexFn={virtual.scrollToIndexFn}
      gap="0"
      value={value as string[]}
      onValueChange={details => {
        onSelect(details.value);
      }}
    >
      <Box px="10px" borderBottomWidth="1px" borderColor="inherit" w="full">
        <Input
          placeholder={searchInputPlaceholder}
          onChange={onInputChange}
          inputCss={inputCss}
          value={searchValue}
        />
      </Box>

      <Show when={virtual.totalSize > 0}>
        <Listbox.Content
          ref={virtual.scrollRef}
          border="none"
          {...listboxProps?.Content}
        >
          <Box {...virtual.getViewportProps()}>
            {virtual.virtualItems.map(virtualItem => {
              const item = options[virtualItem.index];

              return (
                <Listbox.Item
                  {...listboxProps?.Item}
                  key={getOptionValue(item)}
                  item={item}
                  {...virtual.getItemProps({ virtualItem })}
                >
                  {withCheckmark && (
                    <ListboxItemCheckmark {...listboxProps?.Checkmark} />
                  )}
                  <Listbox.ItemText {...listboxProps?.ItemText}>
                    {getOptionLabel(item)}
                  </Listbox.ItemText>
                  {withIndicator && !withCheckmark && (
                    <Listbox.ItemIndicator {...listboxProps?.ItemIndicator} />
                  )}
                </Listbox.Item>
              );
            })}
          </Box>
        </Listbox.Content>
      </Show>

      <Show when={virtual.totalSize === 0 && !isLoading && !isFetchingNextPage}>
        {typeof emptyElement === "string" ? (
          <Flex css={emptyMessageFinalCss}>
            <Text>{emptyElement}</Text>
          </Flex>
        ) : (
          emptyElement
        )}
      </Show>

      <Show when={isLoading}>
        {typeof loadingElement === "string" ? (
          <Flex css={loadingMessageFinalCss}>
            <Text>{loadingElement}</Text>
          </Flex>
        ) : (
          loadingElement
        )}
      </Show>
    </Listbox.Root>
  );
}

const ListboxItemCheckmark = (props: CheckmarkProps) => {
  const itemState = useListboxItemContext();
  return (
    <Checkmark
      filled
      size="sm"
      checked={itemState.selected}
      disabled={itemState.disabled}
      {...props}
    />
  );
};
