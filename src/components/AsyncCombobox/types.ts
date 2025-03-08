import { ButtonProps, SystemStyleObject } from "@chakra-ui/react";
import React, { ElementType } from "react";

export interface AsyncComboboxProps {
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
  options: any[];
  /**
   * Currently selected value in the combobox.
   */
  value: string;
  /**
   * Placeholder text for the input field.
   */
  placeholder: string;
  /**
   * Function to get the display label of an option.
   * @param option - The option to be displayed.
   * @returns The text to be displayed as the label.
   */
  getOptionLabel: (option: any) => string;
  /**
   * Function to get the unique value of an option.
   * @param option - The option to be processed.
   * @returns The value of the option.
   */
  getOptionValue: (option: any) => string;
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
  onSelect: (option: any) => void;
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
   * Custom styles for different elements of the combobox, using Chakra UI.
   */
  chakraStyles?: {
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
    menuList?: (provided: SystemStyleObject) => SystemStyleObject;
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
     * Styles the scroll area of the options list.
     * @param provided - Default styles applied by Chakra UI.
     * @returns Custom styles.
     */
    scrollArea?: (provided: SystemStyleObject) => SystemStyleObject;
    /**
     * Styles the scrollbar of the options list.
     * @param provided - Default styles applied by Chakra UI.
     * @returns Custom styles.
     */
    scrollbar?: (provided: SystemStyleObject) => SystemStyleObject;
    /**
     * Styles the scrollbar thumb (draggable indicator).
     * @param provided - Default styles applied by Chakra UI.
     * @returns Custom styles.
     */
    scrollThumb?: (provided: SystemStyleObject) => SystemStyleObject;
    /**
     * Styles the corner of the scrollbar.
     * @param provided - Default styles applied by Chakra UI.
     * @returns Custom styles.
     */
    scrollCorner?: (provided: SystemStyleObject) => SystemStyleObject;
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
  };
}

export type AsyncComboboxButtonProps = ButtonProps & {
  /**
   * Custom styles for the combobox control button.
   * @param provided - Default styles from Chakra UI.
   * @returns Custom styles.
   */
  controlCss?: (provided: SystemStyleObject) => SystemStyleObject;
};
