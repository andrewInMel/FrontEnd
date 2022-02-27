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
  const [reminders, setReminders] = useState([]);
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
    taskData.forEach((oneTask) => {
      const day = moment(oneTask.endDate).endOf("day").fromNow();
      if (day === "in 2 days" || day === "in a day") {
        setReminders((prevReminders) => {
          if (
            prevReminders.filter(
              (oneReminder) => oneReminder._id === oneTask._id
            ).length === 0
          ) {
            return [...prevReminders, { task: oneTask, exprire: day }];
          } else {
            return prevReminders;
          }
        });
      }
    });
  }, [taskData]);

  return (
    <Badge
      color="secondary"
      variant={reminders.length > 0 && !clicked ? "dot" : "standard"}
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
              <MenuItem key={reminder.task._id}>
                {reminder.task.taskName} is due {reminder.exprire}
              </MenuItem>
            ))
          : null}
      </Menu>
    </Badge>
  );
};

export default Alert;
