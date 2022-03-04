import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { TextField, Typography, MenuItem } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { serverURL } from "./SignIn.jsx";
import { myConnections } from "./Dashboard.jsx";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  rootStyle: {
    width: "950px",
    minHeight: "550px",
    padding: "40px 30px 10px 40px",
    backgroundColor: "#f7faf9",
  },
  bold: {
    fontWeight: "600",
  },
  textPosition: {
    paddingTop: "8%",
    width: "350px",
  },
  rowSpace: {
    padding: "10px 0",
  },
  midStyle: {
    padding: "75px 0 0 50px",
  },
  chipStyle: {
    margin: "10px 0 10px 10px",
  },
});

export default function EditTask(props) {
  const data = props.taskData;
  const taskMembers = myConnections.filter((connection) => {
    return data.members.includes(connection._id);
  });
  const classes = useStyles();
  /* states */
  const [text, setText] = useState(data.description);
  const [priority, setPriority] = useState(data.priority);
  const [status, setStatus] = useState(data.status);
  const [members, setMembers] = useState([]);
  const [startDate, setStartDate] = useState(data.startDate);
  const [dueDate, setDueDate] = useState(data.endDate);
  const [taskName, setTaskName] = useState(data.taskName);
  const [displayOpt, setDisplayMembers] = useState(taskMembers);

  /* data to be sent to backend */
  const taskData = {
    taskName: taskName,
    description: text,
    priority: priority,
    status: status,
    members: members,
    startDate: startDate,
    endDate: dueDate,
  };

  /* add task member */
  function addMembers(event, values) {
    if (event != null) {
      const valueIds = values.map((connection) => connection._id);
      setMembers(valueIds);
      setDisplayMembers(values);
    }
  }

  /* control methods */
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

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

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleClose = () => {
    resetAll();
    props.onClose();
  };

  const resetAll = () => {
    setMembers([]);
    setText(data.description);
    setPriority(data.priority);
    setStatus(data.status);
    setStartDate(data.startDate);
    setDueDate(data.endDate);
    setTaskName(data.taskName);
  };

  /* sent data to backend */
  const updateTask = () => {
    if ((startDate < dueDate || dueDate === "") && taskName !== "") {
      axios
        .post(`${serverURL}/api/tasks/update/${data._id}`, taskData, {
          withCredentials: true,
        })
        .then(() => {
          alert("Task edit was successful.");
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong, Please try again later");
        });
      props.onClose();
    } else {
      if (startDate > dueDate) {
        alert("Start date must be before due date.");
      }
      if (taskName === "") {
        alert("Task name is required.");
      }
    }
  };

  const EditComponent = (
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
          <Typography variant="h3">Edit Task</Typography>
        </Grid>
        {/* title */}
        <Grid item className={classes.textPosition}>
          <Typography className={classes.bold} align="left">
            Task Name*
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
        justifyContent="flex-start"
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
          <Grid item xs={4}>
            <Typography> Status*</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              select
              value={status}
              onChange={handleStatusChange}
              InputProps={{ disableUnderline: true }}
            >
              <MenuItem value="Default">
                <img src="/status/Default.svg" alt="Default" />
              </MenuItem>
              <MenuItem value="In Progress">
                <img src="/status/In Progress.svg" alt="progress" />
              </MenuItem>
              <MenuItem value="Review">
                <img src="/status/Review.svg" alt="review" />
              </MenuItem>
              <MenuItem value="Complete">
                <img src="/status/Complete.svg" alt="complete" />
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
          <Grid item xs={4}>
            <Typography> Priority*</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              select
              value={priority}
              onChange={handlePriorityChange}
              InputProps={{ disableUnderline: true }}
            >
              <MenuItem value="Default">
                <img src="/priority/Default.svg" alt="Default" />
              </MenuItem>
              <MenuItem value="Critical">
                <img src="/priority/Critical.svg" alt="critical" />
              </MenuItem>
              <MenuItem value="High">
                <img src="/priority/High.svg" alt="high" />
              </MenuItem>
              <MenuItem value="Medium">
                <img src="/priority/Medium.svg" alt="medium" />
              </MenuItem>
              <MenuItem value="Low">
                <img src="/priority/Low.svg" alt="low" />
              </MenuItem>
              <MenuItem value="Unknown">
                <img src="/priority/Unknown.svg" alt="unknown" />
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
        {/* start date */}
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.rowSpace}
        >
          <Grid item xs={4}>
            <Typography> Start Date</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="startDate"
              type="date"
              value={startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleStartDateChange}
            />
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
          <Grid item xs={4}>
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
        {/* Assign task memebers */}
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.rowSpace}
        >
          <Grid item xs={4}>
            <Typography> Assign </Typography>
          </Grid>
          <Grid item xs={6}>
            {myConnections === [] ? null : (
              <Autocomplete
                multiple
                id="task member"
                options={myConnections}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                value={displayOpt}
                onChange={(event, value) => {
                  addMembers(event, value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Task Members"
                    placeholder="Choose a member"
                  />
                )}
              />
            )}
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
        alignItems="center"
        style={{ minHeight: "480px" }}
      >
        <Grid item>
          <CloseIcon onClick={handleClose} />
        </Grid>
        <Grid item>
          <Button
            onClick={updateTask}
            variant="contained"
            style={{ backgroundColor: "#478562", color: "#FFFFFF" }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  const ViewComponent = (
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
          <Typography variant="h3">View Task</Typography>
        </Grid>

        {/* title */}
        <Grid item className={classes.textPosition}>
          <Typography className={classes.bold} align="left">
            Task Name
          </Typography>
          <TextField
            value={taskName}
            InputProps={{
              readOnly: true,
            }}
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
            InputProps={{
              readOnly: true,
            }}
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
            <img src={`/status/${status}.svg`} alt="" />
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
            <img src={`/priority/${priority}.svg `} alt="" />
          </Grid>
        </Grid>

        {/* start date */}
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.rowSpace}
        >
          <Grid item xs={5}>
            <Typography> Start Date</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="startDate"
              type="date"
              value={startDate}
              InputLabelProps={{
                shrink: true,
                readOnly: true,
              }}
              InputProps={{ disableUnderline: true, readOnly: true }}
            />
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
                readOnly: true,
              }}
              InputProps={{ disableUnderline: true, readOnly: true }}
            />
          </Grid>
        </Grid>

        {/* Assign task memebers */}
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.rowSpace}
        >
          <Grid item xs={4}>
            <Typography> Assigned </Typography>
          </Grid>
          <Grid item xs={8}>
            {displayOpt.length === 0
              ? null
              : displayOpt.map((node) => {
                  return (
                    <Chip
                      avatar={<Avatar alt="" src={node.imageSrc} />}
                      label={`${node.firstName} ${node.lastName}`}
                      key={`${Math.floor(Math.random() * 10000)} ${
                        node.firstName
                      }`}
                      style={{ margin: "0 5px 5px 0" }}
                    />
                  );
                })}
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
          <CloseIcon onClick={props.onClose} className={classes.closeIcon} />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className={classes.rootStyle}>
        {/* root page */}
        {props.isEdit ? EditComponent : ViewComponent}
      </div>
    </Dialog>
  );
}
