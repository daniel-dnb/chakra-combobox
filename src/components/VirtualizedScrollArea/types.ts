import { SystemStyleObject } from "@chakra-ui/react";

export interface VirtualizedScrollAreaProps<OptionType> {
  options: OptionType[];
  value: OptionType | undefined;
  onSelect: (option: OptionType) => void;
  getOptionLabel: (option: OptionType) => string;
  getOptionValue: (option: OptionType) => string;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  loadingElement?: React.ReactNode;
  emptyElement?: React.ReactNode;
  scrollAreaCss?: (provided: SystemStyleObject) => SystemStyleObject;
  optionCss?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollbarCss?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollThumbCss?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollCornerCss?: (provided: SystemStyleObject) => SystemStyleObject;
  loadingMessageCss?: (provided: SystemStyleObject) => SystemStyleObject;
  emptyMessageCss?: (provided: SystemStyleObject) => SystemStyleObject;
}

export interface VirtualizedOptionProps<OptionType> {
  virtualRowStart: number;
  option: OptionType;
  isSelected: boolean;
  onSelect: (option: OptionType) => void;
  label: string;
  css?: (provided: SystemStyleObject) => SystemStyleObject;
}
