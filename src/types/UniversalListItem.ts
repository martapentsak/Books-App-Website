export type UniversalListItem = {
    id: string;
    author: string;
    genres: string[];
    image: string;
    works: string[];
    nationality: string
    title?: string;
    year?: number | undefined;
  };