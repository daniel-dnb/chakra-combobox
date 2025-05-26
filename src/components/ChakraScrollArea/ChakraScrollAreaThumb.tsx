import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { Thumb, ScrollAreaThumbProps } from "@radix-ui/react-scroll-area";

type ChakraScrollAreaThumbProps = BoxProps & ScrollAreaThumbProps;

export const ChakraScrollAreaThumb: React.FC<ChakraScrollAreaThumbProps> = ({
  css,
  ...rest
}) => {
  return (
    <Box
      as={Thumb}
      {...rest}
      flex="1"
      css={{
        ...css,
        borderRadius: "var(--scrollbar-size)",
      }}
    />
  );
};
