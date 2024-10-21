export type Author = {
  id: string;
  name: string;
  genres: string[];
  image: string;
  award: string;
  biography: string;
  nationality: string;
  works: string[];
  birthYear: number;
  deathYear: number;
  notable_works?: string[];
  death_year?: number;
  birth_year?: number;
};

export type Book = {
  id: string;
  author: string;
  genres: string[];
  image: string;
  description: string;
  publicationYear: number;
  title: string;
  cover_image?: string;
  publication_year?: number;
};
