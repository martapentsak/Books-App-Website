export type Author = {
  id: string;
  name: string;
  genres: string[];
  image: string;
  award: string;
  biography: string;
  nationality: string;
  birthYear: number;
  deathYear: number;
  works: string[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  genres: string[];
  image: string;
  description: string;
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
