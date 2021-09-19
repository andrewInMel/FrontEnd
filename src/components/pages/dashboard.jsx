import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import Task from "./Task.jsx";
import Connection from "./Connection.jsx";
import MainContent from "./MainContent.jsx";
import Header from "../Header.jsx";
import Sidebar from "../Sidebar";
import Footer from "../Footer.jsx";
import Add from "../../imgs/Add.svg";

const useStyles = makeStyles({
  rootStyle: {
    height: "100vh",
  },
  addStyle: {
    flexGrow: "1",
  },
});

function DashBd() {
  const classes = useStyles();
  let { url, path } = useRouteMatch();
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="felx-start"
        alignItems="stretch"
        className={classes.rootStyle}
      >
        {/* Sidebar */}
        <Sidebar linkPath={url} />
        {/* Content page*/}
        <Grid
          item
          xs={10}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="strench"
        >
          <Header />
          {/* nest routes */}
          <Grid
            container
            itemdirection="row"
            justifyContent="flex-start"
            alignItems="strench"
            style={{ flexGrow: "1" }}
          >
            <Grid item xs={11}>
              <Switch>
                <Route exact path={`${path}`} component={MainContent} />
                <Route path={`${path}/connection`} component={Connection} />
                <Route path={`${path}/task`} component={Task} />
              </Switch>
            </Grid>

            {/* "Add" functionality */}
            <Grid
              container
              item
              xs={1}
              itemdirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Grid>
                <img src={Add} className={classes.addStyle} />
              </Grid>
            </Grid>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default DashBd;
