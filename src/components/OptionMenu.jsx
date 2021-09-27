import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditTask from "./pages/Task.jsx";
import Profile from "./pages/Profile.jsx";

const options = ["View", "Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [optionOpen, setOptionOpen] = React.useState(false);

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
    e.currentTarget.id === "Delete"
      ? deleteTask(props.id)
      : setOptionOpen(true);
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setOptionOpen(false);
  };

  return (
    <div>
      <IconButton id="long-button" onClick={handleClick}>
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
      {props.type === "connection" ? (
        <Profile open={optionOpen} onClose={handleDialogClose} id={props.id} />
      ) : (
        <EditTask open={optionOpen} onClose={handleDialogClose} id={props.id} />
      )}
    </div>
  );
}
