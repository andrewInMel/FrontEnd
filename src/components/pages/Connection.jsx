import React from "react";
import ConnectionEntry from "../ConnectionEntry";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 700,
    maxWidth: 1190,
    backgroundColor: theme.palette.background.paper,
    margin: "10px 0 10px 50px",
  },
}));

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index}>
      <ConnectionEntry task={testData[index]} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function Connection() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <FixedSizeList
        height={690}
        width={1190}
        itemSize={75}
        itemCount={testData.length}
      >
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

export default Connection;

const testData = [
  {
    id: "123",
    name: "Jack",
    company: "Google",
    location: "Melbounre",
    photoSource: "/imgs/1.jpg",
    title: "Teacher",
    task: "7",
    vip: true,
  },
  {
    id: "321",
    name: "Lee",
    company: "ABCDEFG",
    location: "Melbounre",
    photoSource: "/imgs/2.jpg",
    title: "Software Engineer",
    vip: false,
    task: "3",
  },
  {
    id: "456",
    name: "Andrew",
    company: "Victoria Government",
    location: "sydney",
    photoSource: "/imgs/1.jpg",
    title: "sales",
    vip: false,
    task: "9",
  },
  {
    id: "654",
    name: "Dan",
    company: "Facebook",
    location: "Sydney",
    photoSource: "/imgs/3.jpg",
    title: "retired",
    vip: true,
    task: "3",
  },
  {
    id: "789",
    name: "John",
    company: "Amazon",
    location: "Perth",
    photoSource: "/imgs/3.jpg",
    title: "cook",
    vip: true,
    task: "12",
  },
  {
    id: "987",
    name: "Phil",
    company: "Google",
    location: "MElbourne",
    photoSource: "/imgs/2.jpg",
    title: "driver",
    vip: false,
    task: "4",
  },
];
