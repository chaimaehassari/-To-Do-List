import React, { Component } from "react";

class TaskItem extends Component {
  render() {
    const { task, deleteTask, toggleComplete } = this.props;  
    return (
      <div
        className="p-3 flex justify-between items-center border border-gray-200 rounded-lg mb-2 ">
        <div>
          <h3 className="text-lg font-bold">{task.name}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="flex items-center">
    
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}  
            className="form-checkbox h-5 w-5 text-green-500 mr-2"
            
          />
          <button
            onClick={() => deleteTask(task.id)}
            className="px-2.5 py-1.5 bg-red-300 text-white rounded-md hover:bg-red-600 transition-colors h-[2rem] w-[2rem] text-center"

          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default TaskItem;
