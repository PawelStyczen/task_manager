import React from "react";
import { FaTimes } from "react-icons/fa";

const task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={task.reminder === true ? "task reminder" : "task"}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text} {task.reminder}
        <FaTimes
          onClick={() => onDelete(task.id)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default task;
