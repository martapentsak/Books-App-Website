import { Book } from "../types/AuthorBookType";

export function centuryFromYear(year: number) {
  return `${Math.floor((year - 1) / 100) + 1}`;
}

export const yearToCentury = (publicationYear: string) =>
  isNaN(+publicationYear) ? publicationYear : centuryFromYear(+publicationYear);

export const handleGetCentuary = (list: Book[]) => {
  const allCenturies = list.map(({ publicationYear }) =>
  yearToCentury(publicationYear)
  );

  const centuryesWithoutDublocates = allCenturies.reduce(
    (acc: string[], item: string) => {
      return acc.includes(item) ? acc : [...acc, item];
    },
    []
  );

  const sortedCenturies = centuryesWithoutDublocates.sort(
    (a: string, b: string) => {
      const centuryA = parseInt(a);
      const centuryB = parseInt(b);
      return centuryA - centuryB;
    }
  );

  return sortedCenturies;
};
