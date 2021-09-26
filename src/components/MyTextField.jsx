import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "grey",
    "&:focus": {
      borderColor: "grey",
    },
  },
});

function MyTextField(props) {
  const classes = useStyles();
  return (
    <TextField
      style={{ width: `${props.myWidth}` }}
      size="small"
      variant="outlined"
      label={props.lable}
      name={props.name}
      value={props.fieldVaule}
      onChange={props.handler}
      type={props.type}
      InputProps={{
        classes: {
          notchedOutline: classes.notchedOutline,
        },
      }}
    />
  );
}

export default MyTextField;
