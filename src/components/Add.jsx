import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddTask from "./pages/AddTask";
import { makeStyles } from "@material-ui/core/styles";
import AddConnection from "./pages/AddConnection";

const useStyle = makeStyles({
  iconStyle: {
    transform: "scale(3)",
  },
});
const options = ["Add Task", "Add Connection"];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
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
    <>
      <IconButton id="long-button" onClick={handleClick}>
        <AddCircleIcon className={classes.iconStyle} />
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
      <AddConnection open={ConnectionOpen} onClose={handleConnectionClose} />
    </>
  );
}
