import React, { useState, useRef, useEffect } from "react";
import TaskEntry from "../TaskEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
// import ListItem from "@material-ui/core/ListItem";
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

function renderRow(props) {
  const { data, index, style } = props;
  return <TaskEntry task={data.taskList[index]} style={style} index={index} />;
}

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
      <TaskListHeader headerClass={classes} />
      <FixedSizeList
        height={window.innerHeight * 0.8}
        width={myWidth}
        itemSize={75}
        itemCount={props.taskList.length}
        itemData={{
          taskList: props.taskList,
          otherData: true,
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

const TaskListHeader = (props) => {
  return (
    <div className={props.headerClass.headerStyle}>
      <Grid container direction="row">
        {/* taks name */}
        <Grid item xs={4} style={{ paddingLeft: "11%" }}>
          <Typography>TASK</Typography>
        </Grid>
        {/* priority */}
        <Grid item xs={3}>
          <Typography> PRIORITY </Typography>
        </Grid>
        {/* progress */}
        <Grid item xs={3} style={{ marginLeft: "-1%" }}>
          <Typography> PROGRESS </Typography>
        </Grid>
        {/* action */}
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};

export default TaskList;
