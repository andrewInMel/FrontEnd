import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  rootStyle: {
    width: "1080px",
    height: "916px",
    padding: "30px",
  },
  closeIcon: {
    margin: "0 auto",
  },
});

export default function Profile(props) {
  const classes = useStyles();
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className={classes.rootStyle}>
        {/* root page */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          {/* left section */}
          {leftSection}
          {/* middle section */}
          <Grid item xs={7}></Grid>
          {/* right section */}
          <Grid
            container
            item
            xs={1}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
          >
            <Grid item>
              <CloseIcon
                onClick={props.onClose}
                className={classes.closeIcon}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

const leftSection = (
  <Grid
    container
    item
    xs={4}
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    {/* photo and personal detail */}
    <Grid
      container
      item
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {/* photo */}
      <Grid item>
        <Avatar alt="Profile phone" src="" />
      </Grid>
      {/* personal detail */}
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item> name</Grid>
        <Grid item> job title</Grid>
        <Grid item> location</Grid>
        <Grid item> photo upload</Grid>
      </Grid>
    </Grid>
    {/* connection and task */}
    <Grid
      container
      item
      itemdirection="row"
      justifyContent="center"
      alignItems="center"
    >
      {/* connection */}
      <Grid
        container
        item
        itemdirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item> 435 </Grid>
        <Grid item> connections </Grid>
      </Grid>
      <Grid item> vertical bar icon</Grid>
      <Grid
        container
        item
        itemdirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item> 10 </Grid>
        <Grid item> Task</Grid>
      </Grid>
    </Grid>
    {/* social media */}
    <Grid
      container
      item
      itemdirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item> icon + twitter </Grid>
      <Grid item> icon + ins </Grid>
      <Grid item> icon + github </Grid>
      <Grid item> icon + linkedIn </Grid>
    </Grid>
    {/* edit button */}
    <Grid item>
      <Button>Edit</Button>
    </Grid>
  </Grid>
);
