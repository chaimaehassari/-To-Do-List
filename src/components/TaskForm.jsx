import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  componentDidMount() {
  
    const savedName = localStorage.getItem("task_name");
    const savedDescription = localStorage.getItem("task_description");
    if (savedName || savedDescription) {
      this.setState({
        name: savedName || "",
        description: savedDescription || "",
      });
    }
  }

  componentWillUnmount() {
   
    localStorage.setItem("task_name", this.state.name);
    localStorage.setItem("task_description", this.state.description);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name.trim() === "" || this.state.description.trim() === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    const newTask = {
      id: Date.now(),
      name: this.state.name,
      description: this.state.description,
      completed: false,
    };
    this.props.addTask(newTask);
    this.setState({ name: "", description: "" });

    localStorage.removeItem("task_name");
    localStorage.removeItem("task_description");
  };

  render() {
    const { name, description } = this.state;
    const isFormValid = name.trim() !== "" && description.trim() !== "";

    return (
      <form onSubmit={this.handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
        <input
          type="text"
          name="name"
          placeholder="Nom de la tâche"
          value={name}
          onChange={this.handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!isFormValid}  
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          ADD
        </button>
      </form>
    );
  }
}

export default TaskForm;
