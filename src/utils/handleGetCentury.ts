import { UniversalListItem } from "../types/UniversalListItem";

export function centuryFromYear(year: number | undefined) {
  return year && Math.floor((year - 1) / 100) + 1;
}

export const handleGetCentuary = (list: UniversalListItem[]) => {
  const allCenturies = list.map(({ year }) =>
    typeof year === "string" ? year : centuryFromYear(year) + "th century"
  );
  const centuriesWithoutDuplicates = allCenturies.filter(
    (item, index) => allCenturies.indexOf(item) === index
  );
  const sortedCenturies = centuriesWithoutDuplicates.sort(
    (a: string, b: string) => {
      const centuryA = parseInt(a);
      const centuryB = parseInt(b);
      return centuryA - centuryB;
    }
  );
  const newFirstElement = "All";
  const newCenturiesArray = [newFirstElement].concat(sortedCenturies);
  return newCenturiesArray;
};
