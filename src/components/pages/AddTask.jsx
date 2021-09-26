import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { TextField, Typography, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@mui/material/IconButton";
import Popover from "@material-ui/core/Popover";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  rootStyle: {
    width: "1080px",
    height: "600px",
    padding: "30px",
  },
  closeIcon: {
    margin: "0 auto",
  },
  bold: {
    fontWeight: "600",
  },
  textPosition: {
    paddingTop: "10%",
  },
  rowSpace: {
    padding: "10px 0",
  },
});

export default function AddTask(props) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [textState, setTextState] = useState("");
  const [priority, setPriority] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");

  /* add task memeber, popOver state */
  const open = Boolean(anchorEl);
  const handleTaskAssignment = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAssignmentClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextState(event.target.value);
  };

  const handleMemberName = (event) => {
    setName(event.target.value);
  };

  const addMember = () => {
    setMembers(members.concat({ chipName: name, chipCount: count }));
    setAnchorEl(null);
    setCount(count + 1);
  };

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
          <Grid item xs={5} direction="column" alignItems="stretch" container>
            {/* title */}
            <Grid item>
              <Typography variant="h3">Create task</Typography>
            </Grid>
            {/* Description */}
            <Grid item className={classes.textPosition}>
              <Typography align="left" className={classes.bold}>
                Description
              </Typography>
              <TextField
                value={textState}
                variant="outlined"
                onChange={handleTextChange}
                multiline={true}
                fullWidth={true}
                placeholder="Your description here ..."
                minRows="4"
              />
            </Grid>
          </Grid>
          <Grid item xs={1} />
          {/* middle section */}
          <Grid
            item
            xs={5}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            style={{ padding: "105px 50px 200px 100px" }}
          >
            {/* status */}
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              className={classes.rowSpace}
            >
              <Grid item xs={7}>
                <Typography> Status</Typography>
              </Grid>
              <Grid item xs={5} style={{ marginLeft: "-5px" }}>
                <img src="/imgs/status/progress.svg" alt="" />
              </Grid>
            </Grid>
            {/* Priority */}
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              className={classes.rowSpace}
            >
              <Grid item xs={7}>
                <Typography> Priority</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  select
                  value={priority}
                  onChange={handlePriorityChange}
                  InputProps={{ disableUnderline: true }}
                >
                  <MenuItem value="unselected" />
                  <MenuItem value="critical">
                    <img src="/imgs/priority/critical.svg" alt="critical" />
                  </MenuItem>
                  <MenuItem value="high">
                    <img src="/imgs/priority/high.svg" alt="high" />
                  </MenuItem>
                  <MenuItem value="medium">
                    <img src="/imgs/priority/medium.svg" alt="medium" />
                  </MenuItem>
                  <MenuItem value="low">
                    <img src="/imgs/priority/low.svg" alt="low" />
                  </MenuItem>
                  <MenuItem value="review">
                    <img src="/imgs/priority/review.svg" alt="review" />
                  </MenuItem>
                  <MenuItem value="unknown">
                    <img src="/imgs/priority/unknown.svg" alt="unknown" />
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            {/* Due date */}
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              className={classes.rowSpace}
            >
              <Grid item xs={7}>
                <Typography> Due date</Typography>
              </Grid>
              <Grid item xs={5}>
                {"12 sep 2021"}
              </Grid>
            </Grid>
            {/* Assign chips */}
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              className={classes.rowSpace}
            >
              <Grid item xs={7}>
                <Typography> Assign </Typography>
              </Grid>
              <Grid item xs={5}>
                {members.map((member) => {
                  return (
                    <Chip
                      key={member.chipCount}
                      label={member.chipName}
                      variant="outlined"
                    />
                  );
                })}
                <Chip
                  label="Add"
                  onClick={handleTaskAssignment}
                  icon={<AddCircleIcon />}
                />
                {/* add member component */}
                <Popover
                  id="add memeber"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleAssignmentClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <TextField
                        id="Member Name"
                        label="Member Name"
                        variant="outlined"
                        style={{ margin: "10px 0 10px 10px" }}
                        onChange={handleMemberName}
                        value={name}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={addMember}
                        size="large"
                        style={{ margin: "5px" }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Popover>
              </Grid>
            </Grid>
          </Grid>
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
