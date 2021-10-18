import { Component } from "react";
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

const intStyles = {
  checkboxStyle: {
    width: "383px",
    padding: "5px 0 35px 0",
  },
  spaceStyle: {
    paddingTop: "10px",
  },
  noDecoration: {
    textDecoration: "none",
  },
  space: {
    paddingTop: "50px",
  },
  centreContainer: {
    position: "absolute",
    top: "25%",
  },
};

const combinedStyles = {...intStyles , ...extStyles};
const serverURL = "https://backend-connects.herokuapp.com";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      validated: false,
    };
    sessionStorage.setItem("status", "false");
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
      console.log({
          username: this.state.username,
          password: this.state.password,
      })
      Axios.post(`${serverURL}/auth/login/`, {
          username: this.state.username,
          password: this.state.password,
      })
      .then((res) => {
        if (res.data.token) {
          sessionStorage.setItem("status", true);
          sessionStorage.setItem("id", res.data.userId);
          sessionStorage.setItem(
            "navStatus",
            JSON.stringify([true, false, false])
          );

          this.setState({ validated: true });
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
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
          <Typography variant="h2" align="center">
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
                label="Username"
                name="username"
                fieldValue={username}
                handler={this.usernameHandler}
              />
            </Grid>

            {/* password */}
            <Grid item className={classes.space}>
              <MyTextField
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
                    control={<Checkbox color="default" />}
                    label={<Typography variant="caption">Remember Me</Typography>}
                  />
                </Grid>

                <Grid item>
                  <Typography
                    className={classes.noDecoration}
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
            </Grid>
          </form>
          {/* redirct to signup */}
          <Typography
            variant="caption"
            align="center"
            display="block"
            className={`${classes.noDecoration} ${classes.spaceStyle}`}
            component={Link}
            to="/Signup"
          >
            New here? Get Started
          </Typography>
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
