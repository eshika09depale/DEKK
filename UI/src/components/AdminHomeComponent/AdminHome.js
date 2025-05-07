import './AdminHome.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Result from '../ResultComponent/Result';

// Stats Card Component
const StatsCard = ({ title, count, color, icon }) => (
  <div className="col-md-3 mb-4">
    <div className={`card border-0 shadow-sm stats-card bg-${color} text-white`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{title}</h5>
          <h2 className="mb-0 counter">{count !== null ? count : '-'}</h2>
        </div>
        <div className="icon">{icon}</div>
      </div>
    </div>
  </div>
);

// Quick Actions Component
const QuickActions = ({ onAction }) => (
  <div className="card shadow-sm mb-4">
    <div className="card-header bg-white">
      <h5 className="mb-0">Quick Actions</h5>
    </div>
    <div className="card-body">
      <div className="d-flex flex-wrap gap-2">
        <button onClick={() => onAction('userlist')} className="btn btn-outline-primary">User List</button>
        <button onClick={() => onAction('addCourse')} className="btn btn-outline-success">Create Course</button>
        <button onClick={() => onAction('addLibrary')} className="btn btn-outline-success">Create Library</button>
        <button onClick={() => onAction('createQuiz')} className="btn btn-outline-warning">Create Quiz</button>
        <button onClick={() => onAction('viewResults')} className="btn btn-outline-secondary">View Results</button>
        <button onClick={() => onAction('viewFeedback')} className="btn btn-outline-info">View Feedback</button>
      </div>
    </div>
  </div>
);

// Create Course Form
const CreateCourseForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault(); // पेज रीलोड रोकें
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token'); // अपने token key के अनुसार बदलें
    if (!token) {
      setError('You must be logged in to add a course.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/courses/add',
        { title, description, videoLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('Course added successfully!');
      setTitle('');
      setDescription('');
      setVideoLink('');
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding course');
    }
  };

  
  return (
    <div className="form-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Video Link</label>
          <input
            type="url"
            className="form-control"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Course
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
    </div>
  );
};

// Create Library Form
const CreateLibraryForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/library/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Library added successfully!');
      setTitle('');
      setFile(null);
      onClose();
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Error adding course');
    }
  };

  return (
    <div className="form-container">
    <h2>Create Library</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Course Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Upload Description File</label>
        <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} required />
      </div>
      <button type="submit" className="btn btn-primary">Create Library</button>
      <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </form>
  </div>
);
};

// Create Quiz Form
const CreateQuizForm = ({ onClose }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quizzes/create', { title: quizTitle, questions });
      alert('Quiz created successfully!');
      setQuizTitle('');
      setQuestions(['']);
      onClose();
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Error creating quiz');
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  return (
    <div className="form-container">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Quiz Title</label>
          <input type="text" className="form-control" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} required />
        </div>
        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">Question {index + 1}</label>
            <input type="text" className="form-control" value={question} onChange={(e) => handleQuestionChange(index, e.target.value)} required />
          </div>
        ))}
        <button type="button" className="btn btn-outline-secondary" onClick={addQuestion}>Add Question</button>
        <button type="submit" className="btn btn-primary">Create Quiz</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

// User List Component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Replace with your correct backend route
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`); // Make sure this URL matches the backend route
        fetchUsers(); // Refresh user list
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };
  
  

  const handleEdit = (userId) => {
    // Open an edit form or modal here
    const userToEdit = users.find(user => user._id === userId);
    setEditingUser(userToEdit);
  };

  const handleSave = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser); // Update backend with new data
      setEditingUser(null); // Close edit form/modal
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleCancel = () => {
    setEditingUser(null); // Close the edit form/modal without saving
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.address}</td>
                <td>{user.contact}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-primary me-2" 
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(editingUser);
            }}
          >
            <div>
              <label>Name:</label>
              <input 
                type="text" 
                value={editingUser.name} 
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                value={editingUser.email} 
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              />
            </div>
            <div>
              <label>Password:</label>
              <input 
                type="password" 
                value={editingUser.password} 
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              />
            </div>
            <div>
              <label>Address:</label>
              <input 
                type="text" 
                value={editingUser.address} 
                onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
              />
            </div>
            <div>
              <label>Contact:</label>
              <input 
                type="text" 
                value={editingUser.contact} 
                onChange={(e) => setEditingUser({ ...editingUser, contact: e.target.value })}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};



// Admin Results List Component
const AdminResultList = () => {
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({
    userName: '',
    quizTitle: '',
    score: '',
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching results:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult({ ...newResult, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/results', newResult);
      setNewResult({ userName: '', quizTitle: '', score: '' }); // clear form
      fetchResults(); // refresh list
    } catch (err) {
      console.error('Error submitting result:', err);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-white">
        <h5 className="mb-0">Submit Result</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="User Name"
                value={newResult.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="quizTitle"
                className="form-control"
                placeholder="Quiz Title"
                value={newResult.quizTitle}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                name="score"
                className="form-control"
                placeholder="Score"
                value={newResult.score}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit Result
          </button>
        </form>

        <h5 className="mb-3">All Quiz Results</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Quiz Title</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  <td>{result.userName}</td>
                  <td>{result.quizTitle}</td>
                  <td>{result.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};




const AdminFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    userName: '',
    comment: '',
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', newFeedback);
      setNewFeedback({ userName: '', comment: '' }); // Clear form
      fetchFeedbacks(); // Refresh list
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-white">
        <h5 className="mb-0">Submit Feedback</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="User Name"
                value={newFeedback.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-8">
              <input
                type="text"
                name="comment"
                className="form-control"
                placeholder="Feedback Comment"
                value={newFeedback.comment}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Submit Feedback
          </button>
        </form>

        <h5 className="mb-3">User Feedback</h5>
        <ul className="list-group">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <li key={feedback._id} className="list-group-item">
                <p className="mb-1">{feedback.comment}</p>
                <small className="text-muted">— {feedback.userName}</small>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">No feedback available yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};


// Main Admin Home Component
const AdminHome = () => {
  const [adminName, setAdminName] = useState('');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stats, setStats] = useState({
    userCount: null,
    courseCount: null,
    quizCount: null,
    feedbackCount: null,
  });
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    if (storedName) setAdminName(storedName);
    else setAdminName('Admin');

    // Fetch stats
    axios.get('http://localhost:5000/api/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Error fetching stats:', err))
      .finally(() => setLoading(false));

    // Fetch users
    axios.get('http://localhost:5000/api/users')
      .then((res) => setUserList(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleQuickAction = (action) => {
    setShowCourseForm(false);
    setShowLibrary(false);
    setShowQuizForm(false);
    setShowUserList(false);
    setShowResults(false);
    setShowFeedback(false);

    switch (action) {
      case 'userlist':
        setShowUserList(true);
        break;
      case 'addCourse':
        setShowCourseForm(true);
        break;
      case 'addLibrary':
        setShowLibrary(true); // Show Library when this action is triggered
        break;
      case 'createQuiz':
        setShowQuizForm(true);
        break;
        case 'viewResults':
          setShowResults(true);
          break;
        case 'viewFeedback':
          setShowFeedback(true);
          break;
      case 'viewReports':
        console.log('Navigating to reports');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {adminName} 👋</h2>
      </div>

      <div className="row mb-4">
        <StatsCard title="Total Users" count={userList.length} color="primary" icon={<i className="bi bi-people-fill fs-1" />} />
        <StatsCard title="Total Courses" count={stats.courseCount} color="success" icon={<i className="bi bi-book-fill fs-1" />} />
        <StatsCard title="Total Quizzes" count={stats.quizCount} color="warning" icon={<i className="bi bi-question-circle-fill fs-1" />} />
        <StatsCard title="Total Feedback" count={stats.feedbackCount} color="info" icon={<i className="bi bi-chat-dots-fill fs-1" />} />
      </div>

      <QuickActions onAction={handleQuickAction} />

      {showCourseForm && <CreateCourseForm onClose={() => setShowCourseForm(false)} />}
      {showLibrary && <CreateLibraryForm onClose={() => setShowLibrary(false)} />}
      {showQuizForm && <CreateQuizForm onClose={() => setShowQuizForm(false)} />}
      {showUserList && <UserList />}
      {showResults && <AdminResultList />}
      {showFeedback && <AdminFeedbackList />}
    </div>
  );
};

export default AdminHome;
