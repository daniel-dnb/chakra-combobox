# Chakra Combobox

`chakra-combobox` is a library based on Chakra UI that provides an asynchronous `Combobox` component with support for option virtualization and dynamic data loading.

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

```tsx
import { AsyncCombobox } from "chakra-combobox";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDogBreeds } from "../api/dogs";

interface DogOption {
  value: string;
  label: string;
}

const initialPage = 1;

export const AsyncCombobox = () => {
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
    ? dogs?.pages
        .map(page => page.data)
        .flat()
        .map(dogs => ({
          value: dogs.id.toString(),
          label: dogs.name,
        }))
    : [];

  const [value, setValue] = useState<DogOption | undefined>(undefined);

  return (
    <AsyncCombobox
      options={parsedDogsData}
      fetchNextPage={fetchNextPage}
      getOptionLabel={option => option.label}
      getOptionValue={option => option.value}
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

## `AsyncCombobox` Props

| Property                 | Type                                      | Description                                      |
| ------------------------ | ----------------------------------------- | ------------------------------------------------ |
| `options`                | `Array<{ value: string, label: string }>` | List of available options.                       |
| `value`                  | `OptionType`                              | Selected value.                                  |
| `onSelect`               | `(option: OptionType) => void`            | Function triggered when an option is selected.   |
| `getOptionLabel`         | `(option: OptionType) => string`          | Function returning the option label.             |
| `getOptionValue`         | `(option: OptionType) => string`          | Function returning the option value.             |
| `placeholder`            | `string`                                  | Input placeholder text.                          |
| `onSearchChange`         | `(search: string) => void`                | Function called when typing in the search input. |
| `isLoading`              | `boolean`                                 | Indicates if data is being loaded.               |
| `isFetchingNextPage`     | `boolean`                                 | Indicates if the next page is being loaded.      |
| `hasNextPage`            | `boolean`                                 | Indicates if there are more options to load.     |
| `fetchNextPage`          | `() => void`                              | Function to load more options.                   |
| `closeOnSelect`          | `boolean`                                 | Close the dropdown when an option is selected.   |
| `loadingElement`         | `ReactNode`                               | Custom loading message element.                  |
| `emptyElement`           | `ReactNode`                               | Custom empty message element.                    |
| `searchInputPlaceholder` | `string`                                  | Custom placeholder for the search input.         |
| `insideDialog`           | `boolean`                                 | Indicates if the combobox is inside dialog       |
| `chakraStyles`           | `AsyncComboboxChakraStyles`               | Customize the component styles.                  |

## Styling

`chakra-combobox` allows style customization via the `chakraStyles` property. The library exports the `AsyncComboboxChakraStyles` type, which you can use to ensure type safety when defining your custom styles:

```tsx
import { AsyncCombobox, type AsyncComboboxChakraStyles } from "chakra-combobox";

// ... other imports and component code

const customStyles: AsyncComboboxChakraStyles = {
  control: base => ({ ...base, borderColor: "blue.500" }),
  menuList: base => ({ ...base, background: "gray.50" }),
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

## Conclusion

`chakra-combobox` is a flexible solution for creating highly customizable asynchronous dropdowns, optimized for performance and seamlessly integrated with Chakra UI.
