import { useLiveRef } from "@chakra-ui/react";
import { type VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import React, { useCallback, useEffect, useRef } from "react";
import { throttle } from "../helpers/throttle";

interface ScrollToIndexDetails {
  index: number;
  getElement: () => HTMLElement | null;
  immediate?: boolean;
}

interface UseListboxVirtualizerProps {
  count: number;
  onScrollEnd: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export function useListboxVirtualizer({
  count,
  onScrollEnd,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
}: UseListboxVirtualizerProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearScrollTimeout = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  };

  const virtualizer = useVirtualizer({
    count: count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 10,
    gap: 4,
  });

  const virtualizerRef = useLiveRef(virtualizer);

  const scrollToIndexFn = (details: ScrollToIndexDetails) => {
    clearScrollTimeout();

    const scrollToIndex = () => {
      const virtualizer = virtualizerRef.current;
      const virtualItems = virtualizer?.getVirtualItems();
      const virtualItem = virtualItems?.find(
        item => item.index === details.index
      );

      if (virtualItem) {
        const element = details.getElement();
        element?.scrollIntoView({ block: "end" });
        clearScrollTimeout();
        return;
      }

      // Scroll towards the target index
      virtualizer?.scrollToIndex(details.index);

      // Continue scrolling in intervals until we reach the target
      if (!details.immediate) {
        scrollTimeoutRef.current = setTimeout(scrollToIndex, 16); // ~60fps
      }
    };

    scrollToIndex();
  };

  // Cleanup timeout on unmount
  useEffect(() => clearScrollTimeout, []);

  const totalSize = virtualizer.getTotalSize();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    throttle(() => {
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        const bottomReached =
          scrollElement.scrollTop + scrollElement.clientHeight >=
          scrollElement.scrollHeight - 10;

        if (bottomReached && hasNextPage && !isLoading && !isFetchingNextPage) {
          onScrollEnd();
        }
      }
    }, 0),
    [isLoading, isFetchingNextPage, hasNextPage, onScrollEnd]
  );

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);

      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }

    return;
  }, [handleScroll]);

  return {
    scrollRef,
    scrollToIndexFn,
    totalSize,
    virtualItems: virtualizer.getVirtualItems(),
    getViewportProps(
      props: React.ComponentProps<"div"> = {}
    ): React.ComponentProps<"div"> {
      return {
        style: {
          height: "200px",
          position: "relative",
          width: "100%",
          ...props.style,
        },
        ...props,
      };
    },
    getItemProps(
      props: React.ComponentProps<"div"> & { virtualItem: VirtualItem }
    ): React.ComponentProps<"div"> {
      const { virtualItem, ...rest } = props;
      return {
        ...rest,
        "aria-posinset": virtualItem.index + 1,
        "aria-setsize": totalSize,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...rest.style,
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        },
      };
    },
  };
}
