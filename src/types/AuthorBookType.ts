export type Author = {
  id: string;
  name: string,
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
  author: string;
  genres: string[];
  image: string;
  description: string;
  publicationYear: number;
  title: string;
  cover_image?: string;
  publication_year?: number;
};
