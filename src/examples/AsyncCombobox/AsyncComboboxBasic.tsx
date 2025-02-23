import React, { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { AsyncCombobox } from '../../components/AsyncCombobox'
import { getDogBreeds } from '../../api/dogs'

const initialPage = 1

export const AsyncComboboxBasic = () => {
  const [search, setSearch] = useState('')
  const {
    data: dogs,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['dogs', search],
    queryFn: ({ pageParam = 0 }) =>
      getDogBreeds({ page: pageParam + 1, limit: 10, search }),
    initialPageParam: initialPage - 1,
    getNextPageParam: (data, _, page) => {
      if (data.hasNextPage) return page + 1
      return
    }
  })

  const parsedDogsData = isSuccess
    ? dogs?.pages
        .map((page) => page.data)
        .flat()
        .map((dogs) => ({
          value: dogs.id.toString(),
          label: dogs.name
        }))
    : []

  const [value, setValue] = useState('')

  return (
    <AsyncCombobox
      options={parsedDogsData}
      fetchNextPage={fetchNextPage}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      handleSearchChange={(value) => setSearch(value)}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      placeholder='Select a dog'
      hasNextPage={hasNextPage}
      value={value}
      onChange={setValue}
      chakraStyles={{
        control: (provided) => ({
          ...provided,
          w: '250px'
        }),
        scrollArea: (provided) => ({
          ...provided,
          maxH: '200px'
        })
      }}
    />
  )
}
