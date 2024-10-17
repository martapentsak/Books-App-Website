import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../../components/Card";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { menuElemenets } from "../../constants/textValues";

import { handleGetGenres } from "../../utils/handleGetGenres";
import { handleGetNationality } from "../../utils/handleGetNationality";
import {
  centuryFromYear,
  handleGetCentuary,
} from "../../utils/handleGetCentury";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { NotFound } from "../../components/NotFound";
import { ListSection } from "../../components/ListSection";
import { Data } from "../../types/AuthorBookType";
import { Loading } from "../../components/Loading";

type SelectorsArray = {
  label: string;
  name: string;
  options: string[];
};

type FilteredValues = {
  genres: string;
  nationality: string;
  century: string;
};

type Result<T> = {
  data: T[];
  className: string;
  route: string;
};

export const PageLayout = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredValues, setFilteredValues] = useState<FilteredValues>({
    genres: "",
    nationality: "",
    century: "",
  });
  const { authors, poets, loading: authorLoading } = useAuthors();
  const { books, loading: booksLoading } = useBooks();

  const location = useLocation();
  const navigate = useNavigate();

  const selectors = [
    {
      link: menuElemenets.links.authors,
      selector: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(authors),
        },
        {
          label: "Nationality",
          name: "nationality",
          options: handleGetNationality(authors),
        },
      ],
    },
    {
      link: menuElemenets.links.poets,
      selector: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(poets),
        },
        {
          label: "Nationality",
          name: "nationality",
          options: handleGetNationality(poets),
        },
      ],
    },
    {
      link: menuElemenets.links.bookStore,
      selector: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(books),
        },
        {
          label: "Century",
          name: "century",
          options: handleGetCentuary(books),
        },
      ],
    },
  ];

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );

  const handleFilterValueChange = useCallback(
    (name: string, value: string) =>
      setFilteredValues((prev) => ({ ...prev, [name]: value })),
    []
  );

  const mapCurrentData = <T extends Data>(): Result<T> => {
    let result: Result<T> = {
      data: [],
      className: "",
      route: ""
    };
    if (location.pathname === menuElemenets.links.authors) {
      (result.data = authors as T[]),
        (result.className = "author-card"),
        (result.route = "/author/");
      
    }
    if (location.pathname === menuElemenets.links.poets) {
      (result.data = poets as T[]),
        (result.className = "author-card"),
        (result.route = "/poet/");
    }
    if (location.pathname === menuElemenets.links.bookStore) {
      (result.data = books as T[]), 
      (result.className = "book-card");
      result.route = "/book/";
    }
    return result;
  };

  const { data, className, route } = mapCurrentData();

  const filteredList = useMemo(() => {
    let newFileredArray = [...data];
    const { genres, nationality, century } = filteredValues;
    const notAllValue = (value: string) => value && value !== "All";
    if (notAllValue(genres)) {
      newFileredArray = newFileredArray.filter((v) =>
        v.genres.includes(genres)
      );
    }
    if (notAllValue(nationality)) {
      newFileredArray = newFileredArray.filter(
        (v) => v.nationality === nationality
      );
    }

    if (notAllValue(century)) {
      newFileredArray = newFileredArray.filter(
        (v) => centuryFromYear(v.publicationYear) + "th century" === century
      );
    }

    if (searchValue.length > 0) {
      newFileredArray = newFileredArray.filter(
        (v) =>
          v.name?.toLocaleLowerCase().includes(searchValue) ||
          v.title?.toLocaleLowerCase().includes(searchValue)
      );
    }
    return newFileredArray;
  }, [searchValue, filteredValues, data]);

  const currentSelector = selectors.find((v) => v.link === location.pathname);

  if (booksLoading || authorLoading) {
    return <Loading/>
  }

  if (!currentSelector) {
    return <NotFound />;
  }

  return (
    <div className="page-layout">
      <div className="page-layout-wrapper">
        <div className="page-layout-search-filter-section">
          <TextField
            placeholder="Search"
            className="search-input"
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          {currentSelector.selector?.map(
            ({ label, name, options }: SelectorsArray, index) => (
              <FormControl key={index}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  {label}
                </InputLabel>
                <NativeSelect
                  defaultValue={options[0]}
                  onChange={(e) =>
                    handleFilterValueChange(name, e.target.value)
                  }
                >
                  {options.map((value, optionIndex) => (
                    <option value={value} key={optionIndex}>
                      {value}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )
          )}
        </div>
        <div className="page-layout-list-section">
          {filteredList.length > 0 ? (
            <ListSection title="" wrap>
              {filteredList.map(
                ({ title, name, id, genres, ...others }, index) => (
                  <Card
                    key={index}
                    className={className}
                    onClick={() => navigate(`${route}${id}`)}
                    title={title ? title : name || "Untitled"}
                    items={genres}
                    subtitle={title && name}
                    {...others}
                  />
                )
              )}
            </ListSection>
          ) : (
            <div className="no-found">No result....</div>
          )}
        </div>
      </div>
    </div>
  );
};
