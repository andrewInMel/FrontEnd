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
        <Avatar key={person.id} alt={person.name} src={person.photoSource} />
      </Grid>
      {/* name & job title */}
      <Grid item xs={9} container direction="column" justifyContent="center">
        <Grid item>
          <Typography variant="body2">{person.name}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            classes={{
              body2: classes.changeColor,
            }}
          >
            {person.title}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
