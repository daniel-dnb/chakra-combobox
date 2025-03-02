import { SystemStyleObject } from "@chakra-ui/react";

type MakeCssType = (
  defaultCss: SystemStyleObject,
  css: ((provided: SystemStyleObject) => SystemStyleObject) | undefined
) => SystemStyleObject;

export const makeCss: MakeCssType = (defaultCss, css) =>
  css ? css(defaultCss) : defaultCss;
