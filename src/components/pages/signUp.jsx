import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class signUp extends Component {
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
    const { firstName, lastName, email, password, confirmPassword, signedUp } =
      this.state;
    if (signedUp) {
      return <Redirect to="/Signin" />;
    }
    return (
      <div>
        <div>Start Connecting</div>
        {/* sign up form */}
        <div>
          {/* apple & google account api */}
          <div></div>
          {/* form */}
          <div>
            <form onSubmit={this.submitHandler}>
              {/* name */}
              <div>
                <div style={{ display: "inline-block" }}>
                  <label style={{ display: "block" }}>First name</label>
                  <input
                    stye="text"
                    vaule={firstName}
                    onChange={this.firstNameHandler}
                  ></input>
                </div>
                <div style={{ display: "inline-block" }}>
                  <label style={{ display: "block" }}>Last name</label>
                  <input
                    stye="text"
                    vaule={lastName}
                    onChange={this.lastNameHandler}
                  ></input>
                </div>
              </div>
              {/* Email */}
              <label> Email</label>
              <input
                style={{ display: "block" }}
                type="text"
                value={email}
                onChange={this.emailHandler}
              ></input>
              {/* password */}
              <label> Password</label>
              <input
                style={{ display: "block" }}
                type="text"
                value={password}
                onChange={this.passwordHandler}
              ></input>

              {/* confirm password */}
              <label> Confirm Password</label>
              <input
                style={{ display: "block" }}
                type="text"
                value={confirmPassword}
                onChange={this.confirmPasswordHandler}
              ></input>

              {/* check box */}
              <input type="checkbox"></input>
              <label>Accept Terms and Conditions</label>
              {/* submit */}
              <div>
                <button type="submit">Register</button>
              </div>
            </form>
            <div>
              <Link to="/Signin">Already have an account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default signUp;
