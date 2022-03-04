import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  rootStyle: {
    height: "65px",
  },
  changeColor: {
    color: "#6F7985",
  },
});

export default function CircleEntry(props) {
  const person = props.circle;
  const classes = useStyle();
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.rootStyle}
    >
      {/* avatar */}
      <Grid item xs={3}>
        <Avatar key={person._id} alt={person.firstName} src={person.imageSrc} />
      </Grid>
      {/* name & job title */}
      <Grid item xs={9} container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="body2">
            {person.firstName} {person.lastName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            classes={{
              body2: classes.changeColor,
            }}
          >
            {person.occupation}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
