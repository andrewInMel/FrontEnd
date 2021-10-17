import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch, Redirect } from "react-router-dom";
import TaskList from "./TaskList.jsx";
import Connection from "./Connection.jsx";
import MainContent from "./MainContent.jsx";
import Header from "../Header.jsx";
import Sidebar from "../Sidebar";
import Footer from "../Footer.jsx";
import Add from "../Add.jsx";
import { serverURL } from "./SignIn.jsx";
import Axios from "axios";

const useStyles = makeStyles({
  pushFooter: {
    flexGrow: "1",
  },
  addBtnStyle: {
    padding: "0 0 0 35% ",
  },
  gutterStyle: {
    padding: "1% 0 1% 3%",
  },
});

let allConnections = [];

function DashBd() {
  const classes = useStyles();
  const [connectionData, setConnectionData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("status"));
  const userId = sessionStorage.getItem("id");
  let { url, path } = useRouteMatch();

  /* fetch user's data */
  useEffect(() => {
    if (loggedIn) {
      /* fetch user's own profile & connections' data */
      Axios.get(`${serverURL}/api/connections?userId=${userId}`)
        .then((res) => {
          allConnections = res.data;
          setConnectionData(
            res.data.filter(
              (oneConnection) => oneConnection.selfId !== oneConnection.userId
            )
          );
          setClientData(
            res.data.filter(
              (oneConnection) => oneConnection.selfId === oneConnection.userId
            )[0]
          );
        })
        .catch((error) => {
          console.log(error);
        });
      /* fetch user's task data */
      Axios.get(`${serverURL}/api/tasks?userId=${userId}`)
        .then((response) => {
          setTaskData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      sessionStorage.removeItem("status");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("navStatus");
    }
    /* clear states when unmounted */
    return () => {
      setConnectionData(null);
      setTaskData(null);
      setClientData(null);
    };
  }, [userId, loggedIn]);

  if (!loggedIn) {
    return <Redirect to="/Signin" />;
  } else {
    return (
      <Grid container direction="row">
        {/* Sidebar */}
        <Sidebar linkPath={url} setStatus={setLoggedIn} />
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
          <Grid>
            {clientData ? (
              <Header data={clientData} />
            ) : (
              <Typography>Loading</Typography>
            )}
          </Grid>
          {/* nest routes */}
          <Grid
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.pushFooter}
          >
            <Grid item xs={10}>
              <div className={classes.gutterStyle}>
                {connectionData && taskData ? (
                  <Switch>
                    <Route exact path={`${path}`}>
                      <MainContent
                        taskList={taskData}
                        connectionList={connectionData}
                      />
                    </Route>
                    <Route exact path={`${path}/connection`}>
                      <Connection connectionList={connectionData} />
                    </Route>
                    <Route exact path={`${path}/task`}>
                      <TaskList taskList={taskData} />
                    </Route>
                  </Switch>
                ) : (
                  <Typography> Loading...</Typography>
                )}
              </div>
            </Grid>
            {/* "Add" functionality */}
            <Grid container item xs={2} direction="column">
              <Grid item style={{ height: window.innerHeight * 0.7 }}></Grid>
              <Grid item className={classes.addBtnStyle}>
                <Add />
              </Grid>
            </Grid>
          </Grid>
          {/* footer */}
          <Footer />
        </Grid>
      </Grid>
    );
  }
}

export default DashBd;
export { allConnections };
