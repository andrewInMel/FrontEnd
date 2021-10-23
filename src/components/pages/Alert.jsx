import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useEffect, useState } from "react";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  rootMenu: {
    backgroundColor: "#fdfffc",
  },
});

const Alert = ({ taskData }) => {
  const [reminders, setReminders] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [clicked, setClicked] = useState(false);
  const classes = useStyle();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    taskData.forEach((task) => {
      const day = moment(task.endDate).endOf("day").fromNow();
      if (day === "in 2 days" || day === "in a day") {
        setReminders((reminders) => {
          if (!reminders.includes(task)) {
            return [...reminders, task];
          } else {
            return reminders;
          }
        });
      }
    });
  }, [taskData]);

  return (
    <Badge
      color="secondary"
      variant={reminders.length > 0 && !clicked && "dot"}
    >
      <NotificationsIcon onClick={handleClick} />

      <Menu
        id="reminders"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.rootMenu }}
      >
        {reminders
          ? reminders.map((reminder) => (
              <MenuItem key={reminder.id}>
                {reminder.name} is due in 2 days
              </MenuItem>
            ))
          : null}
      </Menu>
    </Badge>
  );
};

export default Alert;
