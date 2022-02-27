import { Button, Paper } from "@material-ui/core";
import { Scheduler, MonthView } from "@progress/kendo-react-scheduler";

const Calendar = ({ taskList, switchView }) => {
  const parseAdjust = (eventDate) => {
    const date = new Date(eventDate);
    console.log(date);
    return date;
  };

  const PlusOneHour = (eventDate) => {
    const date = new Date(eventDate);
    date.setHours(date.getHours() + 1);
    console.log(date);
    return date;
  };

  const sampleData = taskList.map((dataItem) => {
    return {
      id: dataItem._id,
      start: parseAdjust(dataItem.endDate),
      startTimezone: null,
      end: PlusOneHour(dataItem.endDate),
      endTimezone: null,
      isAllDay: false,
      title: dataItem.name,
      description: dataItem.description,
      recurrenceRule: null,
      recurrenceId: null,
      recurrenceExceptions: null,
      ownerID: dataItem.userId,
    };
  });

  return (
    <Paper elevation={3} style={{ position: "relative" }}>
      <Button variant="contained" onClick={switchView}>
        List View
      </Button>
      <Scheduler data={sampleData}>
        <MonthView
          title="Month View"
          selectedDateFormat="{0:M}"
          selectedShortDateFormat="{0:M}"
        />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
