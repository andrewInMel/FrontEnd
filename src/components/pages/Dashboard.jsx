import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
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
import Calendar from "./Calendar.jsx";

const useStyles = makeStyles({
  pushFooter: {
    flexGrow: "1",
    margin: "5vh auto",
    position: "relative",
  },
  gutterStyle: {
    padding: "0 0 1% 3%",
  },
});

let myConnections = [];

function DashBd(props) {
  const [customPath, setCustomPath] = useState("dashboard");
  let { url, path } = useRouteMatch();
  const classes = useStyles();
  const [clientData, setClientData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("status"));

  /* connection realted state*/
  const [connectionData, setConnectionData] = useState([]);
  const [filteredConnectionData, setFilteredConnectionData] = useState([]);
  const [cnxSearchValue, setCnxSearchValue] = useState("");
  const [vipSelection, setVipSelection] = useState([]);
  const [vip, SetVip] = useState(false);
  /* task realted state */
  const [taskData, setTaskData] = useState([]);
  const [filteredTaskData, setFilteredTaskData] = useState([]);
  const [taskSearchValue, setTaskSearchValue] = useState("");
  const [prioritySelection, setPrioritySelection] = useState([]);
  const [priority, setPriority] = useState("All");
  const [showCalendar, setShowCalendar] = useState(false);

  /* fetch user's data */
  useEffect(() => {
    /* fetch user's connections' data */
    Axios.get(`${serverURL}/api/connections/`, { withCredentials: true })
      .then((res) => {
        myConnections = res.data;
        setConnectionData(myConnections);
      })
      .catch((error) => {
        console.log(error);
      });
    /* fetch user's profile */
    Axios.get(`${serverURL}/api/users`, { withCredentials: true })
      .then((user) => {
        setClientData(user.data);
      })
      .catch((err) => {
        console.log(err);
      });

    /* fetch user's task data */
    Axios.get(`${serverURL}/api/tasks/`, { withCredentials: true })
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    /* clear states when unmounted */
    return () => {
      setConnectionData(null);
      setTaskData(null);
      setClientData(null);
    };
  }, []);

  /* implement seasrch functionality on task */
  useEffect(() => {
    /* use regular expression to pattern match wanted tasks */
    function filterTasks(value) {
      const regex = new RegExp(`${value}`, "gi");
      const myTask = prioritySelection.filter((oneTask) =>
        oneTask.taskName.match(regex)
      );
      setFilteredTaskData(myTask);
    }
    filterTasks(taskSearchValue);
  }, [prioritySelection, taskSearchValue]);

  /* filter prioritised task */
  useEffect(() => {
    /* prioritised task filter */
    function priorityTaskFilter(value) {
      if (value === "All") {
        setPrioritySelection(taskData);
      } else {
        const tempData = taskData.filter((oneTask) => {
          return oneTask.priority === value;
        });
        setPrioritySelection(tempData);
      }
    }
    priorityTaskFilter(priority);
  }, [priority, taskData]);

  /* implement seasrch functionality on connection */
  useEffect(() => {
    /* use regular expression to pattern match wanted connections */
    function filterConnections(value) {
      const regex = new RegExp(`${value}`, "gi");
      const myConns = vipSelection.filter((connection) => {
        return (
          connection.firstName.match(regex) ||
          connection.lastName.match(regex) ||
          connection.company.match(regex) ||
          connection.phoneNumber.match(regex)
        );
      });
      setFilteredConnectionData(myConns);
    }
    filterConnections(cnxSearchValue);
  }, [vipSelection, cnxSearchValue]);

  /* filter vip connections */
  useEffect(() => {
    /* vip connneciton filter */
    function filterVipConnections(value) {
      if (value === false) {
        setVipSelection(connectionData);
      } else {
        const tempData = connectionData.filter((connection) => {
          return connection.vip === true;
        });
        setVipSelection(tempData);
      }
    }
    filterVipConnections(vip);
  }, [vip, connectionData]);

  const switchView = () => {
    setShowCalendar(!showCalendar);
  };

  /* page layout */
  if (!loggedIn) {
    return <Redirect to="/Signin" />;
  } else {
    return (
      <Grid container direction="row">
        {/* Sidebar */}
        <Sidebar
          setCustomPath={setCustomPath}
          linkPath={url}
          setStatus={setLoggedIn}
        />
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
              <Header
                {...props}
                customPath={customPath}
                setCnxSearchValue={setCnxSearchValue}
                setTaskSearchValue={setTaskSearchValue}
                SetVip={SetVip}
                setPriority={setPriority}
                data={clientData}
                taskData={taskData}
              />
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Grid>
          {/* nest routes */}
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            className={classes.pushFooter}
          >
            <Grid item xs={10}>
              <div className={classes.gutterStyle}>
                {connectionData && taskData ? (
                  <Switch>
                    {/* dashboard page */}
                    <Route
                      exact
                      path={`${path}`}
                      render={(props) => (
                        <MainContent
                          {...props}
                          taskList={taskData}
                          connectionList={connectionData}
                        />
                      )}
                    />
                    {/* connection page */}
                    <Route
                      exact
                      path={`${path}/connection`}
                      render={(props) => (
                        <Connection
                          {...props}
                          connectionList={filteredConnectionData}
                        />
                      )}
                    />
                    {/* task page */}
                    <Route
                      exact
                      path={`${path}/task`}
                      render={(props) => {
                        if (showCalendar) {
                          return (
                            <Calendar
                              {...props}
                              switchView={switchView}
                              taskList={filteredTaskData}
                            />
                          );
                        }
                        return (
                          <TaskList
                            {...props}
                            switchView={switchView}
                            taskList={filteredTaskData}
                          />
                        );
                      }}
                    />
                  </Switch>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress color="secondary" />
                  </Box>
                )}
              </div>
            </Grid>
            {/* "Add" functionality */}
            <Grid container>
              <Grid style={{ flexGrow: "1" }}></Grid>
              <Grid item xs={2}>
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
export { myConnections };
