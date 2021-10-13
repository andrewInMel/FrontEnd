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
import { loggedIn, /*userId,*/ serverURL } from "./SignIn.jsx";
import Axios from "axios";

const URL = "http://localhost:8000"
// const userId = "611f7337668fd37db1bb6fef"
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
  const [testData, setTestData] = useState(null);
  const [testData2, setTestData2] = useState(null);
  const [clientData, setClientData] = useState(null);
  let { url, path } = useRouteMatch();
  let userId = localStorage.getItem("userId")
// loggedIn = true;
    //
  useEffect(() => {
    Axios.get(`${URL}/api/connections?userId=${userId}`)
      .then((res) => {
        setTestData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(`${URL}/api/tasks?userId=${userId}`)
      .then((response) => {
        setTestData2(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(`${serverURL}/api/users/${userId}`)
      .then((userRes) => {
        setClientData(userRes.data)
// console.log(testData)
        console.log(`${URL}/api/connections?userId=${userId}`)
        console.log('hello')
      })
      .catch((error) => {
        console.log(error);
        console.log(`${URL}/api/connections?userId=${userId}`)
      });
    return () => {
      setTestData(null);
      setTestData2(null);
      setClientData(null);
    };
  }, []);

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
            alignItems="flex-end"
            className={classes.pushFooter}
          >
            <Grid item xs={11}>
              {testData && testData2 ? (
                <Switch>
                  <Route exact path={`${path}`}>
                    <MainContent
                      taskList={testData2}
                      connectionList={testData}
                    />
                  </Route>
                  <Route path={`${path}/connection`}>
                    <Connection connectionList={testData} />
                  </Route>
                  <Route path={`${path}/task`}>
                    <TaskList taskList={testData2} />
                  </Route>
                </Switch>
              ) : (
                <Typography> Loading...</Typography>
              )}
            </Grid>
            {/* "Add" functionality */}
            <Grid item className={classes.addBtnStyle}>
              <Add />
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
