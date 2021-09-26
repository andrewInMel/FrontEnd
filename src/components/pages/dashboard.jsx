import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch, Redirect } from "react-router-dom";
import TaskList from "./TaskList.jsx";
import Connection from "./Connection.jsx";
import MainContent from "./MainContent.jsx";
import Header from "../Header.jsx";
import Sidebar from "../Sidebar";
import Footer from "../Footer.jsx";
import Add from "../Add.jsx";
import { loggedIn } from "./SignIn.jsx";

const useStyles = makeStyles({
  rootStyle: {
    height: "100vh",
  },
  pushFooter: {
    flexGrow: "1",
  },
  addBtnStyle: {
    margin: "0 50px 50px 0",
  },
});

function DashBd() {
  const classes = useStyles();
  let { url, path } = useRouteMatch();
  if (!loggedIn) {
    return <Redirect to="/Signin" />;
  } else {
    return (
      <Grid container direction="row" className={classes.rootStyle}>
        {/* Sidebar */}
        <Sidebar linkPath={url} />
        {/* Content page*/}
        <Grid
          item
          xs={10}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {/* header */}
          <Header />
          {/* nest routes */}
          <Grid
            container
            item
            direction="row"
            alignItems="flex-end"
            className={classes.pushFooter}
          >
            <Grid item xs={11}>
              <Switch>
                <Route exact path={`${path}`} component={MainContent} />
                <Route path={`${path}/connection`} component={Connection} />
                <Route path={`${path}/task`} component={TaskList} />
              </Switch>
            </Grid>

            {/* "Add" functionality */}

            <Grid item className={classes.addBtnStyle}>
              <Add />
            </Grid>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

export default DashBd;
