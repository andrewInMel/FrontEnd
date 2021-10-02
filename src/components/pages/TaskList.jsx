import React from "react";
import TaskEntry from "../TaskEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 700,
    maxWidth: 1190,
    backgroundColor: theme.palette.background.paper,
    margin: "10px 0 10px 50px",
  },
  headerStyle: {
    backgroundColor: "#afc1c9",
    height: "35px",
  },
  headerPosition: {
    paddingLeft: "0 43px 0 16px",
  },
  changeColor: {
    backgroundColor: "#DEE2E3",
  },
}));

function renderRow(props) {
  const { data, index, style } = props;
  return (
    <ListItem
      style={style}
      key={index}
      classes={{
        root: index % 2 === 0 ? null : data.myStyle,
      }}
    >
      <TaskEntry task={data.taskList[index]} index={index} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function TaskList(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TaskListHeader headerClass={classes} />
      <FixedSizeList
        height={665}
        width={1190}
        itemSize={75}
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

const TaskListHeader = (props) => {
  return (
    <div className={props.headerClass.headerStyle}>
      <Grid
        container
        direction="row"
        className={props.headerClass.headerPosition}
      >
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
