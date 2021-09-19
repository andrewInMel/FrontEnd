import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Image from "../../imgs/Banana.svg";

const styles = {
  background: {
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "right",
  },
  title: {
    paddingTop: "175px",
    paddingBottom: "100px",
    fontWeight: 400,
    color: "#4B5766",
  },
  userName: {
    width: "383px",
    paddingBottom: "35px",
  },
  passWord: {
    width: "383px",
  },
  btnLogin: {
    height: "48px",
    width: "383px",
    backgroundColor: "#4F7E83",
    "&:hover": {
      backgroundColor: "#734f83",
    },
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "grey",
    "&:hover": {
      borderColor: "grey",
    },
  },
};

const userId = "";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
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
    Axios.post("https://localhost:5000/signin", this.state)
      .then((res) => {
        console.log(res);
        this.setState({ loggedIn: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    const { username, password, loggedIn } = this.state;
    if (loggedIn) {
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
            <Grid item>
              <TextField
                size="small"
                className={classes.userName}
                variant="outlined"
                label="Username"
                name="username"
                value={username}
                onChange={this.usernameHandler}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              ></TextField>
            </Grid>

            {/* password */}
            <Grid item>
              <TextField
                size="small"
                className={classes.passWord}
                variant="outlined"
                label="Password"
                name="password"
                value={password}
                onChange={this.passwordHandler}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              className={classes.userName}
            >
              {/* checkbox and forgot password */}
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="default" />}
                  label={<Typography variant="caption">Remember Me</Typography>}
                />
              </Grid>

              <Grid item>
                <Link> Forgot password </Link>
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
          style={{ paddingTop: "1rem" }}
        >
          <Link to="/Signup">New here? Get Started</Link>
        </Typography>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
export { userId };
