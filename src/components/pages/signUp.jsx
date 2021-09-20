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
import Image from "../../imgs/Banana.svg";
import { withStyles } from "@material-ui/core/styles";
import MyTextField from "../MyTextField";

const styles = {
  fieldSpace: {
    paddingTop: "2rem",
  },
  background: {
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "right",
  },
  title: {
    paddingTop: "125px",
    paddingBottom: "50px",
    fontWeight: 400,
    color: "#4B5766",
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      signedUp: false,
    };
  }

  /* handlers */
  firstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };
  lastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };
  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  confirmPasswordHandler = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };
  submitHandler = (event) => {
    event.preventDefault();
    Axios.post("https://localhost:5000/signup", this.state)
      .then((res) => {
        console.log(res);
        this.setState({ signedUp: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    const { firstName, lastName, email, password, confirmPassword, signedUp } =
      this.state;
    if (signedUp) {
      return <Redirect to="/Signin" />;
    }
    return (
      <div className={classes.background}>
        <Typography variant="h2" align="center" className={classes.title}>
          Start Connecting
        </Typography>
        {/* sign up form */}

        <form onSubmit={this.submitHandler}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* name */}
            <Grid
              container
              item
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ width: "383px" }}
            >
              <Grid item className={classes.fieldSpace}>
                <MyTextField
                  myWidth="186px"
                  lable="Firstname"
                  fieldVaule={firstName}
                  handler={this.firstNameHandler}
                />
              </Grid>
              <Grid item className={classes.fieldSpace}>
                <MyTextField
                  myWidth="186px"
                  lable="Lastname"
                  fieldVaule={lastName}
                  handler={this.lastNameHandler}
                />
              </Grid>
            </Grid>
            {/* Email */}
            <Grid item className={classes.fieldSpace}>
              <MyTextField
                myWidth="383px"
                lable="Email"
                fieldVaule={email}
                handler={this.emailHandler}
              />
            </Grid>
            {/* password */}
            <Grid item className={classes.fieldSpace}>
              <MyTextField
                myWidth="383px"
                lable="Password"
                fieldVaule={password}
                handler={this.passwordHandler}
              />
            </Grid>
            {/* confirm password */}
            <Grid item className={classes.fieldSpace}>
              <MyTextField
                myWidth="383px"
                lable="Comfirm Password"
                fieldVaule={confirmPassword}
                handler={this.confirmPasswordHandler}
              />
            </Grid>

            {/* check box */}

            <Grid item style={{ width: "383px" }}>
              <FormControlLabel
                control={<Checkbox color="default" />}
                label={
                  <Typography variant="caption">
                    Accept Terms and Conditions
                  </Typography>
                }
              />
            </Grid>

            {/* submit */}
            <Grid item className={classes.fieldSpace}>
              <Button className={classes.btnLogin} type="submit">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        {/* link to sign in page */}
        <Typography
          align="center"
          variant="caption"
          display="block"
          style={{ paddingTop: "1rem" }}
        >
          <Link to="/Signin">Already have an account</Link>
        </Typography>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
