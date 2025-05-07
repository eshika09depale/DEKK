import './Course.css';

import React, { useState } from 'react';
import axios from 'axios';

// Create Course Form
const CreateCourseForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoLink', videoLink);
try {
      await axios.post('http://localhost:5000/api/courses/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Course added successfully!');
      setTitle('');
      setDescription('');
      setVideoLink('');
      onClose();
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Error adding course');
    }
  };
  return (
    <div className="form-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Description</label>
          <textarea 
            className="form-control" 
            value={description} onChange={(e) => setDescription(e.target.value)}  required ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Video Link</label>
          <input 
            type="url" className="form-control" value={videoLink} onChange={(e) => setVideoLink(e.target.value)}  required />
        </div>
        <button type="submit" className="btn btn-primary">Create Course</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button> </form></div>
  );};

export default Course;

