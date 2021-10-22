import { Button, Paper } from "@material-ui/core";
import { Scheduler, MonthView } from "@progress/kendo-react-scheduler";
// import { baseData } from "./events-utc";

const Calendar = ({ taskList, switchView }) => {
  //   const customModelFields = {
  //     id: "TaskID",
  //     title: "Title",
  //     description: "Description",
  //     start: "Start",
  //     end: "End",
  //     recurrenceRule: "RecurrenceRule",
  //     recurrenceId: "RecurrenceID",
  //     recurrenceExceptions: "RecurrenceException",
  //   };
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  const parseAdjust = (eventDate) => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };

  //   const randomInt = (min, max) =>
  //     Math.floor(Math.random() * (max - min + 1)) + min;

  const displayDate = new Date(Date.UTC(currentYear, currentMonth, currentDay));
  const sampleData = taskList.map((dataItem) => ({
    id: dataItem.id,
    start: parseAdjust(dataItem.startDate),
    startTimezone: null,
    end: parseAdjust(dataItem.endDate),
    endTimezone: null,
    isAllDay: false,
    title: dataItem.name,
    description: dataItem.description,
    recurrenceRule: null,
    recurrenceId: null,
    recurrenceExceptions: null,
    ownerID: dataItem.userId,
  }));
  //   const sampleDataWithResources = taskList.map((dataItem) => ({
  //     id: dataItem.id,
  //     start: parseAdjust(dataItem.startDate),
  //     startTimezone: null,
  //     end: parseAdjust(dataItem.endDate),
  //     endTimezone: null,
  //     isAllDay: false,
  //     title: dataItem.name,
  //     description: dataItem.description,
  //     recurrenceRule: null,
  //     recurrenceId: null,
  //     recurrenceExceptions: null,
  //     ownerID: dataItem.userId,
  //   }));
  //   const sampleDataWithCustomSchema = taskList.map((dataItem) => ({
  //     ...dataItem,
  //     Start: parseAdjust(dataItem.startDate),
  //     End: parseAdjust(dataItem.endDate),
  //     PersonIDs: randomInt(1, 2),
  //     RoomID: randomInt(1, 2),
  //   }));

  return (
    <Paper elevation={3} style={{ position: "relative" }}>
      <Button
      //  style={{ position: "absolute", right: 0, top: 0 }}
        variant="contained"
        onClick={switchView}
      >
        List View{" "}
      </Button>
      <Scheduler data={sampleData} defaultDate={displayDate}>
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
