import React from "react";
import { Box, Flex, SystemStyleObject, Text } from "@chakra-ui/react";
import { ChakraScrollArea } from "../ChakraScrollArea";
import { memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { VirtualizedOptionProps, VirtualizedScrollAreaProps } from "./types";
import { useScrollHandler } from "../../hooks/useScrollHandler";

export const VirtualizedScrollArea: React.FC<VirtualizedScrollAreaProps> = memo(
  ({
    options,
    value,
    onSelect,
    getOptionLabel,
    getOptionValue,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    scrollAreaSx,
    optionSx,
    scrollbarSx,
    scrollThumbSx,
    scrollCornerSx,
    emptyMessageSx,
    loadingMessageSx,
  }) => {
    const parentRef = useScrollHandler({
      onScrollEnd: fetchNextPage,
      isLoading,
      isFetchingNextPage,
      hasNextPage,
    });
    const rowVirtualizer = useVirtualizer({
      count: options.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 40,
      gap: 4,
      paddingStart: 4,
      paddingEnd: 4,
      overscan: 5,
    });
    const items = rowVirtualizer.getVirtualItems();

    const defaultScrollbarSx: SystemStyleObject = {
      p: "2px",
      bg: "whiteAlpha.300",
      transition: "background 160ms ease-out",
      _hover: {
        bg: "whiteAlpha.400",
      },
      touchAction: "none",
      '&[data-orientation="vertical"]': {
        width: "var(--scrollbar-size)",
      },
      '&[data-orientation="horizontal"]': {
        flexDirection: "column",
        height: "var(--scrollbar-size)",
      },
    };
    const scrollbarSxFinal = scrollbarSx
      ? scrollbarSx(defaultScrollbarSx)
      : defaultScrollbarSx;

    const defaultScrollThumbSx: SystemStyleObject = {
      bg: "gray.200",
      position: "relative",
      _before: {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        minWidth: "44px",
        minHeight: "44px",
      },
    };
    const scrollThumbSxFinal = scrollThumbSx
      ? scrollThumbSx(defaultScrollThumbSx)
      : defaultScrollThumbSx;

    const defaultScrollCornerSx: SystemStyleObject = {
      bg: "blackAlpha.500",
    };
    const scrollCornerSxFinal = scrollCornerSx
      ? scrollCornerSx(defaultScrollCornerSx)
      : defaultScrollCornerSx;

    const defaultLoadingMessageSx: SystemStyleObject = {
      py: 2,
      px: 2,
    };
    const loadingMessageSxFinal = loadingMessageSx
      ? loadingMessageSx(defaultLoadingMessageSx)
      : defaultLoadingMessageSx;

    const defaultEmptyMessageSx: SystemStyleObject = {
      py: 2,
      px: 2,
    };
    const emptyMessageSxFinal = emptyMessageSx
      ? emptyMessageSx(defaultEmptyMessageSx)
      : defaultEmptyMessageSx;

    const scrollAreaSxFinal = scrollAreaSx ? scrollAreaSx({}) : {};
    const scrollAreaMaxHeight = (scrollAreaSxFinal.maxH ||
      scrollAreaSxFinal.maxHeight) as string;

    return (
      <ChakraScrollArea.Root sx={scrollAreaSxFinal}>
        <ChakraScrollArea.Viewport
          ref={parentRef}
          {...(scrollAreaMaxHeight && { maxH: scrollAreaMaxHeight })}
        >
          {items.length > 0 && (
            <Box
              h={`${rowVirtualizer.getTotalSize()}px`}
              w="full"
              position="relative"
            >
              {items.map(virtualRow => {
                const option = options[virtualRow.index];
                const isSelected =
                  (value && getOptionValue(value) === getOptionValue(option)) ||
                  false;

                return (
                  <VirtualizedOption
                    key={getOptionValue(option)}
                    option={option}
                    isSelected={isSelected}
                    onSelect={onSelect}
                    label={getOptionLabel(option)}
                    virtualRowStart={virtualRow.start}
                    sx={optionSx}
                  />
                );
              })}
            </Box>
          )}

          {items.length === 0 && !isLoading && !isFetchingNextPage && (
            <Flex sx={emptyMessageSxFinal}>
              <Text>Nenhum resultado encontrado</Text>
            </Flex>
          )}

          {isLoading && (
            <Flex sx={loadingMessageSxFinal}>
              <Text>Carregando...</Text>
            </Flex>
          )}
        </ChakraScrollArea.Viewport>

        <ChakraScrollArea.Scrollbar
          orientation="vertical"
          sx={scrollbarSxFinal}
        >
          <ChakraScrollArea.Thumb sx={scrollThumbSxFinal} />
        </ChakraScrollArea.Scrollbar>

        <ChakraScrollArea.Corner sx={scrollCornerSxFinal} />
      </ChakraScrollArea.Root>
    );
  }
);

const VirtualizedOption = memo(
  ({
    option,
    isSelected,
    onSelect,
    label,
    virtualRowStart,
    sx,
  }: VirtualizedOptionProps) => {
    const defaultSx: SystemStyleObject = {
      py: 2,
      px: 2,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      transform: `translateY(${virtualRowStart}px)`,
      _hover: {
        bg: "gray.100",
        color: "gray.900",
      },
      cursor: "pointer",
      borderRadius: "4px",
      transition: "all 0.2s ease-in-out",
      bg: "transparent",
      color: "inherit",
      _selected: {
        bg: "gray.100",
        color: "gray.900",
      },
      backfaceVisibility: "hidden",
    };

    const sxFinal = sx ? sx(defaultSx) : defaultSx;

    return (
      <Text
        as="option"
        {...(isSelected && { "data-selected": true })}
        onClick={() => onSelect(option)}
        sx={sxFinal}
      >
        {label}
      </Text>
    );
  }
);
