import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ChakraScrollArea } from "../ChakraScrollArea";
import { memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { VirtualizedOptionProps, VirtualizedScrollAreaProps } from "./types";
import { useScrollHandler } from "../../hooks/useScrollHandler";
import { makeCss } from "../../helpers/makeCss";

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
    loadingElement = "Loading...",
    emptyElement = "No results found",
    scrollAreaCss,
    optionCss,
    scrollbarCss,
    scrollThumbCss,
    scrollCornerCss,
    emptyMessageCss,
    loadingMessageCss,
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

    const scrollbarFinalCss = makeCss(
      {
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
      },
      scrollbarCss
    );

    const scrollThumbFinalCss = makeCss(
      {
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
      },
      scrollThumbCss
    );

    const scrollCornerFinalCss = makeCss(
      {
        bg: "blackAlpha.500",
      },
      scrollCornerCss
    );

    const loadingMessageFinalCss = makeCss(
      {
        py: 2,
        px: 2,
        fontSize: "md",
      },
      loadingMessageCss
    );

    const emptyMessageFinalCss = makeCss(
      {
        py: 2,
        px: 2,
        fontSize: "md",
      },
      emptyMessageCss
    );

    const scrollAreaFinalCss = makeCss({}, scrollAreaCss);
    const scrollAreaMaxHeight = (scrollAreaFinalCss.maxH ||
      scrollAreaFinalCss.maxHeight) as string;

    return (
      <ChakraScrollArea.Root css={scrollAreaFinalCss}>
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
                    css={optionCss}
                  />
                );
              })}
            </Box>
          )}

          {items.length === 0 && !isLoading && !isFetchingNextPage && (
            <>
              {typeof emptyElement === "string" ? (
                <Flex css={emptyMessageFinalCss}>
                  <Text>{emptyElement}</Text>
                </Flex>
              ) : (
                emptyElement
              )}
            </>
          )}

          {isLoading && (
            <>
              {typeof loadingElement === "string" ? (
                <Flex css={loadingMessageFinalCss}>
                  <Text>{loadingElement}</Text>
                </Flex>
              ) : (
                loadingElement
              )}
            </>
          )}
        </ChakraScrollArea.Viewport>

        <ChakraScrollArea.Scrollbar
          orientation="vertical"
          css={scrollbarFinalCss}
        >
          <ChakraScrollArea.Thumb css={scrollThumbFinalCss} />
        </ChakraScrollArea.Scrollbar>

        <ChakraScrollArea.Corner css={scrollCornerFinalCss} />
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
    css,
  }: VirtualizedOptionProps) => {
    const finalCss = makeCss(
      {
        py: 2.5,
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
        fontSize: "md",
      },
      css
    );

    return (
      <Text
        as="option"
        {...(isSelected && { "data-selected": true })}
        onClick={() => onSelect(option)}
        css={finalCss}
      >
        {label}
      </Text>
    );
  }
);
