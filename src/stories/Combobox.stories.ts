import type { Meta } from "@storybook/react";
import { AsyncCombobox } from "./Combobox";

const meta = {
  title: "Components/AsyncCombobox",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AsyncCombobox>;

export default meta;

export const Basic = AsyncCombobox;
