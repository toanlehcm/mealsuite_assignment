import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';

interface IComboBoxField {
  form: any;
  name: string;
  label: string;
  value: any | null;
  setValue: (value: any | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  options: any[];
}

function ComboBoxField({ form, name, label, value, setValue, inputValue, setInputValue, options }: IComboBoxField) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id='controllable-states-demo'
          options={options}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
}

export default ComboBoxField;
