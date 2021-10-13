import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircleEntry from "../CircleEntry.jsx";
import TaskEntry from "../TaskEntry.jsx";

const useStyle = makeStyles({
  topBox: {
    width: "400px",
    height: "300px",
    backgroundColor: "#DEE2E3",
  },
  gridStyle: {
    margin: "10px",
  },
  space: {
    margin: "15px",
  },
  circleSpace: {
    margin: "20px 0 0 -50px",
  },
  listStyle: {
    listStyleType: "none",
  },
  circleBox: {
    width: "300px",
  },
  changeColor: {
    color: "#4F7E83",
  },
  textStyle: {
    margin: "10px 0 10px 20px",
  },
  taskStyle: {
    marginLeft: "-10%",
  },
});

function MainContent(props) {
  const classes = useStyle();
  const data2 = props.taskList.slice(0, 4);
  const data = props.connectionList.slice(0, 3);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* top section */}
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* top left section */}
        <Grid item className={classes.gridStyle}>
          <Paper elevation={3}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className={classes.topBox}
            >
              <Grid item>
                <Typography variant="h4">You've made</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h1"
                  classes={{
                    h1: classes.changeColor,
                  }}
                  className={classes.space}
                >
                  {props.connectionList.length}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">connections</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">this month</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* top right section */}
        <Grid item className={classes.gridStyle}>
          <Paper elevation={3}>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.topBox}
            >
              <Grid item className={classes.circleSpace}>
                <Typography variant="h4">Your Circle</Typography>
              </Grid>
              <Grid item className={classes.circleBox}>
                <ul className={classes.listStyle}>
                  {data.map((oneCircle) => {
                    return (
                      <li key={oneCircle.id}>
                        <CircleEntry circle={oneCircle} />
                      </li>
                    );
                  })}
                </ul>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* bottom section */}
      <Paper>
        <Typography variant="h5" className={classes.textStyle}>
          Upcoming Tasks
        </Typography>
        <div>
          <ul className={classes.listStyle}>
            {data2.map((oneTask) => {
              return (
                <li className={classes.taskStyle} key={oneTask.id}>
                  <TaskEntry task={oneTask} />
                </li>
              );
            })}
          </ul>
        </div>
      </Paper>
    </Grid>
  );
}

export default MainContent;
