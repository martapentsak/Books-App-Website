import { useCallback, useMemo, useState } from "react";

import { Card } from "../../components/Card";

import { UniversalListItem } from "../../types/UniversalListItem";

import { centuryFromYear } from "../../utils/handleGetCentury";

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
  selectorsArray: SelectorsArray[];
  listArray: UniversalListItem[];
  isAuthorCard: boolean;
};

export const PageLayout = ({
  selectorsArray,
  listArray,
  isAuthorCard,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredValues, setFilteredValues] = useState<FilteredValues>({
    genres: "",
    nationality: "",
    century: "",
  });

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
    if (genres && genres !== "All") {
      newFileredArray = newFileredArray.filter((v) =>
        v.genres.find((v) => v === genres)
      );
    }
    if (nationality && nationality !== "All") {
      newFileredArray = newFileredArray.filter(
        (v) => v.nationality === nationality
      );
    }
    if (century && century !== "All") {
      newFileredArray = newFileredArray.filter(
        (v) => centuryFromYear(v.year) + "th century" == century
      );
    }
    if (searchValue.length > 0) {
      newFileredArray = newFileredArray.filter((v) =>
        v.author.toLocaleLowerCase().includes(searchValue)
      );
    }
    return newFileredArray;
  }, [searchValue, filteredValues, listArray]);

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
          {selectorsArray.map(
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
                  {options.map((value, index) => (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            )
          )}
        </div>
        <div className="list-section">
          {filteredArray.map((attributes, index) => (
            <div className="item">
              <Card {...attributes} key={index} isAuthorCard={isAuthorCard} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
