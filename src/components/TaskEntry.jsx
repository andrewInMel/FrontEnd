import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Option from "./OptionMenu";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import UnknownIcon from '../imgs/priority/Unknown.svg'

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
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#1a90ff",
  },
}));

export default function TaskEntry(props) {
  const oneTask = props.task;
  const classes = useStyles();
  /* img path */
  const path = `../imgs/priority/Unknown.svg`;
  const icon = import(`../imgs/priority/${oneTask.priority}.svg`)
  /* calculate progress */
  const startTime = new Date(oneTask.startDate).getTime();
  const dueTime = new Date(oneTask.endDate).getTime();
  const currentTime = new Date().getTime();
  const percentage = Math.round(
    (100 * (currentTime - startTime)) / (dueTime - startTime)
  );
  const progress = percentage < 100 ? percentage : 100;

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
          <Typography>{oneTask.name}</Typography>
        </Grid>
        {/* member photos */}
        {/*
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
        */}
      </Grid>
      {/* 2nd column, priority & icon */}
      <Grid item xs={3}>
        <Icon>
          <img src={'../imgs/priority/Unknown.svg'} alt="priority" />
        </Icon>
         {" " + oneTask.priority}
      </Grid>
      {/* progress */}
      <Grid container item direction="column" xs={3}>
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item>{oneTask.startDate} {oneTask.priority}.svg</Grid>
          <Grid item>{oneTask.endDate}</Grid>
        </Grid>
        <Grid item>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
      </Grid>
      {/* actions */}
      <Grid item xs={2} style={{ paddingLeft: "5%" }}>
        <Option selected={oneTask} type="task" />
      </Grid>
    </Grid>
  );
}
