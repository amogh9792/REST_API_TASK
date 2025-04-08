import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/tasks/tasks', {
        title,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleSubmit}>
        <input className="border w-full p-2 mb-2" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="border w-full p-2 mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button className="bg-green-500 text-white px-4 py-2" type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateTask;