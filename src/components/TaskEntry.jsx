import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Option from "./OptionMenu";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

/* customized liner progress */
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function TaskEntry(props) {
  const oneTask = props.task;
  const classes = useStyles();
  /* img path */
  const path = `/imgs/priority/${oneTask.priority}.svg`;
  /* calculate progress */
  const startTime = new Date(oneTask.start).getTime();
  const dueTime = new Date(oneTask.due).getTime();
  const currentTime = new Date().getTime();
  const progress = Math.round(
    (100 * (currentTime - startTime)) / (dueTime - startTime)
  );
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ padding: "1%" }}
    >
      {/* fisrt column */}
      <Grid item container direction="column" sm={3}>
        <Grid item>
          <Typography>{oneTask.taskName}</Typography>
        </Grid>
        <Grid item>
          <AvatarGroup max={4}>
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
      <Grid item sm={2}>
        <Icon>
          <img src={path} alt="priority" />
        </Icon>
      </Grid>
      {/* progress */}
      <Grid container item direction="column" sm={2}>
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item>{oneTask.start}</Grid>
          <Grid item>{oneTask.due}</Grid>
        </Grid>
        <Grid item>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
      </Grid>
      {/* actions */}
      <Grid item sm={1} style={{ paddingLeft: "3%" }}>
        <Option id={oneTask.taskId} />
      </Grid>
    </Grid>
  );
}
