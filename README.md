# Chakra Combobox

`chakra-combobox` is a library based on Chakra UI that provides an asynchronous `Combobox` component with support for option virtualization, dynamic data loading, and **multiple selection**.

## Installation

Before using `chakra-combobox`, install the necessary dependencies:

```sh
pnpm add @chakra-ui/react @emotion/react
```

If using npm or yarn:

```sh
npm install @chakra-ui/react @emotion/react
```

or

```sh
yarn add @chakra-ui/react @emotion/react
```

## Basic Usage with React Query

### Single Selection

```tsx
import { AsyncCombobox } from "chakra-combobox";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDogBreeds } from "../api/dogs";

const initialPage = 1;

export const BasicAsyncCombobox = () => {
  const [search, setSearch] = useState("");
  const {
    data: dogs,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["dogs", search],
    queryFn: ({ pageParam = 0 }) =>
      getDogBreeds({ page: pageParam + 1, limit: 10, search }),
    initialPageParam: initialPage - 1,
    getNextPageParam: (data, _, page) => {
      if (data.hasNextPage) return page + 1;
      return;
    },
  });

  const parsedDogsData = isSuccess
    ? dogs?.pages.map(page => page.data).flat()
    : [];

  const [value, setValue] = useState<string[] | undefined>(undefined);

  return (
    <AsyncCombobox
      options={parsedDogsData}
      fetchNextPage={fetchNextPage}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.id.toString()}
      onSearchChange={value => setSearch(value)}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      placeholder="Select a dog"
      hasNextPage={hasNextPage}
      value={value}
      onSelect={setValue}
    />
  );
};
```

### Multiple Selection

```tsx
import { AsyncCombobox } from "chakra-combobox";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDogBreeds } from "../api/dogs";

const initialPage = 1;

export const MultipleSelectionCombobox = () => {
  const [search, setSearch] = useState("");
  const {
    data: dogs,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["dogs", search],
    queryFn: ({ pageParam = 0 }) =>
      getDogBreeds({ page: pageParam + 1, limit: 10, search }),
    initialPageParam: initialPage - 1,
    getNextPageParam: (data, _, page) => {
      if (data.hasNextPage) return page + 1;
      return;
    },
  });

  const parsedDogsData = isSuccess
    ? dogs?.pages.map(page => page.data).flat()
    : [];

  const [value, setValue] = useState<string[] | undefined>(undefined);

  return (
    <AsyncCombobox
      options={parsedDogsData}
      fetchNextPage={fetchNextPage}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.nameWithId}
      onSearchChange={value => setSearch(value)}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      placeholder="Select dogs"
      hasNextPage={hasNextPage}
      value={value}
      onSelect={setValue}
      withCheckmark
      listboxProps={{
        Root: {
          selectionMode: "multiple",
        },
      }}
    />
  );
};
```

## `AsyncCombobox` Props

| Property                 | Type                                      | Description                                                 |
| ------------------------ | ----------------------------------------- | ----------------------------------------------------------- |
| `options`                | `OptionType[]`                            | List of available options.                                  |
| `value`                  | `string[] \| undefined`                   | Selected values (array for multiple selection).             |
| `onSelect`               | `(option: string[] \| undefined) => void` | Function triggered when options are selected.               |
| `getOptionLabel`         | `(option: OptionType) => string`          | Function returning the option label.                        |
| `getOptionValue`         | `(option: OptionType) => string`          | Function returning the option value.                        |
| `placeholder`            | `string`                                  | Input placeholder text.                                     |
| `onSearchChange`         | `(search: string) => void`                | Function called when typing in the search input.            |
| `isLoading`              | `boolean`                                 | Indicates if data is being loaded.                          |
| `isFetchingNextPage`     | `boolean`                                 | Indicates if the next page is being loaded.                 |
| `hasNextPage`            | `boolean`                                 | Indicates if there are more options to load.                |
| `fetchNextPage`          | `() => void`                              | Function to load more options.                              |
| `isClearable`            | `boolean` (optional)                      | Indicates whether the combobox is clearable.                |
| `insideDialog`           | `boolean` (optional)                      | Set to false when inside dialogs to prevent z-index issues. |
| `closeOnSelect`          | `boolean` (optional)                      | Close the dropdown when an option is selected.              |
| `dropdownIndicator`      | `ElementType` (optional)                  | Custom component to render the dropdown indicator.          |
| `loadingElement`         | `ReactNode` (optional)                    | Custom loading message element.                             |
| `emptyElement`           | `ReactNode` (optional)                    | Custom empty message element.                               |
| `searchInputPlaceholder` | `string` (optional)                       | Custom placeholder for the search input.                    |
| `chakraStyles`           | `AsyncComboboxChakraStyles` (optional)    | Customize the component styles.                             |
| `listboxProps`           | `ListboxProps` (optional)                 | Custom props for the listbox component.                     |
| `withIndicator`          | `boolean` (optional)                      | Whether to show the dropdown indicator.                     |
| `withCheckmark`          | `boolean` (optional)                      | Whether to show checkmarks for selected items.              |

## Configuration Options

### Multiple Selection

To enable multiple selection, configure the `listboxProps`:

```tsx
<AsyncCombobox
  // ... other props
  listboxProps={{
    Root: {
      selectionMode: "multiple",
    },
  }}
  withCheckmark // Shows checkmarks for selected items
/>
```

### Inside Dialogs/Modals

When using the combobox inside dialogs or modals, set `insideDialog` to prevent z-index issues:

```tsx
<AsyncCombobox
  // ... other props
  insideDialog
/>
```

## Styling

`chakra-combobox` allows style customization via the `chakraStyles` property. The library exports the `AsyncComboboxChakraStyles` type, which you can use to ensure type safety when defining your custom styles:

```tsx
import { AsyncCombobox, type AsyncComboboxChakraStyles } from "chakra-combobox";

// ... other imports and component code

const customStyles: AsyncComboboxChakraStyles = {
  control: base => ({ ...base, borderColor: "blue.500" }),
  popoverContentCss: base => ({ ...base, background: "gray.50" }),
  option: base => ({ ...base, color: "black" }),
};

<AsyncCombobox
  // ... other props
  chakraStyles={customStyles}
/>;
```

## Virtualization Support

The component uses `react-virtual` to render only visible elements on the screen, improving performance when dealing with large lists.

## Documentation & Demo

For a full demonstration and detailed documentation, visit the [Storybook Documentation](https://daniel-dnb.github.io/chakra-combobox).

## Version 4.0.0 Changes

- **Breaking Change**: Added support for multiple selection
- **Breaking Change**: `value` prop now expects `string[] | undefined` instead of a single option
- **Breaking Change**: `onSelect` callback now receives `string[] | undefined`
- **New**: Added `listboxProps` for configuring the underlying listbox component
- **New**: Added `withCheckmark` prop to show selection indicators
- **New**: Added `withIndicator` prop to control dropdown indicator visibility
- **New**: Added `isClearable` prop for clearable functionality
- **Improved**: Better TypeScript support with generic types
- **Improved**: Enhanced dialog/modal support with `insideDialog` prop

## Conclusion

`chakra-combobox` is a flexible solution for creating highly customizable asynchronous dropdowns with multiple selection support, optimized for performance and seamlessly integrated with Chakra UI.
