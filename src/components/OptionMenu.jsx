import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Task from "./pages/Task";

const options = ["View", "Edit", "Delete"];

const ITEM_HEIGHT = 48;
const taskId = "";

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [TaskOpen, setTaskOpen] = React.useState(false);

  /* open/close option menu */
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /*  task delete fucntion */
  const deleteTask = (id) => {
    //useing Delete request to delete the task record
    console.log(`${id}`);
  };

  /* choice of view/edit or delete task record */
  const handleOptionClick = (e) => {
    e.currentTarget.id === "Delete" ? deleteTask(props.id) : setTaskOpen(true);
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setTaskOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} id={option} onClick={handleOptionClick}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      <Task open={TaskOpen} onClose={handleDialogClose} id={taskId} />
    </div>
  );
}
