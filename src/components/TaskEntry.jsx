import { Typography, Grid } from "@material-ui/core";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Option from "./OptionMenu";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  myWidth: {
    minWidth: "780px",
    backgroundColor: (myProps) =>
      !myProps.myIndex || myProps.myIndex % 2 === 0 ? null : "#DEE2E3",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#DAE7E0",
  },
  myBar: {
    borderRadius: 5,
    backgroundColor: (myProps) =>
      myProps.myProgress !== 100 ? "#478562" : "#C91C00",
  },
  progressPosition: {
    paddingBottom: "10px",
  },
}));

export default function TaskEntry({ task, index, style }) {
  const oneTask = task;
  /* priority img path */
  const path = `/imgs/priority/${oneTask.priority}.svg`;
  /* calculate progress */
  const startTime = new Date(oneTask.startDate).getTime();
  const dueTime = new Date(oneTask.endDate).getTime();
  const currentTime = new Date().getTime();
  const percentage = Math.round(
    (100 * (currentTime - startTime)) / (dueTime - startTime)
  );
  const progress = percentage < 100 ? percentage : 100;
  /* variable required at runtime */
  const myProps = {
    myIndex: index,
    myProgress: progress,
  };
  const classes = useStyles(myProps);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.myWidth}
      style={style}
    >
      {/* fisrt column */}
      <Grid
        item
        container
        direction="column"
        xs={4}
        style={{ paddingLeft: "10%" }}
      >
        {/* task name */}
        <Grid item>
          <Typography>{oneTask.name}</Typography>
        </Grid>
        {/* member photos */}
        <Grid item>
          <AvatarGroup max={5}>
            {oneTask.connections.map((person) => (
              <Avatar
                key={person.id}
                alt={person.name}
                src={person.imageSrc}
                className={classes.small}
                sizes={classes.small}
              />
            ))}
          </AvatarGroup>
        </Grid>
      </Grid>
      {/* 2nd column, priority & icon */}
      <Grid item xs={3}>
        <Icon>
          <img src={path} alt="priority" />
        </Icon>
      </Grid>
      {/* progress */}
      <Grid
        container
        item
        direction="column"
        className={classes.progressPosition}
        xs={3}
      >
        <Grid item container direction="row" justifyContent="flex-end">
          <Grid item>{oneTask.endDate}</Grid>
        </Grid>
        <Grid item>
          <LinearProgress
            variant="determinate"
            value={progress}
            classes={{
              root: classes.root,
              bar: classes.myBar,
              colorPrimary: classes.colorPrimary,
            }}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="flex-start">
          <Grid item>{oneTask.startDate}</Grid>
        </Grid>
      </Grid>
      {/* actions */}
      <Grid item xs={2} style={{ paddingLeft: "5%" }}>
        <Option selected={oneTask} type="task" />
      </Grid>
    </Grid>
  );
}

