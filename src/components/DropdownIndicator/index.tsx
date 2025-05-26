import { Icon } from "@chakra-ui/react";
import { memo } from "react";
import { CaretDown } from "../Icons";
import { DropdownIndicatorProps } from "./types";

export const DropdownIndicator = memo(
  ({ customIcon, dropdownIndicatorCss, ...rest }: DropdownIndicatorProps) => {
    const css = dropdownIndicatorCss ? dropdownIndicatorCss({}) : {};

    return (
      <Icon as={customIcon || CaretDown} boxSize={4} {...rest} css={css} />
    );
  }
);
