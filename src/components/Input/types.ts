import {
  InputProps as ChakraInputProps,
  SystemStyleObject,
} from "@chakra-ui/react";

export type InputProps = ChakraInputProps & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  inputCss?: (provided: SystemStyleObject) => SystemStyleObject;
};
