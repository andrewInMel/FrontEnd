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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Image from "../../imgs/Banana.svg";
import MyTextField from "../MyTextField";

const styles = {
  background: {
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "right",
  },
  title: {
    paddingTop: "150px",
    paddingBottom: "85px",
    fontWeight: 400,
    color: "#4B5766",
  },
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
    paddingTop: "25px",
  },
  btnLogin: {
    height: "48px",
    width: "383px",
    backgroundColor: "#4F7E83",
    "&:hover": {
      backgroundColor: "#734f83",
    },
  },
};

let userId = "611f7337668fd37db1bb6fef";
let loggedIn = true;
// const serverURL = "https://376a3413-2095-4a0f-bc7f-5f20038b7b1a.mock.pstmn.io";
const serverURL = "http://localhost:8000";

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
    Axios.post(`${serverURL}/auth/login`, this.state)
      .then((res) => {
        if (res.data.token) {
          loggedIn = true;
          userId = res.data.userId;
          this.setState({ validated: true });
        } else {
          alert("something went wrong");
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
      <div className={classes.background}>
        <Typography variant="h2" align="center" className={classes.title}>
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
                myWidth="383px"
                lable="Username"
                name="username"
                fieldVaule={username}
                handler={this.usernameHandler}
              />
            </Grid>

            {/* password */}
            <Grid item className={classes.space}>
              <MyTextField
                myWidth="383px"
                lable="Password"
                name="password"
                type="password"
                fieldVaule={password}
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
              <Button className={classes.btnLogin} type="submit">
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
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
export { userId, loggedIn, serverURL };
