import React, { useEffect, useState } from "react";
import logo from "../../imgs/Logo.svg";
import { Link } from "react-router-dom";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Image from "../../imgs/Banana.svg";

const useStyles = makeStyles(() => ({
  background: {
    minHeight: window.innerHeight,
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "right",
    backgroundSize: `${window.innerWidth * 0.85}px ${window.innerHeight}px`,
  },
  text: {
    color: "#4F7E83",
    fontStyle: "italic",
    padding: "1rem",
    textAlign: "center",
  },
  imgStyle: {
    margin: "2rem",
  },
  btnLogin: {
    height: "48px",
    width: "383px",
    backgroundColor: "#4F7E83",
    "&:hover": {
      backgroundColor: "#734f83",
    },
  },
  btnSignup: {
    height: "48px",
    width: "383px",
    backgroundColor: "#DEB525",
    "&:hover": {
      backgroundColor: "#de7525",
    },
  },
}));

function Greating() {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div>
        <img className={classes.imgStyle} src={logo} alt="Logo" />
      </div>
      <Container>
        <div style={{ padding: "50px", marginBottom: "50px" }}>
          <Typography variant="h3" align="center">
            Personal CRM
          </Typography>
          <Typography className={classes.text}>
            Our goal is to make staying connected easy
          </Typography>
        </div>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Grid item>
            <Button className={classes.btnLogin} component={Link} to="/Signin">
              <Box color="white" fontWeight="fontWeightBold">
                Login
              </Box>
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.btnSignup} component={Link} to="/SignUp">
              <Box color="white" fontWeight="fontWeightBold">
                Sign Up
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Greating;
