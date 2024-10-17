export type Author = {
  id: string;
  name: string;
  genres: string[];
  image: string;
  award: string;
  biography: string;
  birth_year: number;
  death_year: number;
  nationality: string;
  works: string[];
  notable_works?: string[];
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


export type Data = {
  id: string;
  genres: string[];
  image: string;
  award?: string;
  biography?: string;
  birth_year?: number;
  death_year?: number;
  nationality?: string;
  works?: string[];
  author?: string;
  name?: string;
  description?: string;
  publicationYear: number;
  title?: string;
}
