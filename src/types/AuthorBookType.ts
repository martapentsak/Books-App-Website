export type AuthorProp = {
    id: string;
    name: string;
    genres: string[];
    image: string;
    award: string,
    biography: string,
    birth_year: number,

    death_year: number,
    nationality: string,
    works: string[];
}

export type BookProp = {
    id: string;
    author: string;
    genres: string[];
    image: string;
    description: string;
    publicationYear: number;
    title: string;
}



