import { SystemStyleObject } from "@chakra-ui/react";
import { ReactNode } from "react";

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
  loadingElement?: ReactNode;
  emptyElement?: ReactNode;
  scrollAreaSx?: (provided: SystemStyleObject) => SystemStyleObject;
  optionSx?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollbarSx?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollThumbSx?: (provided: SystemStyleObject) => SystemStyleObject;
  scrollCornerSx?: (provided: SystemStyleObject) => SystemStyleObject;
  loadingMessageSx?: (provided: SystemStyleObject) => SystemStyleObject;
  emptyMessageSx?: (provided: SystemStyleObject) => SystemStyleObject;
}

export interface VirtualizedOptionProps {
  virtualRowStart: number;
  option: any;
  isSelected: boolean;
  onSelect: (option: any) => void;
  label: string;
  sx?: (provided: SystemStyleObject) => SystemStyleObject;
}
