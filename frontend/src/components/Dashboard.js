import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const token = sessionStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/tasks/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/tasks/tasks",
        { title, description, status, due_date: dueDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;

      const updatedData = {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        due_date: taskToUpdate.due_date,
        status: newStatus,
      };

      console.log("Updating task:", updatedData);

      await axios.put(`http://127.0.0.1:8000/tasks/tasks/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const TaskCard = ({ task }) => (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text">
          <small>
            Due: {task.due_date ? task.due_date.split("T")[0] : "N/A"}
          </small>
          <br />
          <small>
            Created:{" "}
            {task.created_at
              ? new Date(task.created_at).toLocaleString()
              : "N/A"}
          </small>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <select
              className="form-select form-select-sm me-2"
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const filteredTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Dashboard</h2>
        <button className="btn btn-outline-dark" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form
        onSubmit={handleAddTask}
        className="mb-4 shadow p-4 rounded bg-light"
      >
        <h4>Add Task</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Task Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100">Add Task</button>
          </div>
        </div>
      </form>

      <div className="row">
        {["Pending", "In Progress", "Completed"].map((section) => (
          <div key={section} className="col-md-4">
            <h5 className="text-center">{section} Tasks</h5>
            {filteredTasks(section).length > 0 ? (
              filteredTasks(section).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p className="text-muted text-center">
                No {section.toLowerCase()} tasks
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
