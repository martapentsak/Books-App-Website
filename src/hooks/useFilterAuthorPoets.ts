import { useState } from "react";

import { Author } from "../types/AuthorBookType";
import { useSearchable } from "./useSearchable";
import { allValue } from "../constants/textValues";

type FilterValues = {
  genres: string;
  nationality: string;
};

export function useFilterPoetsAuthors(authors: Author[]) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValues, setFilterValues] = useState<FilterValues>({
    genres: allValue,
    nationality: allValue,
  });

  const onFilterValueChange = (name: string, value: string) =>
    setFilterValues((prev) => ({ ...prev, [name]: value }));

  const filterAuthors = (data: Author[]) => {
    let result = [...data];
    const { genres, nationality } = filterValues;
    if (genres !== allValue) {
      result = result.filter((d) => d.genres.includes(genres));
    }
    if (nationality !== allValue) {
      result = result.filter((d) => d.nationality === nationality);
    }
    return result;
  };

  const filteredAuthors = filterAuthors(authors);

  const searchResults = useSearchable(
    filteredAuthors,
    searchValue,
    (author) => [author.name]
  );

  return {
    filteredAuthors: searchResults,
    searchValue,
    onFilterValueChange,
    onSearchValueChange: setSearchValue,
  };
}
