import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  render() {
    const { tasks, deleteTask, toggleComplete } = this.props;

    return (
      <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune tâche disponible</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          ))
        )}
      </div>
    );
  }
}

export default TaskList;
