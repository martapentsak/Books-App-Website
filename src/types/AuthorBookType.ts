export type Work = {
  name: string;
  image: string;
};

export type Author = Work & {
  id: string;
  genres: string[];
  award: string;
  biography: string;
  nationality: string;
  birthYear: number;
  deathYear: number;
  works: Work[];
};

export type Book = {
  id: string;
  title: string;
  author: string;
  publicationYear: string;
  genres: string[];
  image: string;
  description: string;
};
