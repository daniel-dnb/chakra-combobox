import React from 'react'
import type { Preview } from '@storybook/react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </ChakraProvider>
    )
  ]
}

export default preview
