import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import Task from "./pages/Task";

const options = ["View", "Edit", "Delete"];

const ITEM_HEIGHT = 48;

function deleteTask(id) {
  //useing Delete request to delete the task record
  console.log(`${id}`);
}

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [TaskOpen, setTaskOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Dialog open={TaskOpen} onClose={handleDialogClose}>
        <Task />
      </Dialog>
    </div>
  );
}
