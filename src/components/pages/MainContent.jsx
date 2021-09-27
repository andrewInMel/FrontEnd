import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircleEntry from "../CircleEntry.jsx";
import TaskEntry from "../TaskEntry.jsx";

const useStyle = makeStyles({
  bottom: {
    width: " 940px ",
    height: "280px",
    margin: "10px 0 20px 0",
  },
  topBox: {
    width: "460px",
    height: "385px",
    backgroundColor: "#DEE2E3",
  },
  gridStyle: {
    margin: "10px",
  },
  space: {
    margin: "25px",
  },
  circleSpace: {
    marginTop: "25px",
  },
  listStyle: {
    listStyleType: "none",
  },
  circleBox: {
    width: "300px",
    height: "306px",
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

function MainContent() {
  const classes = useStyle();
  const data = testData.slice(0, 4);
  const data2 = testData2.slice(0, 4);
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
          <Paper elevation={5}>
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
                  12
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
          <Paper elevation={5}>
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
      <Paper variant="outlined" className={classes.bottom}>
        <Typography variant="h5" className={classes.textStyle}>
          Upcoming Tasks
        </Typography>
        <div>
          <ul className={classes.listStyle}>
            {data2.map((oneTask) => {
              return (
                <li className={classes.taskStyle} key={oneTask.taskId}>
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

const testData = [
  {
    id: "123",
    name: "Jack",
    photoSource: "/imgs/1.jpg",
    title: "Teacher",
  },
  {
    id: "321",
    name: "Lee",
    photoSource: "/imgs/2.jpg",
    title: "Engineer",
  },
  {
    id: "456",
    name: "Andrew",
    photoSource: "/imgs/1.jpg",
    title: "sales",
  },
  {
    id: "654",
    name: "Dan",
    photoSource: "/imgs/3.jpg",
    title: "retired",
  },
  {
    id: "789",
    name: "John",
    photoSource: "/imgs/3.jpg",
    title: "cook",
  },
  {
    id: "987",
    name: "Phil",
    photoSource: "/imgs/2.jpg",
    title: "driver",
  },
];

const testData2 = [
  {
    taskName: "2nd task",
    taskId: "2",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "3",
        name: "William",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "4",
        name: "William",
        photoSource: "/imgs/3.jpg",
      },
    ],
    priority: "high",
    start: "2021-08-12",
    due: "2021-09-29",
  },
  {
    taskName: "3rd task",
    taskId: "3",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/3.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/3.jpg",
      },
    ],
    priority: "low",
    start: "2021-09-16",
    due: "2021-10-25",
  },
  {
    taskName: "1st task",
    taskId: "1",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/1.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/1.jpg",
      },
      {
        id: "3",
        name: "William",
        photoSource: "/imgs/1.jpg",
      },
    ],
    priority: "medium",
    start: "2021-09-12",
    due: "2021-09-25",
  },
  {
    taskName: "12nd task",
    taskId: "12",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "3",
        name: "William",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "4",
        name: "William",
        photoSource: "/imgs/3.jpg",
      },
    ],
    priority: "high",
    start: "2021-08-12",
    due: "2021-09-29",
  },
  {
    taskName: "13rd task",
    taskId: "13",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/3.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/3.jpg",
      },
    ],
    priority: "low",
    start: "2021-09-16",
    due: "2021-10-25",
  },
  {
    taskName: "11st task",
    taskId: "11",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/1.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/1.jpg",
      },
      {
        id: "3",
        name: "William",
        photoSource: "/imgs/1.jpg",
      },
    ],
    priority: "review",
    start: "2021-09-12",
    due: "2021-09-25",
  },
];
