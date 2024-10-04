import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { Card } from "../../components/Card";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { menuElemenets } from "../../constants/textValues";

import { UniversalListItem } from "../../types/UniversalListItem";

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

type Props = {
  listArray: UniversalListItem[];
  isAuthorCard: boolean;
};

export const PageLayout = ({ listArray, isAuthorCard }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredValues, setFilteredValues] = useState<FilteredValues>({
    genres: "",
    nationality: "",
    century: "",
  });
  const { authorsList, poetsList } = useAuthors();
  const { booksList } = useBooks();

  const location = useLocation();

  const selectors = [
    {
      link: menuElemenets.links.authors,
      selector: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(authorsList),
        },
        {
          label: "Nationality",
          name: "nationality",
          options: handleGetNationality(authorsList),
        },
      ],
    },
    {
      link: menuElemenets.links.poets,
      selector: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(poetsList),
        },
        {
          label: "Nationality",
          name: "nationality",
          options: handleGetNationality(poetsList),
        },
      ],
    },
    {
      link: menuElemenets.links.bookStore,
      selector: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(booksList),
        },
        {
          label: "Century",
          name: "century",
          options: handleGetCentuary(booksList),
        },
      ],
    },
    {
      authorPage: [
        {
          label: "Genres",
          name: "genres",
          options: handleGetGenres(authorsList),
        },
        {
          label: "Nationality",
          name: "nationality",
          options: handleGetNationality(authorsList),
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

  const filteredArray = useMemo(() => {
    let newFileredArray = [...listArray];
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
        (v) => centuryFromYear(v.year) + "th century" === century
      );
    }

    if (searchValue.length > 0) {
      newFileredArray = newFileredArray.filter((v) =>
        v.author.toLocaleLowerCase().includes(searchValue)
      );
    }
    return newFileredArray;
  }, [searchValue, filteredValues, listArray]);

  const currentSelector = selectors.find((v) => v.link === location.pathname);

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
          {currentSelector && currentSelector.selector
            ? currentSelector.selector.map(
                ({ label, name, options }: SelectorsArray, index) => (
                  <FormControl key={index}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
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
              )
            : null}
        </div>
        <div className="list-section">
          {filteredArray.length > 0 ? (
            filteredArray.map((attributes, index) => (
              <div className="item" key={index}>
                <Card {...attributes} isAuthorCard={isAuthorCard} />
              </div>
            ))
          ) : (
            <div className="no-found">No result....</div>
          )}
        </div>
      </div>
    </div>
  );
};
