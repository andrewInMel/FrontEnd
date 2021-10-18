import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./Theme.js";

const useStyles = makeStyles({
  input: {
    fontSize: "2.5vh"
  },
  notchedOutline: {
    borderWidth: "0.5vh",
    borderColor: `${theme.palette.steelForms.main}`,
  }
});

function MyTextField(props) {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      variant="outlined"
      label={props.label}
      name={props.name}
      value={props.fieldValue}
      onChange={props.handler}
      type={props.type}
      InputProps={{
        classes: {
          input: classes.input,
          notchedOutline: classes.notchedOutline
        },
      }}
    />
  );
}

export default MyTextField;
