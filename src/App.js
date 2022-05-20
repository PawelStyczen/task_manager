import Header from "./components/Header";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { FaAsterisk } from "react-icons/fa";

import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const addTask = async (task) => {
    /*     console.log(text, day, reminder);
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id: id, text: text, day: day, reminder: reminder };
    setTasks([...tasks, newTask]); */

    //? send newly created task to BACKEND
    const res = await fetch(`http://localhost:3001/tasks/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    //? wait for response and store it as json in variable
    const data = await res.json();

    //? UPDATE UI with the data from API
    setTasks([...tasks, data]);
  };

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const removeTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    //? setting the task state again with filtering out the id that was clicked.
    //? we do not mutate the state hence any change need the state to be re written.
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    //? fetch the task from API
    const taskToToggle = await fetchTask(id);

    //? change the reminder value of the task and store it in a temp const
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    //? send the updated reminder to API
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    //? wait till update
    const data = await res.json();

    console.log(id);
    //* UPDATE UI
    //? go trough all tasks, if task id matches the clicked id the task.reminder should be toggeld,
    //? if not it should be left alone
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          toggleShowAddTask={toggleShowAddTask}
          showAddTask={showAddTask}
        ></Header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask ? <AddTask onAdd={addTask} /> : null}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={removeTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <h3>
                    no tasks click test <b>Add</b> to create new tasks
                  </h3>
                )}
              </>
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
