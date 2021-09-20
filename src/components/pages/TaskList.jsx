import React from "react";
import TaskEntry from "../TaskEntry";
import Paper from "@mui/material/Paper";

const testData = [
  {
    taskName: "1st task",
    taskId: "1",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/1.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/1.jpg",
      },
      {
        id: "3",
        name: "William",
        photoSource: "/imgs/1.jpg",
      },
    ],
    priority: "info",
    start: "2021-09-12",
    due: "2021-09-25",
  },
  {
    taskName: "2nd task",
    taskId: "2",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "3",
        name: "William",
        photoSource: "/imgs/2.jpg",
      },
      {
        id: "4",
        name: "William",
        photoSource: "/imgs/3.jpg",
      },
    ],
    priority: "high",
    start: "2021-08-12",
    due: "2021-09-29",
  },

  {
    taskName: "3rd task",
    taskId: "3",
    memberPhoto: [
      {
        id: "1",
        name: "Jack",
        photoSource: "/imgs/3.jpg",
      },
      {
        id: "2",
        name: "Rose",
        photoSource: "/imgs/3.jpg",
      },
    ],
    priority: "low",
    start: "2021-09-16",
    due: "2021-10-25",
  },
];

function TaskList() {
  return (
    <Paper elevation={3} style={{ height: "96%", margin: "1%" }}>
      <ul style={{ listStyleType: "none" }}>
        {testData.map((oneTask) => {
          return (
            <li key={oneTask.taskId}>
              <TaskEntry task={oneTask} />
            </li>
          );
        })}
      </ul>
    </Paper>
  );
}

export default TaskList;
