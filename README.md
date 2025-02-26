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

## Basic Usage

```tsx
import { AsyncCombobox } from "chakra-combobox";
import { useState } from "react";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export default function Example() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <AsyncCombobox
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      getOptionLabel={option => option.label}
      getOptionValue={option => option.value}
      placeholder="Select an option"
    />
  );
}
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

## Dependencies

- **Chakra UI**: Provides styling and base components.
- **Radix UI Scroll Area**: Manages the scroll area.
- **TanStack React Virtual**: Implements list virtualization.
- **Lodash.debounce & Lodash.throttle**: Enhances scroll and typing event performance.

## Conclusion

`chakra-combobox` is a flexible solution for creating highly customizable asynchronous dropdowns, optimized for performance and seamlessly integrated with Chakra UI.
