import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./Theme.js";
import { ClassRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  input: {
    borderWidth: "0.1vh",
    borderColor: `${theme.palette.steelForms.main}`,
    height: "2vh",
    fontSize: "2vh"
  },
  textField: {
    width: "22.5vw",
  },
  label: {
    fontSize: "2vh",
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
        className: classes.input,
      }}
      InputLabelProps={{
        className: classes.label,
      }}
    />
  );
}

export default MyTextField;
