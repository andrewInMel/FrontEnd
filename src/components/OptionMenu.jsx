import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditTask from "./pages/EditTask.jsx";
import EditConnection from "./pages/EditConnection.jsx";
import Axios from 'axios';
import { serverURL } from "./pages/SignIn.jsx";

const options = ["Edit", "Delete"];

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

  /*  record delete fucntion */
  const deleteRecord = (id) => {
    //useing Delete request to delete the task record
    // props.type === "connection" ? Axios.delete(`${serverURL}/api/connections/${id}`) : Axios.delete(`${serverURL}/api/tasks/${id}`)
    
    props.func(props.index)

    console.log(`${id}`);
  };

  /* choice of view/edit or delete task record */
  const handleOptionClick = (e) => {
    e.currentTarget.id === "Delete"
      ? deleteRecord(props.selected.id)
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
        <EditConnection
          open={optionOpen}
          onClose={handleDialogClose}
          userData={props.selected}
        />
      ) : (
        <EditTask
          open={optionOpen}
          onClose={handleDialogClose}
          taskData={props.selected}
        />
      )}
    </div>
  );
}
