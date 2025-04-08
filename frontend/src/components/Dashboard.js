import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const token = sessionStorage.getItem('token');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/tasks/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(
        'http://localhost:8000/tasks/tasks',
        {
          title,
          description,
          status,
          due_date: dueDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setDueDate('');
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Your Task Dashboard</h2>

      {/* Add Task Section */}
      <div className="bg-white shadow-md p-6 mb-8 rounded-lg grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          className="border border-gray-300 p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          className="border border-gray-300 p-2 rounded"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md col-span-full md:col-span-1"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-1 text-gray-800">{task.title || "Untitled Task"}</h3>
            <p className="text-gray-600 mb-2">{task.description || "No description"}</p>

            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
              <div>
                <span className="font-medium text-gray-700">Status:</span>{' '}
                <span className={`inline-block px-2 py-1 rounded-full text-white text-xs ${
                  task.status === 'Completed' ? 'bg-green-600' :
                  task.status === 'In Progress' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  {task.status}
                </span>
              </div>
              <div>
                <span className="font-medium">Due:</span> {formatDate(task.due_date)}
              </div>
              <div>
                <span className="font-medium">Created:</span> {formatDate(task.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
