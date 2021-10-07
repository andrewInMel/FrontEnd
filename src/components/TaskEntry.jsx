import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Option from "./OptionMenu";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  progressStyle: {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      height: 10,
      borderRadius: 5,
      backgroundColor: "#c3c4c7",
    },
    [`& .${linearProgressClasses.bar}`]: {
      height: 10,
      borderRadius: 5,
      backgroundColor: (progress) => (progress !== 100 ? "primary" : "#fa3751"),
    },
  },
  progressPosition: {
    paddingBottom: "10px",
  },
}));

export default function TaskEntry(props) {
  const oneTask = props.task;
  /* img path */
  const path = `/imgs/priority/${oneTask.priority}.svg`;
  /* calculate progress */
  const startTime = new Date(oneTask.start).getTime();
  const dueTime = new Date(oneTask.due).getTime();
  const currentTime = new Date().getTime();
  const percentage = Math.round(
    (100 * (currentTime - startTime)) / (dueTime - startTime)
  );
  const progress = percentage < 100 ? percentage : 100;
  const classes = useStyles(progress);

  return (
    <Grid container direction="row" alignItems="center">
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
          <Typography>{oneTask.taskName}</Typography>
        </Grid>
        {/* member photos */}
        <Grid item>
          <AvatarGroup max={5}>
            {oneTask.memberPhoto.map((person) => (
              <Avatar
                key={person.id}
                alt={person.name}
                src={person.photoSource}
                className={classes.small}
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
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item>{oneTask.start}</Grid>
          <Grid item>{oneTask.due}</Grid>
        </Grid>
        <Grid item>
          <LinearProgress
            variant="determinate"
            value={progress}
            className={classes.progressStyle}
          />
        </Grid>
      </Grid>
      {/* actions */}
      <Grid item xs={2} style={{ paddingLeft: "5%" }}>
        <Option selected={oneTask} type="task" />
      </Grid>
    </Grid>
  );
}
