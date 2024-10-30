import { ChangeEvent } from "react";

import { allValue } from "../../../../constants/textValues";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

type Prop = {
  label: string;
  options: string[];
  onChange: (name: string, value: string) => void;
};

export const Select = ({ label, onChange, options }: Prop) => {
  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        name={label.toLowerCase()}
        defaultValue={allValue}
        onChange={({
          target: { name, value },
        }: ChangeEvent<HTMLSelectElement>) => onChange(name, value)}
      >
        <option>{allValue}</option>
        {options.map((o, optionIndex) => (
          <option value={o} key={optionIndex}>
            {isNaN(+o) ? o : o + "th century"}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
