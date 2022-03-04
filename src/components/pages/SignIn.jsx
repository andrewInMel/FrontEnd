import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MyTextField from "../MyTextField";
import { extStyles } from "../Style.js";
import theme from "../Theme.js";

const intStyles = {
  centreContainer: {
    position: "absolute",
    top: "20%",
  },
  checkboxStyle: {
    width: "25vw",
    padding: "0 0 4vh 0",
  },
  spaceStyle: {
    paddingTop: "3vh",
  },
  space: {
    paddingTop: "2vh",
  },
};

const serverURL = `${process.env.REACT_APP_API_URL}`;
const combinedStyles = { ...intStyles, ...extStyles };

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      validated: false,
    };
  }

  /* handlers */
  handleGoogleLogin = async () => {
    if (localStorage.getItem("tags") === null) {
      localStorage.setItem(
        "tags",
        JSON.stringify(["family", "friend", "colleague"])
      );
    }
    sessionStorage.setItem("status", true);
    sessionStorage.setItem("navStatus", JSON.stringify([true, false, false]));
    window.open(`${serverURL}/auth/google`, "_self");
  };

  usernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  submitHandler = (event) => {
    event.preventDefault();
    Axios.post(`${serverURL}/auth/login`, this.state, { withCredentials: true })
      .then((res) => {
        if (localStorage.getItem("tags") === null) {
          localStorage.setItem(
            "tags",
            JSON.stringify(["family", "friend", "colleague"])
          );
        }
        sessionStorage.setItem("status", true);
        sessionStorage.setItem(
          "navStatus",
          JSON.stringify([true, false, false])
        );
        this.setState({ validated: true });
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed, please check your username/password.");
      });
  };

  render() {
    const { classes } = this.props;
    const { username, password, validated } = this.state;
    if (validated) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div className={classes.backgroundLanding}>
        <Container maxWidth={false} className={classes.centreContainer}>
          <Typography
            variant="h2"
            align="center"
            style={{ marginBottom: "6vh" }}
          >
            Stay Connectd
          </Typography>
          {/* log in form */}
          <form onSubmit={this.submitHandler}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* username */}
              <Grid item className={classes.space}>
                <MyTextField
                  myWidth="25vw"
                  label="Username"
                  name="username"
                  fieldValue={username}
                  handler={this.usernameHandler}
                  type="email"
                />
              </Grid>

              {/* password */}
              <Grid item className={classes.space}>
                <MyTextField
                  myWidth="25vw"
                  label="Password"
                  name="password"
                  type="password"
                  fieldValue={password}
                  handler={this.passwordHandler}
                />
              </Grid>

              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                className={classes.checkboxStyle}
              >
                {/* checkbox and forgot password */}
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: theme.palette.steelForms.main }}
                      />
                    }
                    label={
                      <Typography variant="caption">Remember Me</Typography>
                    }
                  />
                </Grid>

                <Grid item>
                  <Typography variant="caption" component={Link} to="/Signup">
                    Forgot password
                  </Typography>
                </Grid>
              </Grid>

              {/* login button */}
              <Grid item>
                <Button
                  className={classes.btnLandingLogIn}
                  style={{ width: "25vw" }}
                  type="submit"
                >
                  Login
                </Button>
              </Grid>

              <Grid item className={classes.space}>
                <Button
                  className={classes.btnLandingLogIn}
                  style={{ width: "25vw" }}
                  onClick={this.handleGoogleLogin}
                >
                  Google Login
                </Button>
              </Grid>

              {/* redirct to signup */}
              <Grid item className={classes.spaceStyle}>
                <Typography variant="caption" component={Link} to="/Signup">
                  New here? Get Started
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(combinedStyles)(SignIn);
export { serverURL };
