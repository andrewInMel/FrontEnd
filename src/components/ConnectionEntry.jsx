import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import Option from "./OptionMenu";
import VIP from "../imgs/Vip.svg";

export default function ConnectionEntry(props) {
  const oneConnection = props.connection;
  return (
    <Grid container direction="row" alignItems="center">
      {/* Connection photos */}
      <Grid item xs={1} style={{ paddingLeft: "3%" }}>
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
        <Option selected={oneConnection} type="connection" />
      </Grid>
    </Grid>
  );
}
