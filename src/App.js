import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.tasks) !== JSON.stringify(this.state.tasks)) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  addTask = (task) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, { ...task, id: Date.now() }],
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  toggleComplete = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  render() {
    return (
      <div className="max-w-xl mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-5">Liste de Tâches</h1>
        <TaskForm addTask={this.addTask} />
        <TaskList
          tasks={this.state.tasks}
          deleteTask={this.deleteTask}
          toggleComplete={this.toggleComplete}
        />
      </div>
    );
  }
}

export default App;
