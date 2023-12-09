import React from "react";
import { TextField } from "@mui/material";

function CustomInput({
  disabled,
  title,
  type,
  setValue,
  value,
  id,
}) {
  return (
    <div className="Dialog_content_input">
      <TextField
        autoFocus
        margin="dense"
        id={id}
        label={title}
        name={title}
        type={type}
        fullWidth
        variant="standard"
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default CustomInput;
