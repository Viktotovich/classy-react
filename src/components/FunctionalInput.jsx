import { useState } from "react";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setInputVal("");
  };

  function handleDelete(e) {
    const taskToDelete = e.target.parentElement.firstChild.data;
    let filteredArr = todos.filter((task) => task !== taskToDelete);
    setTodos(filteredArr);
  }

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo) => (
          <li key={todo}>
            {todo}
            <button htmlFor={todo} onClick={handleDelete}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="task-no-container">
        <h3>Number of tasks: {todos.length}</h3>
      </div>
    </section>
  );
};

export default FunctionalInput;
