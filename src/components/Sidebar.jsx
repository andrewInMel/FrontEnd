import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Hyphen from "../imgs/Hyphen.svg";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#DEE2E3",
  },
  topStyle: {
    margin: "48px 84px 48px 41px",
  },
  middleStyle: {
    flexGrow: "1",
    padding: "0 0 0 60px",
  },
  bottomStyle: {
    height: "150px",
    backgroundColor: "#E2DCDC",
  },
  imgStyle: {
    width: "100%",
    display: "block",
    margin: "auto",
  },
  text: {
    fontWeight: "600",
    textDecoration: "none",
    fontSize: "20px",
    color: "#4F7E83",
  },
  hyphen: {
    margin: "0 20px 0 0",
  },
});
{
  /* Handler */
}

function Sidebar(props) {
  const [clicked, setClicked] = useState([true, false, false]);
  const classes = useStyles();

  return (
    <Grid
      container
      item
      xs={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      className={classes.root}
    >
      {/* Logo */}
      <Grid item className={classes.topStyle}>
        <img src={logo} className={classes.imgStyle} alt="Logo"></img>
      </Grid>
      {/* Navigation */}
      <Grid
        container
        item
        direction="column"
        justifyContent="space-evenly"
        alignItems="flex-start"
        className={classes.middleStyle}
      >
        <Grid item onClick={() => setClicked([true, false, false])}>
          {clicked[0] ? <img src={Hyphen} className={classes.hyphen} /> : null}
          <Typography
            className={classes.text}
            component={Link}
            to={`${props.linkPath}`}
          >
            Dashboard
          </Typography>
        </Grid>
        <Grid item onClick={() => setClicked([false, true, false])}>
          {clicked[1] ? <img src={Hyphen} className={classes.hyphen} /> : null}
          <Typography
            className={classes.text}
            component={Link}
            to={`${props.linkPath}/connection`}
          >
            Connection
          </Typography>
        </Grid>
        <Grid item onClick={() => setClicked([false, false, true])}>
          {clicked[2] ? <img src={Hyphen} className={classes.hyphen} /> : null}
          <Typography
            className={classes.text}
            component={Link}
            to={`${props.linkPath}/task`}
          >
            Task
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ flexGrow: "2" }} />
      {/* Settings & Sign out */}
      <Grid
        container
        item
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        className={classes.bottomStyle}
      >
        <Grid item>
          <Typography className={classes.text} component={Link} to={"/Setting"}>
            Settings
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.text} component={Link} to={"/Signin"}>
            Sign out
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
