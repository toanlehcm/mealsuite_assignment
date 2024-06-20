import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

InputField.propTypes = {};

interface IInputField {
  form: { control: any; formState: any };
  name: string;
  label: string;
  disabled: boolean;
}

function InputField({ form, name, label, disabled }: IInputField) {
  const {
    control,
    formState: { errors, touchedFields },
  } = form;

  // Only show error when has error.
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={errors?.[name]?.message}
          sx={{
            width: "500px",
          }}
        />
      )}
    />
  );
}

export default InputField;
