import React from "react";
import TaskEntry from "../TaskEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 700,
    maxWidth: 1190,
    backgroundColor: theme.palette.background.paper,
    margin: "0 0 10px 50px",
  },
}));

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index}>
      <TaskEntry task={testData[index]} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function TaskList() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <FixedSizeList
        height={690}
        width={1190}
        itemSize={75}
        itemCount={testData.length}
      >
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

export default TaskList;

const testData = [
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
    priority: "review",
    start: "2021-09-12",
    due: "2021-09-25",
  },
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
    priority: "review",
    start: "2021-09-12",
    due: "2021-09-25",
  },
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
    priority: "review",
    start: "2021-09-12",
    due: "2021-09-25",
  },
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
    priority: "review",
    start: "2021-09-12",
    due: "2021-09-25",
  },
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
];
