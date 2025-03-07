import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      errorMessages: {},
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      [name]: value,
      errorMessages: { ...prevState.errorMessages, [name]: "" }, // Enlève l'erreur
    }));
  };

  validateForm = () => {
    const { name, description } = this.state;
    let errors = {};

    if (!name.trim()) errors.name = "remplir le nom";
    if (!description.trim()) errors.description = "remplir la description";
  // this.state.errorMessages, ce qui permet d'afficher les erreurs sous les champs.
    this.setState({ errorMessages: errors });

    return Object.keys(errors).length === 0; // Retourne true si pas d'erreurs
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;

    const newTask = {
      name: this.state.name,
      description: this.state.description,
      completed: false,
    };

    this.props.addTask(newTask);

    this.setState({ name: "", description: "", errorMessages: {} });
  };

  render() {
    const { name, description, errorMessages } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
        <div>
          <input
            type="text"
            name="name"
            id="task-name"
            placeholder="Nom de la tâche"
            value={name}
            onChange={this.handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessages.name && <p className="text-red-500 text-sm">{errorMessages.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="description"
            id="task-description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessages.description && <p className="text-red-500 text-sm">{errorMessages.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          add
        </button>
      </form>
    );
  }
}

export default TaskForm;
