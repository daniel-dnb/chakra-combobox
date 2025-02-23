import type { Meta } from '@storybook/react'
import { AsyncComboboxExamples } from '../examples/AsyncCombobox'

export default {
  title: 'Components/AsyncCombobox',
  parameters: {
    layout: 'centered'
  }
} satisfies Meta

export const Basic = AsyncComboboxExamples.Basic
