import React from "react";
import TextField from "@material-ui/core/TextField";

const InputNumberField = ({ mode, name, placeholder, required, _handleChange }) => {
  return (
    <TextField
      type="number"
      label={placeholder}
      name={name}
      required={required}
      placeholder={placeholder}
      disabled={mode === "view"}
      onChange={_handleChange}
      margin="none"
      autoComplete="off"
      fullWidth
    />
  );
}

export default InputNumberField;
