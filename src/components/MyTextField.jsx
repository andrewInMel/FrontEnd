import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./Theme.js";

const useStyles = makeStyles({
  input: {
    fontSize: "2.5vmin",
  },
  notchedOutline: {
    borderWidth: "0.2vmin",
    borderColor: `${theme.palette.steelForms.main}`,
  },
  label: {
    fontSize: "2vmin",
  },
});

function MyTextField(props) {
  const classes = useStyles();
  return (
    <TextField
      style={{ width: `${props.myWidth}` }}
      size="small"
      variant="outlined"
      label={props.label}
      name={props.name}
      value={props.fieldValue}
      onChange={props.handler}
      type={props.type}
      InputProps={{
        classes: {
          input: classes.input,
          notchedOutline: classes.notchedOutline,
        },
      }}
      InputLabelProps={{
        className: classes.label,
      }}
    />
  );
}

export default MyTextField;
