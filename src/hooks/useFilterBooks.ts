import { ChangeEvent, useState } from "react";

import { Book } from "../types/AuthorBookType";
import { useSearchable } from "./useSearchable";
import { yearToCentury } from "../utils/getSortedListOfCentury";
import { allValue } from "../constants/textValues";

type FilterValues = {
  genres: string;
  century: string;
};

export function useFilterBooks(books: Book[]) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValues, setFilterValues] = useState<FilterValues>({
    genres: allValue,
    century: allValue,
  });

  const filterBooks = (data: Book[]) => {
    let result = [...data];
    const { genres, century } = filterValues;
    if (genres !== allValue) {
      result = result.filter((d) => d.genres.includes(genres));
    }
    if (century !== allValue) {
      result = result.filter((d) =>
        yearToCentury(`${d.publicationYear}`).match(century)
      );
    }

    return result;
  };

  const onFilterValueChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const filteredAuthors = filterBooks(books);

  const searchResults = useSearchable(filteredAuthors, searchValue, (book) => [
    book.title,
  ]);

  return {
    filteredAuthors: searchResults,
    filterValues,
    searchValue,
    onFilterValueChange,
    onSearchValueChange: setSearchValue,
  };
}
