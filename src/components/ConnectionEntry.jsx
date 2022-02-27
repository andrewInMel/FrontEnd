import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import OptionMenu from "./OptionMenu";
import VIP from "../imgs/Vip.svg";

export default function ConnectionEntry(props) {
  const [optionOpen, setOptionOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleClose = () => {
    setOptionOpen(false);
  };

  const handleOpen = () => {
    setOptionOpen(true);
  };

  const oneConnection = props.connection;
  return (
    <Grid container direction="row" alignItems="center">
      {/* Connection photos */}

      <Grid item xs={1} style={{ paddingLeft: "3%" }}>
        <Avatar alt={oneConnection.name} src={oneConnection.imageSrc} />
      </Grid>
      {/* Connection name & title*/}
      <Grid
        item
        container
        direction="column"
        xs={3}
        onClick={() => {
          handleOpen();
          setIsEdit(false);
        }}
      >
        <Grid item>
          <Typography>
            {oneConnection.firstName} {oneConnection.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{oneConnection.occupation}</Typography>
        </Grid>
      </Grid>

      {/* 2nd column, company */}
      <Grid item xs={3}>
        <Typography> {oneConnection.company} </Typography>
      </Grid>
      {/* phone number */}
      <Grid item xs={2}>
        <Typography> {oneConnection.phoneNumber} </Typography>
      </Grid>
      {/* task */}
      <Grid item xs={1}>
        {/* <Typography>
          {oneConnection.tasks === null ? 0 : oneConnection.tasks.length}
        </Typography> */}
      </Grid>
      {/* vip indication */}
      <Grid item xs={1}>
        {oneConnection.vip ? <img src={VIP} alt="" /> : null}
      </Grid>
      {/* actions */}
      <Grid item xs={1}>
        <OptionMenu
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          setOptionOpen={setOptionOpen}
          optionOpen={optionOpen}
          onClose={handleClose}
          selected={oneConnection}
          type="connection"
        />
      </Grid>
    </Grid>
  );
}
