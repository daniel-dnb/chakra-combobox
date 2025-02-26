# Chakra Combobox

`chakra-combobox` is a library based on Chakra UI that provides an asynchronous `Combobox` component with support for option virtualization and dynamic data loading.

## Installation

Before using `chakra-combobox`, install the necessary dependencies:

```sh
pnpm add @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
```

If using npm or yarn:

```sh
npm install @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
```

or

```sh
yarn add @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
```

## Basic Usage with React Query

```tsx
import { AsyncCombobox } from "chakra-combobox";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDogBreeds } from "../api/dogs";

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

  const [value, setValue] = useState("");

  return (
    <AsyncCombobox
      options={parsedDogsData}
      fetchNextPage={fetchNextPage}
      getOptionLabel={option => option.label}
      getOptionValue={option => option.value}
      handleSearchChange={value => setSearch(value)}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      placeholder="Select a dog"
      hasNextPage={hasNextPage}
      value={value}
      onChange={setValue}
    />
  );
};
```

## `AsyncCombobox` Props

| Property             | Type                                      | Description                                      |
| -------------------- | ----------------------------------------- | ------------------------------------------------ |
| `options`            | `Array<{ value: string, label: string }>` | List of available options.                       |
| `value`              | `any`                                     | Selected value.                                  |
| `onChange`           | `(option: any) => void`                   | Function triggered when an option is selected.   |
| `getOptionLabel`     | `(option: any) => string`                 | Function returning the option label.             |
| `getOptionValue`     | `(option: any) => string`                 | Function returning the option value.             |
| `placeholder`        | `string`                                  | Input placeholder text.                          |
| `handleSearchChange` | `(search: string) => void`                | Function called when typing in the search input. |
| `isLoading`          | `boolean`                                 | Indicates if data is being loaded.               |
| `isFetchingNextPage` | `boolean`                                 | Indicates if the next page is being loaded.      |
| `hasNextPage`        | `boolean`                                 | Indicates if there are more options to load.     |
| `fetchNextPage`      | `() => void`                              | Function to load more options.                   |

## Styling

`chakra-combobox` allows style customization via the `chakraStyles` property:

```tsx
<AsyncCombobox
  options={options}
  value={selectedOption}
  onChange={setSelectedOption}
  getOptionLabel={option => option.label}
  getOptionValue={option => option.value}
  placeholder="Select an option"
  fetchNextPage={fetchNextPage}
  handleSearchChange={value => setSearch(value)}
  isLoading={isLoading}
  isFetchingNextPage={isFetchingNextPage}
  hasNextPage={hasNextPage}
  chakraStyles={{
    control: base => ({ ...base, borderColor: "blue.500" }),
    menuList: base => ({ ...base, background: "gray.50" }),
    option: base => ({ ...base, color: "black" }),
  }}
/>
```

## Virtualization Support

The component uses `react-virtual` to render only visible elements on the screen, improving performance when dealing with large lists.

## Documentation & Demo

For a full demonstration and detailed documentation, visit the [Storybook Documentation](https://daniel-dnb.github.io/chakra-combobox).

## Conclusion

`chakra-combobox` is a flexible solution for creating highly customizable asynchronous dropdowns, optimized for performance and seamlessly integrated with Chakra UI.
