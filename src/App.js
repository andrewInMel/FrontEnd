import React from "react";
import Greating from "./components/pages/Greating.jsx";
import Signin from "./components/pages/SignIn.jsx";
import Signup from "./components/pages/SignUp.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Greating} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;