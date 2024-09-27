import { UniversalListItem } from "../types/UniversalListItem";

export const handleGetGenres = (list: UniversalListItem[]) => {
  const allGenres = list.flatMap(({ genres }) => genres);
  const genresWithoutDuplicates = allGenres
    .filter((item, index) => allGenres.indexOf(item) === index)
    .sort();
  const newFirstElement = "All";
  const newGenresArray = [newFirstElement].concat(genresWithoutDuplicates);
  return newGenresArray;
};
