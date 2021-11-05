import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditTask from "./pages/EditTask.jsx";
import EditConnection from "./pages/EditConnection.jsx";
import { serverURL } from "./pages/SignIn.jsx";
import axios from "axios";
import Cookies from "js-cookie";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function LongMenu({
  setOptionOpen,
  optionOpen,
  selected,
  type,
  onClose,
  setIsEdit,
  isEdit,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [optionOpen, setOptionOpen] = React.useState(false);
  /* open/close option menu */
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /*  record delete fucntion */
  function deleteRecord(id) {
    //using Delete request to delete the task record
    let signal = window.confirm("Are you sure you want to delete");
    if (signal) {
      if (type === "connection") {
        axios
          .delete(`${serverURL}/api/connections/${id}/`, {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          })
          .then(() => {
            alert("Connection deleted");
            window.location.reload(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .delete(`${serverURL}/api/tasks/${id}/`, {
            headers: {
              Authorization: `Token ${Cookies.get("token")}`,
            },
          })
          .then(() => {
            alert("Task deleted");
            window.location.reload(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  /* choice of view/edit or delete task record */
  const editRecord = () => {
    setOptionOpen(true);
    setIsEdit(true);
  };

  const handleOptionClick = (e) => {
    e.currentTarget.id === "Delete" ? deleteRecord(selected.id) : editRecord();
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
      {type === "connection" ? (
        <EditConnection
          open={optionOpen}
          onClose={handleDialogClose}
          userData={selected}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ) : (
        <EditTask
          open={optionOpen}
          onClose={onClose}
          taskData={selected}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
    </div>
  );
}
