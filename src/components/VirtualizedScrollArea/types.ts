import { SystemStyleObject } from "@chakra-ui/react";

export interface VirtualizedScrollAreaProps {
  options: any[];
  value: string;
  onSelect: (option: any) => void;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  scrollAreaCss?: (provided: SystemStyleObject) => SystemStyleObject;
  optionCss?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollbarCss?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollThumbCss?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollCornerCss?: (provided: SystemStyleObject) => SystemStyleObject;
  loadingMessageCss?: (provided: SystemStyleObject) => SystemStyleObject;
  emptyMessageCss?: (provided: SystemStyleObject) => SystemStyleObject;
}

export interface VirtualizedOptionProps {
  virtualRowStart: number;
  option: any;
  isSelected: boolean;
  onSelect: (option: any) => void;
  label: string;
  css?: (provided: SystemStyleObject) => SystemStyleObject;
}
