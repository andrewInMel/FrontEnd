import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Hyphen from "../imgs/Hyphen.svg";
import ListAltIcon from '@mui/icons-material/ListAlt'; //tasks icon
import RecentActorsIcon from '@mui/icons-material/RecentActors'; //connections icon
import AssessmentIcon from '@mui/icons-material/Assessment'; //dashboard icon

const useStyles = makeStyles({
  root: {
    backgroundColor: "#DEE2E3",
  },
  topStyle: {
    margin: "48px 84px 48px 41px",
  },
  middleStyle: {
    flexGrow: "1",
    padding: "0 0 0 70px",
  },
  bottomStyle: {
    height: "80px",
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
    margin: "0 15px 0 -15px",
  },
});

function Sidebar(props) {
  const [clicked, setClicked] = useState(
    JSON.parse(sessionStorage.getItem("navStatus"))
  );
  const classes = useStyles();

  const handleSignOut = () => {
    props.setStatus(false);
  };
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
        <a href="/Dashboard"><img src={logo} className={classes.imgStyle} alt="Logo"></img></a>
      </Grid>
      {/* Navigation */}
      <Grid
        container
        item
        direction="column"
        justifyContent="space-evenly"
        className={classes.middleStyle}
      >
        <Grid
          item
          onClick={() => {
            setClicked([true, false, false]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([true, false, false])
            );
          }}
        >
          {clicked[0] ? (
            <AssessmentIcon></AssessmentIcon>
          ) : null}
          <Typography
            className={classes.text}
            component={Link}
            to={`${props.linkPath}`}
          >
            Dashboard
          </Typography>
        </Grid>
        <Grid
          item
          onClick={() => {
            setClicked([false, true, false]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([false, true, false])
            );
          }}
        >
          {clicked[1] ? (
            <RecentActorsIcon></RecentActorsIcon>
          ) : null}
          <Typography
            className={classes.text}
            component={Link}
            to={`${props.linkPath}/connection`}
          >
            Connection
          </Typography>
        </Grid>
        <Grid
          item
          onClick={() => {
            setClicked([false, false, true]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([false, false, true])
            );
          }}
        >
          {clicked[2] ? (
            <ListAltIcon></ListAltIcon>
          ) : null}
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
        justifyContent="center"
        alignItems="center"
        className={classes.bottomStyle}
      >
        <Grid item>
          {/* <Typography className={classes.text} component={Link} to={"/Setting"}>
            Settings
          </Typography> */}
        </Grid>
        <Grid item>
          <Typography
            className={classes.text}
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
          >
            Sign out
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
