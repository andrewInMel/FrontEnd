import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { TextField, Typography, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { serverURL } from "./SignIn.jsx";

const useStyles = makeStyles({
  rootStyle: {
    width: "980px",
    height: "475px",
    padding: "40px 30px 10px 40px",
  },
  closeIcon: {
    margin: "0 auto",
  },
  bold: {
    fontWeight: "600",
  },
  textPosition: {
    paddingTop: "8%",
  },
  rowSpace: {
    padding: "10px 0",
  },
  midStyle: {
    padding: "100px 0 125px 75px",
  },
  chipStyle: {
    margin: "10px 0 10px 10px",
  },
});

export default function AddTask(props) {
  const classes = useStyles();
  /* states */
  const [count, setCount] = useState(0);
    const [members, setMembers] = useState({
        list: []
    });
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Unknown");
  const [status, setStatus] = useState("In Progress");
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskName, setTaskName] = useState("");
  const [groups, setGroups] = useState({
        list: []
    });
  /* data to be sent to backend */
  const taskData = {
    name: taskName, 
    description: text,
    priority: priority,
    status: status,
    endDate: dueDate,
    connections: JSON.stringify(members),
    groups: JSON.stringify(groups),
    userId: sessionStorage.getItem("id"),
  };

  /* add task memeber, popOver state */
  const open = Boolean(anchorEl);
  const handleTaskAssignment = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAssignmentClose = () => {
    setAnchorEl(null);
    setName("");
  };
  /* control methods */
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleMemberName = (event) => {
    setName(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };
  /* remove and add task member */
  const addMember = () => {
    setMembers(members.concat({ chipName: name, chipCount: count }));
    setAnchorEl(null);
    setCount(count + 1);
    setName("");
  };

  const removeMember = (memberToRemove) => () => {
    setMembers(members.filter((oneMember) => oneMember !== memberToRemove));
  };

  /* sent data to backend */
  const createTask = () => {
    axios
      .post(`${serverURL}/api/tasks/`, taskData)
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
          resetAll();
          props.onClose();
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(taskData)
      });
  };

  /* reset all state */
  const resetAll = () => {
    setCount(0);
    setMembers([]);
    setText("");
    setPriority("Critical");
    setStatus("In Progress");
    setAnchorEl(null);
    setName("");
    setDueDate("");
    setTaskName("");
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
            {/* title */}
            <Grid item className={classes.textPosition}>
              <Typography className={classes.bold} align="left">
                Task Name
              </Typography>
              <TextField
                value={taskName}
                size="small"
                variant="outlined"
                onChange={handleTaskNameChange}
                multiline={true}
                fullWidth={true}
                placeholder="Task Name ..."
                minRows="1"
              />
            </Grid>
            {/* Description */}
            <Grid item className={classes.textPosition}>
              <Typography align="left" className={classes.bold}>
                Description
              </Typography>
              <TextField
                value={text}
                variant="outlined"
                onChange={handleTextChange}
                multiline={true}
                fullWidth={true}
                placeholder="Your description here ..."
                minRows="4"
              />
            </Grid>
          </Grid>
          {/* middle section */}
          <Grid
            item
            xs={6}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            className={classes.midStyle}
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
              <Grid item xs={5}>
                <Typography> Status</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  select
                  value={status}
                  onChange={handleStatusChange}
                  InputProps={{ disableUnderline: true }}
                >
                  <MenuItem value="In Progress">
                    <img src="/imgs/status/progress.svg" alt="progress" />
                  </MenuItem>
                  <MenuItem value="Review">
                    <img src="/imgs/status/review.svg" alt="review" />
                  </MenuItem>
                  <MenuItem value="Complete">
                    <img src="/imgs/status/complete.svg" alt="complete" />
                  </MenuItem>
                </TextField>
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
              <Grid item xs={5}>
                <Typography> Priority</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  select
                  value={priority}
                  onChange={handlePriorityChange}
                  InputProps={{ disableUnderline: true }}
                >
                  <MenuItem value="Critical">
                    <img src="/imgs/priority/critical.svg" alt="critical" />
                  </MenuItem>
                  <MenuItem value="High">
                    <img src="/imgs/priority/high.svg" alt="high" />
                  </MenuItem>
                  <MenuItem value="Medium">
                    <img src="/imgs/priority/medium.svg" alt="medium" />
                  </MenuItem>
                  <MenuItem value="Low">
                    <img src="/imgs/priority/low.svg" alt="low" />
                  </MenuItem>
                  <MenuItem value="Unknown">
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
              <Grid item xs={5}>
                <Typography> Due date</Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  id="date"
                  type="date"
                  value={dueDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleDueDateChange}
                />
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
              <Grid item xs={5}>
                <Typography> Assign </Typography>
              </Grid>
              <Grid item xs={7}>
                {/*{members.map((member) => {
                  return (
                    <Chip
                      key={member.chipCount}
                      label={member.chipName}
                      variant="outlined"
                      onDelete={removeMember(member)}
                    />
                  );
                })}*/}
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
                        className={classes.chipStyle}
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
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <CloseIcon
                onClick={props.onClose}
                className={classes.closeIcon}
              />
            </Grid>
            <Grid item>
              <Button onClick={createTask} variant="contained" color="primary">
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}
