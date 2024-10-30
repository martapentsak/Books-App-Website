import { Author } from "../types/AuthorBookType";

export const handleGetNationality = (list: Author[]) => {
  const allNationality = list.map(({ nationality }) => nationality);
  return allNationality
    .reduce((acc: string[], item: string) => {
      return acc.includes(item) ? acc : [...acc, item];
    }, [])
    .sort();
};
