import React, { useState, useRef, useEffect } from "react";
import TaskEntry from "../TaskEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";

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

  /* sort task by its due date */
  const sortedTasklist = props.taskList.sort((el1, el2) => {
    if (el1.endDate > el2.endDate) {
      return 1;
    } else {
      return -1;
    }
  });

  /* delay re-render page  */
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
      <Button
        //  style={{ position: "absolute",  top: 0 }}
        variant="contained"
        onClick={props.switchView}
      >
        Calendar View{" "}
      </Button>

      <TaskListHeader headerClass={classes} />
      <FixedSizeList
        height={window.innerHeight * 0.7}
        width={myWidth}
        itemSize={80}
        itemCount={sortedTasklist.length}
        itemData={{
          myStyle: classes.changeColor,
          taskList: sortedTasklist,
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
      key={data.taskList == null ? 0 : data.taskList[index]._id}
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
