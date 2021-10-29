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
import Calendar from "./Calendar.jsx";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  pushFooter: {
    flexGrow: "1",
    margin: "10vh auto",
    position: "relative",
  },
  addBtnStyle: {
    padding: "0 0 0 35% ",
  },
  gutterStyle: {
    padding: "0 0 1% 3%",
  },
});

let allConnections = [];

function DashBd(props) {
  const classes = useStyles();
  const [connectionData, setConnectionData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("status"));
  const userId = sessionStorage.getItem("id");
  let { url, path } = useRouteMatch();
  /* filtered data & page direction */
  const [filteredConnectionData, setFilteredConnectionData] = useState([]);
  const [filteredTaskData, setFilteredTaskData] = useState([]);
  const [vipSelection, setVipSelection] = useState([]);
  const [customPath, setCustomPath] = useState("dashboard");
  const [searchValue, setSearchValue] = useState("");
  const [vip, SetVip] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  /* fetch user's data */
  useEffect(() => {
    if (loggedIn) {
      /* fetch user's own profile & connections' data */
        console.log(Cookies.get("token"))
        Axios.get(`${serverURL}/api/connections?userId=${userId}/`, {
            headers: {
                'Authorization': `Token ${Cookies.get("token")}`
            }
        })
        .then((res) => {
          const myConnections = res.data.filter(
            (oneConnection) => oneConnection.selfId !== oneConnection.userId
          );
          allConnections = res.data;
          setConnectionData(myConnections);
          setVipSelection(myConnections);
          setFilteredConnectionData(myConnections);
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
        Axios.get(`${serverURL}/api/tasks?userId=${userId}/`, {
            headers: {
                'Authorization': `Token ${Cookies.get("token")}`
            }
        })
        .then((response) => {
          setTaskData(response.data);
          setFilteredTaskData(response.data);
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

  /* use regular expression to pattern match wanted tasks */
  const filterTasks = (e) => {
    const regex = new RegExp(`${e.target.value}`, "gi");
    const myTasks = taskData.filter((task) => {
      return task.name.match(regex) || task.priority.match(regex);
    });
    setFilteredTaskData(myTasks);
  };

  /* implement seasrch function on connection */
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
    if (vipSelection) {
      filterConnections(searchValue);
    }
  }, [vipSelection, searchValue]);

  /* filter Vip connections */
  useEffect(() => {
    /* Vip connneciton filter */
    function filterVipConnections(value) {
      if (value === false) {
        setVipSelection(connectionData);
      } else {
        const tempData = connectionData.filter((connection) => {
          return connection.Vip === true;
        });
        setVipSelection(tempData);
      }
    }
    if (connectionData) {
      filterVipConnections(vip);
    }
  }, [vip, connectionData]);

  const switchView = () => {
    setShowCalendar(!showCalendar);
  };

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
                setSearchValue={setSearchValue}
                SetVip={SetVip}
                filterTasks={filterTasks}
                data={clientData}
                taskData={taskData}
              />
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
            // alignItems="center"
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
