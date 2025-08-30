type DogBreed = {
  id: number;
  name: string;
  nameWithId: string;
};

function generateFakeBreeds(total: number): DogBreed[] {
  const prefixes = [
    "Pastor",
    "Grande",
    "Pequeno",
    "Labrador",
    "Boiadeiro",
    "Terrier",
    "Bulldog",
    "Poodle",
    "Retriever",
    "Galgo",
    "Spaniel",
    "Mastiff",
    "Dobermann",
    "Husky",
    "Shih Tzu",
  ];
  const suffixes = [
    "Brasileiro",
    "Dourado",
    "Preto",
    "da Montanha",
    "da Floresta",
    "do Ártico",
    "Europeu",
    "Ágil",
    "Valente",
    "Miniatura",
    "Gigante",
    "Rápido",
    "Amigável",
    "Protetor",
  ];

  const breeds = [];
  for (let i = 1; i <= total; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const breedName = `${prefix} ${suffix}`;
    breeds.push({ id: i, name: breedName, nameWithId: `${i} - ${breedName}` });
  }
  return breeds;
}

type DogsResponse = {
  page: number;
  data: DogBreed[];
  count: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
};

const BREEDS = generateFakeBreeds(10000);

export function getDogBreeds({
  page = 1,
  limit = 5,
  search = "",
}: PaginationParams): Promise<DogsResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const filteredBreeds = BREEDS.filter(breed =>
        breed.name.toLowerCase().includes(search.toLowerCase())
      );

      const start = (page - 1) * limit;
      const end = start + limit;
      const data = filteredBreeds.slice(start, end);
      const count = filteredBreeds.length;

      const response = {
        page,
        data,
        count,
        hasNextPage: end < count,
        hasPrevPage: start > 0,
      };

      resolve(response);
    }, 500);
  });
}
