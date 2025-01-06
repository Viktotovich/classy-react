/* eslint-disable react/destructuring-assignment */
import { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.countTasks = this.countTasks.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(e) {
    const taskToDelete = e.target.parentElement.firstChild.data;
    let filteredArr = this.state.todos.filter((task) => task !== taskToDelete);
    this.setState((inputVal) => ({
      ...inputVal,
      todos: filteredArr,
    }));
  }

  countTasks() {
    return this.state.todos.length;
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo}>
              {todo}{" "}
              <button onClick={this.handleDelete} htmlFor={todo}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <Count taskCount={this.countTasks()} />
      </section>
    );
  }
}

class Count extends ClassInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="task-no-container">
        <h3>Number of tasks: {this.props.taskCount}</h3>
      </div>
    );
  }
}

export default ClassInput;
