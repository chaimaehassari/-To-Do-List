import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.setState({ tasks: JSON.parse(savedTasks) });
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  
  componentWillUnmount() {
    console.log("Sauvegarde des tâches avant démontage !");
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  
  addTask = (task) => {
    this.setState({ tasks: [...this.state.tasks, task] });
  };

 
  deleteTask = (id) => {
    this.setState({ tasks: this.state.tasks.filter((task) => task.id !== id) });
  };

  
  toggleComplete = (id) => {  
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    });
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
