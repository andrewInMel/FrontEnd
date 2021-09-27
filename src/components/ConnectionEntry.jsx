import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Option from "./OptionMenu";
import VIP from "../imgs/Vip.svg";
// const useStyles = makeStyles((theme) => ({}));

export default function TaskEntry(props) {
  const oneConnection = props.task;
  // const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      style={{ marginLeft: "30px" }}
    >
      {/* Connection photos */}
      <Grid item xs={1}>
        <Avatar alt={oneConnection.name} src={oneConnection.photoSource} />
      </Grid>
      {/* Connection name & title*/}
      <Grid item container direction="column" xs={3}>
        <Grid item>
          <Typography>{oneConnection.name}</Typography>
        </Grid>
        <Grid item>
          <Typography>{oneConnection.title}</Typography>
        </Grid>
      </Grid>

      {/* 2nd column, company */}
      <Grid item xs={3}>
        <Typography> {oneConnection.company} </Typography>
      </Grid>
      {/* location */}
      <Grid item xs={2}>
        <Typography> {oneConnection.location} </Typography>
      </Grid>
      {/* task */}
      <Grid item xs={1}>
        <Typography> {oneConnection.task} </Typography>
      </Grid>
      {/* vip indication */}
      <Grid item xs={1}>
        {oneConnection.vip ? <img src={VIP} alt="" /> : null}
      </Grid>
      {/* actions */}
      <Grid item xs={1}>
        <Option id={oneConnection.taskId} type="connection" />
      </Grid>
    </Grid>
  );
}
