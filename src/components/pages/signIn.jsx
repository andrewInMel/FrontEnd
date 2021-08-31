import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class signIn extends Component {
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
    const { username, password, loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <div>
        <div>
          <p>Stay Connectd</p>
        </div>
        <div>
          {/* log in form */}
          <form onSubmit={this.submitHandler}>
            {/* username */}
            <label>username</label>
            <input
              type="text"
              vaule={username}
              onChange={this.usernameHandler}
            ></input>

            {/* password */}
            <label>password</label>
            <input
              type="text"
              value={password}
              onChange={this.passwordHandler}
            ></input>

            {/* checkbox and forgot password */}
            <input type="checkbox"></input>
            <label>Remember me</label>

            {/* login button */}
            <button type="submit"> Login </button>
          </form>

          {/* redirct to signup */}
          <Link to="/Signup">
            <p>New here? Get Started</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default signIn;
