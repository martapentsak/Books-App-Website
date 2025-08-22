import { ChangeEvent } from "react";

import { allValue } from "../../../../constants/textValues";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

type Prop = {
  label: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
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
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e)}
        >
        <option>{allValue}</option>
        {options.map((o, optionIndex) => (
          <option key={optionIndex} value={o} >
            {o}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
