import { Book } from "../types/AuthorBookType";

export function centuryFromYear(year: number) {
  return `${Math.floor((year - 1) / 100) + 1}`;
}

export const yearToCentury = (publicationYear: string) =>
  isNaN(+publicationYear)
    ? publicationYear
    : centuryFromYear(+publicationYear) + "th century";

export const getSortedListOfCentury = (list: Book[]) => {
  const allCenturies = list.map(({ publicationYear }) =>
    yearToCentury(publicationYear)
  );
  const centuryesWithoutDublocates = [...new Set(allCenturies)];
  const sortedCenturies = centuryesWithoutDublocates.sort(
    (a: string, b: string) => {
      const centuryA = parseInt(a);
      const centuryB = parseInt(b);
      return centuryA - centuryB;
    }
  );

  return sortedCenturies;
};
