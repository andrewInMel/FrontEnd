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
    width: "40vw",
    padding: "2vh 0 4vh 0",
  },
  spaceStyle: {
    paddingTop: "4vh",
  },
  space: {
    paddingTop: "5vh",
  },
};

const serverURL = "https://backend-connects.herokuapp.com";
const combinedStyles = {...intStyles , ...extStyles};

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
  usernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  submitHandler = (event) => {
    event.preventDefault();
    Axios.post(`${serverURL}/auth/login/`, this.state)
      .then((res) => {
        if (res.data.token && res.data.user_id && res.data.expiry) {
          sessionStorage.setItem("status", true);
          sessionStorage.setItem("id", res.data.user_id);
          sessionStorage.setItem(
            "navStatus",
            JSON.stringify([true, false, false])
          );
          this.setState({ validated: true });
        } else {
          alert("something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed, please check your username/password");
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
        <Container className = {classes.centreContainer}>
          <Typography variant="h2" align="center" style = {{marginBottom: "4vh"}}>
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
                  myWidth="40vw"
                  label="Username"
                  name="username"
                  fieldValue={username}
                  handler={this.usernameHandler}
                />
              </Grid>

              {/* password */}
              <Grid item className={classes.space}>
                <MyTextField
                  myWidth="40vw"
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
                    control={<Checkbox style = {{color: theme.palette.steelForms.main}} />}
                    label={<Typography variant="caption">Remember Me</Typography>}
                  />
                </Grid>

                <Grid item>
                  <Typography
                    variant="caption"
                    component={Link}
                    to="/Signup"
                  >
                    Forgot password
                  </Typography>
                </Grid>
              </Grid>

              {/* login button */}
              <Grid item>
                <Button className={classes.btnLandingLogIn} type="submit">
                  Login
                </Button>
              </Grid>
              {/* redirct to signup */}
              <Grid item className={classes.spaceStyle}>
                <Typography
                  variant="caption"
                  component={Link}
                  to="/Signup"
                >
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
