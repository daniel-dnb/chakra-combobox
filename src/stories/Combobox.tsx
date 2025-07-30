import { useState, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Dialog, Portal, VStack, HStack, Text } from "@chakra-ui/react";
import { AsyncCombobox as AsyncComboboxBase } from "../components/AsyncCombobox";
import { getDogBreeds } from "../api/dogs";
import { type AsyncComboboxChakraStyles } from "../components/AsyncCombobox/types";

interface DogOption {
  value: string;
  label: string;
}

const initialPage = 1;

const chakraStyles: AsyncComboboxChakraStyles = {
  control: provided => ({
    ...provided,
    w: "250px",
  }),
  scrollArea: provided => ({
    ...provided,
    maxH: "200px",
  }),
};

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
    <AsyncComboboxBase
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
      onSelect={option => setValue(option)}
      chakraStyles={chakraStyles}
    />
  );
};

export const AsyncComboboxInDialog = () => {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

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
    <VStack gap={4}>
      <Text>Example demonstrating AsyncCombobox working inside a Dialog</Text>

      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={e => setIsDialogOpen(e.open)}
        size="md"
      >
        <Dialog.Trigger asChild>
          <Button variant="outline">Open Dialog with Combobox</Button>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content ref={dialogRef}>
              <Dialog.Header>
                <Dialog.Title>Select a Dog Breed</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <VStack gap={4} align="stretch">
                  <Text>Choose your favorite dog breed:</Text>

                  <AsyncComboboxBase
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
                    onSelect={option => setValue(option)}
                    insideDialog
                    chakraStyles={{
                      ...chakraStyles,
                      control: provided => ({
                        ...provided,
                        w: "100%",
                      }),
                    }}
                  />

                  {value && (
                    <Text color="green.500">Selected: {value.label}</Text>
                  )}
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <HStack>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    colorPalette="blue"
                    onClick={() => {
                      setIsDialogOpen(false);
                    }}
                  >
                    Confirm Selection
                  </Button>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
};
