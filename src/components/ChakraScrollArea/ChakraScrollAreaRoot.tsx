import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { Root, ScrollAreaProps } from "@radix-ui/react-scroll-area";

type ChakraScrollAreaRootProps = BoxProps & ScrollAreaProps;

export const ChakraScrollAreaRoot: React.FC<ChakraScrollAreaRootProps> = ({
  children,
  css,
  ...rest
}) => {
  return (
    <Box
      as={Root}
      maxH="225px"
      h="full"
      overflow="hidden"
      {...rest}
      css={{
        "--scrollbar-size": "10px",
        ...css,
      }}
    >
      {children}
    </Box>
  );
};
