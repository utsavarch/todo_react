import React, { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
            className="w-full px-3 py-2 border rounded-l focus:outline-none"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
        <ul className="list-none">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 border-b ${
                task.completed ? "line-through text-gray-400 " : ""
              }`}
            >
              {task.text}
              <div>
                <button
                  onClick={() => handleToggleComplete(index)}
                  className={`px-2 py-1 text-sm rounded mr-2 ${
                    task.completed
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
