import { useCallback, useEffect, useRef } from "react";
import { throttle } from "../helpers/throttle";

type UseScrollHandlerProps = {
  onScrollEnd: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};

export const useScrollHandler = ({
  onScrollEnd,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
}: UseScrollHandlerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return scrollRef;
};
