import React, { useState, useRef, useEffect } from "react";
import TaskEntry from "../TaskEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  headerStyle: {
    backgroundColor: "#afc1c9",
    height: "50px",
    padding: "20px 33px 0 16px",
  },
  changeColor: {
    backgroundColor: "#DEE2E3",
  },
}));

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function TaskList(props) {
  const classes = useStyles();
  const [myWidth, setMyWidth] = useState(null);
  const ref = useRef(null);

  function delay(callback, ms) {
    var timer = 0;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  function handleResize() {
    if (ref.current) {
      setMyWidth(ref.current.offsetWidth);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", delay(handleResize, 500));
    return () => {
      window.removeEventListener("resize", delay);
    };
  }, []);

  return (
    <Paper ref={ref} elevation={3}>
      <button onClick={props.switchView}>Calendar View </button>
      <TaskListHeader headerClass={classes} />
      <FixedSizeList
        height={window.innerHeight * 0.8}
        width={myWidth}
        itemSize={80}
        itemCount={props.taskList.length}
        itemData={{
          myStyle: classes.changeColor,
          taskList: props.taskList,
          otherData: true,
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

function renderRow({ data, index, style }) {
  return (
    <ListItem
      style={style}
      key={data.taskList == null ? 0 : data.taskList[index].id}
      classes={{
        root: index % 2 === 0 ? null : data.myStyle,
      }}
    >
      <TaskEntry task={data.taskList[index]} />
    </ListItem>
  );
}

const TaskListHeader = (props) => {
  return (
    <div className={props.headerClass.headerStyle}>
      <Grid container direction="row">
        {/* taks name */}
        <Grid item xs={4} style={{ paddingLeft: "10%" }}>
          <Typography>TASK</Typography>
        </Grid>
        {/* priority */}
        <Grid item xs={3} style={{ paddingLeft: "1%" }}>
          <Typography> PRIORITY </Typography>
        </Grid>
        {/* progress */}
        <Grid item xs={3} style={{ paddingLeft: "1%" }}>
          <Typography> PROGRESS </Typography>
        </Grid>
        {/* action */}
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};

export default TaskList;
