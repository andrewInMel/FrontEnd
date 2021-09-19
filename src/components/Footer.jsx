import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles({
  footStyle: {
    height: "30px",
    backgroundColor: "#4F7E83",
  },
});

function Footer() {
  const classes = useStyle();
  return <Grid item className={classes.footStyle}></Grid>;
}

export default Footer;
