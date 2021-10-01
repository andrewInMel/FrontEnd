import React from "react";
import ConnectionEntry from "../ConnectionEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 700,
    maxWidth: 1190,
    backgroundColor: theme.palette.background.paper,
    margin: "10px 0 10px 50px",
  },
  headerStyle: {
    backgroundColor: "#afc1c9",
    height: "35px",
  },
  headerPositoin: {
    padding: "0 40px 0 46px",
  },
  changeColor: {
    backgroundColor: "#DEE2E3",
  },
}));

function renderRow(props) {
  const { data, index, style } = props;
  return (
    <ListItem
      style={style}
      key={index}
      classes={{
        root: index % 2 === 0 ? null : data.myStyle,
      }}
    >
      <ConnectionEntry connection={data.dataList[index]} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function Connection(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <ListHeader myClasses={classes} />
      <FixedSizeList
        height={665}
        width={1190}
        itemSize={75}
        itemCount={props.connectionList.length}
        itemData={{
          myStyle: classes.changeColor,
          dataList: props.connectionList,
          otherData: true,
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

const ListHeader = (props) => {
  return (
    <div className={props.myClasses.headerStyle}>
      <Grid
        container
        direction="row"
        className={props.myClasses.headerPositoin}
      >
        <Grid item xs={1}>
          <Typography> NAME </Typography>
        </Grid>
        {/* name */}
        <Grid item xs={3}></Grid>
        {/* company */}
        <Grid item xs={3}>
          <Typography> COMPANY </Typography>
        </Grid>
        {/* location */}
        <Grid item xs={2}>
          <Typography> LOCATION </Typography>
        </Grid>
        {/* task */}
        <Grid item xs={1}>
          <Typography> TASK </Typography>
        </Grid>
        {/* vip */}
        <Grid item xs={1}>
          <Typography> VIP </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default Connection;
