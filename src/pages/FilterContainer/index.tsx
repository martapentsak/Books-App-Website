import { ReactNode } from "react";

import { Select } from "./components/Select";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

type SelectorsArray = {
  label: string;
  options: string[];
};

type Props = {
  children: ReactNode;
  selector: SelectorsArray[];
  onFilterValueChange: (name: string, value: string) => void;
  onSearchValueChange: (value: string) => void;
};

export function FilterContainer({
  children,
  selector,
  onFilterValueChange,
  onSearchValueChange,
}: Props) {
  return (
    <div className="page-layout">
      <div className="page-layout-wrapper">
        <div className="page-layout-search-filter-section">
          <TextField
            placeholder="Search"
            className="search-input"
            onChange={(e) => onSearchValueChange(e.target.value)}
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
          <div className="filter-section">
            {selector.map(({ label, options }: SelectorsArray, index) => (
              <Select
                key={index}
                label={label}
                options={options}
                onChange={(name, value) => onFilterValueChange(name, value)}
              />
            ))}
          </div>
        </div>
        <div className="smaller-width-select-section">
          {selector.map(({ label, options }: SelectorsArray, index) => (
            <Select
              key={index}
              label={label}
              options={options}
              onChange={(name, value) => onFilterValueChange(name, value)}
            />
          ))}
        </div>
        <div className="page-layout-list-section">{children}</div>
      </div>
    </div>
  );
}
