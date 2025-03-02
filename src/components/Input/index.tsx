import React from "react";
import { Icon, Input as ChakraInput } from "@chakra-ui/react";
import { memo } from "react";
import { MagnifyingGlass } from "../Icons";
import { InputProps } from "./types";
import { InputGroup } from "../ui/input-group";
import { makeCss } from "../../helpers/makeCss";

export const Input: React.FC<InputProps> = memo(({ inputCss, ...rest }) => {
  const css = makeCss(
    {
      w: "full",
      borderRadius: "0",
      borderWidth: "0",
      _active: {
        borderColor: "transparent",
        outline: "none",
      },
      _focus: {
        borderColor: "transparent",
        outline: "none",
        boxShadow: "none",
      },
      h: "45px",
      fontSize: "md",
    },
    inputCss
  );

  return (
    <InputGroup
      startElement={
        <Icon
          as={MagnifyingGlass}
          boxSize={5}
          css={{
            h: css.h,
          }}
        />
      }
    >
      <ChakraInput ps="40px" {...rest} css={css} />
    </InputGroup>
  );
});
