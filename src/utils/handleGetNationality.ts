import { UniversalListItem } from "../types/UniversalListItem";

export const handleGetNationality = (list: UniversalListItem[]) => {
  const allNationality = list.map(({ nationality }) => nationality);
  const nationalityWithoutDuplicates = allNationality
    .filter((item, index) => allNationality.indexOf(item) === index)
    .sort();
  const newFirstElement = "All";
  const newNationalityArray = [newFirstElement].concat(
    nationalityWithoutDuplicates
  );
  return newNationalityArray;
};
