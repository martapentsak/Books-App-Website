import { Author } from "../types/AuthorBookType";

export const getAuthorNationality = (list: Author[]) => {
  const allNationality = list.map(({ nationality }) => nationality);
  return [...new Set(allNationality)].sort();
};
