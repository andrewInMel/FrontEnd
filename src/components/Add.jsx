import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import Task from "./pages/Task";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import AddTask from "./pages/AddTask";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  iconStyle: {
    transform: "scale(3)",
  },
});
const options = ["Add Task", "Add Connection"];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const classes = useStyle();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [TaskOpen, setTaskOpen] = React.useState(false);
  const [ConnectionOpen, setConnectionOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (e) => {
    e.currentTarget.id === "Add Task"
      ? setTaskOpen(true)
      : setConnectionOpen(true);
    setAnchorEl(null);
  };

  const handleConnectionClose = () => {
    setConnectionOpen(false);
  };

  const handleTaskClose = () => {
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
        size="large"
      >
        <AddCircleSharpIcon className={classes.iconStyle} />
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
      <AddTask open={TaskOpen} onClose={handleTaskClose} />

      <Dialog open={ConnectionOpen} onClose={handleConnectionClose}>
        <Task />
      </Dialog>
    </div>
  );
}
