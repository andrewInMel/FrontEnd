import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useEffect, useState } from "react";
import moment from "moment";

const Alert = ({taskData}) => {

     const [reminders, setReminders] = useState("");
     const [open, setOpen] = useState(false);
    
   

    useEffect(() => {
 taskData.forEach((task) => {
   const day = moment(task.endDate).endOf("day").fromNow();
   console.log(moment(task.endDate).endOf("day").fromNow(), "task");
   if (day === "in 2 days") {
     setReminders(() => [...reminders, task]);
   }
 });
    }, [])

    console.log(reminders, "remindder")
  return (
    <Badge color="secondary" variant={(reminders.length > 0 && !open)  && "dot"}>
      <NotificationsIcon onClick={() => setOpen(!open)} />
      {
    open && reminders.map(reminder => (
        <p>{reminder.name} is in 2 days</p>
    ))
      }
    </Badge>
  );
};

export default Alert;
