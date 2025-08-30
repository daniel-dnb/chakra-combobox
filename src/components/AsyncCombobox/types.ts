import {
  ButtonProps,
  CheckmarkProps,
  Listbox,
  SystemStyleObject,
} from "@chakra-ui/react";
import React, { ElementType } from "react";

export interface AsyncComboboxProps<OptionType> {
  /**
   * Indicates whether the search is loading.
   */
  isLoading: boolean;
  /**
   * Indicates whether a request is in progress to fetch more options.
   */
  isFetchingNextPage: boolean;
  /**
   * Indicates whether there are more pages of options to load.
   */
  hasNextPage: boolean;
  /**
   * List of available options in the combobox.
   */
  options: OptionType[];
  /**
   * Currently selected value in the combobox.
   */
  value: string[] | undefined;
  /**
   * Placeholder text for the input field.
   */
  placeholder: string;
  /**
   * Indicates whether the combobox is clearable.
   */
  isClearable?: boolean;
  /**
   * Whether to use a portal for the popover content. Defaults to true.
   * Set to false when using inside dialogs/modals to prevent z-index issues.
   */
  insideDialog?: boolean;
  /**
   * Function to get the display label of an option.
   * @param option - The option to be displayed.
   * @returns The text to be displayed as the label.
   */
  getOptionLabel: (option: OptionType) => string;
  /**
   * Function to get the unique value of an option.
   * @param option - The option to be processed.
   * @returns The value of the option.
   */
  getOptionValue: (option: OptionType) => string;
  /**
   * Callback triggered when the search input text changes.
   * @param value - The new search value.
   */
  onSearchChange: (value: string) => void;
  /**
   * Function called to fetch the next page of options.
   */
  fetchNextPage: () => void;
  /**
   * Callback triggered when an option is selected.
   * @param option - The selected option.
   */
  onSelect: (option: string[] | undefined) => void;
  /** Close the combobox when an option is selected. */
  closeOnSelect?: boolean;
  /**
   * Custom component to render the dropdown indicator.
   */
  dropdownIndicator?: ElementType;
  /**
   * Custom component to render the loading message.
   */
  loadingElement?: React.ReactNode;
  /**
   * Custom component to render the empty message.
   */
  emptyElement?: React.ReactNode;
  /**
   *  Custom placeholder for the search input field.
   */
  searchInputPlaceholder?: string;
  /**
   * Custom styles for different elements of the combobox, using Chakra UI.
   */
  chakraStyles?: AsyncComboboxChakraStyles;
  /**
   * Custom props for the listbox.
   */
  listboxProps?: ListboxProps;
  /**
   * Whether to show the indicator.
   */
  withIndicator?: boolean;
  /**
   * Whether to show the checkmark.
   */
  withCheckmark?: boolean;
}

export type AsyncComboboxChakraStyles = {
  /**
   * Styles the main container of the combobox.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  control?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles the dropdown icon.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  dropdownIndicator?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles the dropdown list of options.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  popoverContentCss?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles each individual option inside the dropdown list.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  option?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles the text input field inside the combobox.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  input?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles the loading message displayed when fetching options.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  loadingMessage?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles the message displayed when no options are found.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  emptyMessage?: (provided: SystemStyleObject) => SystemStyleObject;
  /**
   * Styles the clear button.
   * @param provided - Default styles applied by Chakra UI.
   * @returns Custom styles.
   */
  clearButton?: (provided: SystemStyleObject) => SystemStyleObject;
};

export type AsyncComboboxButtonProps = ButtonProps & {
  /**
   * Custom styles for the combobox control button.
   * @param provided - Default styles from Chakra UI.
   * @returns Custom styles.
   */
  controlCss?: (provided: SystemStyleObject) => SystemStyleObject;
};

export type ListboxProps = {
  /**
   * Custom props for the listbox root.
   */
  Root?: Omit<Listbox.RootProps, "collection">;
  /**
   * Custom props for the listbox content.
   */
  Content?: Listbox.ContentProps;
  /**
   * Custom props for the listbox item.
   */
  Item?: Omit<Listbox.ItemProps, "item">;
  /**
   * Custom props for the listbox item text.
   */
  ItemText?: Listbox.ItemTextProps;
  /**
   * Custom props for the listbox item indicator.
   */
  ItemIndicator?: Listbox.ItemIndicatorProps;
  /**
   * Custom props for the listbox item checkmark.
   */
  Checkmark?: CheckmarkProps;
};
