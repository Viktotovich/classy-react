/* eslint-disable react/destructuring-assignment */
import { Component } from "react";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
      taskEdited: "",
      editMode: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.countTasks = this.countTasks.bind(this);
    this.handleStartEdit = this.handleStartEdit.bind(this);
    this.handleEndEdit = this.handleEndEdit.bind(this);
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
      editMode: false,
    }));
  }

  handleDelete(e) {
    const taskToDelete = e.target.parentElement.firstChild.data;
    let filteredArr = this.state.todos.filter((task) => task !== taskToDelete);
    this.setState((inputVal) => ({
      ...inputVal,
      todos: filteredArr,
      editMode: false,
    }));
  }

  handleStartEdit(e) {
    const taskToEdit = e.target.parentElement.firstChild.data;
    this.setState((state) => ({
      ...state,
      taskEdited: taskToEdit,
      editMode: true,
    }));
  }

  handleEndEdit(e) {
    e.preventDefault();
    /*If this looks like a lot of code, I've tried to find the index and then edit it
    at the spot in a pure way - it didnt work well and was waaaaaaaaaaay longer than
    this */
    const newTask = e.target.form[0].value;
    const oldTask = this.state.taskEdited;
    let filteredArr = this.state.todos.filter((task) => task !== oldTask);
    filteredArr.push(newTask);

    this.setState((state) => ({
      ...state,
      todos: filteredArr,
      taskEdited: "",
      editMode: false,
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
          {this.state.todos.map((todo) =>
            todo !== this.state.taskEdited ? (
              <Task
                key={todo}
                todo={todo}
                handleEdit={this.handleStartEdit}
                handleDelete={this.handleDelete}
              />
            ) : (
              <EditTask key={todo} onChange={this.handleEndEdit} todo={todo} />
            )
          )}
        </ul>
        <Count taskCount={this.countTasks()} />
      </section>
    );
  }
}

class Task extends ClassInput {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.todo}{" "}
        <button onClick={this.props.handleEdit} htmlFor={this.props.todo}>
          Edit
        </button>
        <button onClick={this.props.handleDelete} htmlFor={this.props.todo}>
          Delete
        </button>
      </li>
    );
  }
}

class EditTask extends ClassInput {
  constructor(props) {
    super(props);

    //couldn't avoid state in class
    this.state = {
      text: props.todo,
    };
    this.handleType = this.handleType.bind(this);
  }

  handleType(e) {
    this.setState(() => ({
      text: e.target.value,
    }));
  }

  render() {
    return (
      <form>
        <li>
          <label htmlFor="resubmit"></label>
          {/*Each step is like a can of worms */}
          <input
            type="text"
            name="resubmit"
            value={this.state.text}
            onChange={this.handleType}
          ></input>
          <button htmlFor="resubmit" onClick={this.props.onChange}>
            Resubmit
          </button>
        </li>
      </form>
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
