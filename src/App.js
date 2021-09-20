import React from "react";
import Greating from "./components/pages/Greating.jsx";
import Signin from "./components/pages/signIn.jsx";
import Signup from "./components/pages/signUp.jsx";
import Dashboard from "./components/pages/dashboard.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Greating} />
        <Route exact path="/Signin" component={Signin} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
