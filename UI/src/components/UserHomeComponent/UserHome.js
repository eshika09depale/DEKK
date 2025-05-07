import './UserHome.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

// Course Component
const CourseSection = ({ courses, loading, error }) => (
  <div>
    <h3>Courses</h3>
    {loading ? <p>Loading courses...</p> : error ? <p>{error}</p> : (
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    )}
  </div>
);

// Quiz Component
const QuizSection = ({ quizzes, loading, error }) => (
  <div>
    <h3>Quizzes</h3>
    {loading ? <p>Loading quizzes...</p> : error ? <p>{error}</p> : (
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id}>{quiz.title}</li>
        ))}
      </ul>
    )}
  </div>
);

const UserHome = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [results, setResults] = useState([]);
  const [libraryItems, setLibraryItems] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [loadingResults, setLoadingResults] = useState(true);
  const [loadingLibrary, setLoadingLibrary] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);
  const [errorQuizzes, setErrorQuizzes] = useState(null);
  const [errorFeedbacks, setErrorFeedbacks] = useState(null);
  const [errorResults, setErrorResults] = useState(null);
  const [errorLibrary, setErrorLibrary] = useState(null);
  const [quizSubmissionStatus, setQuizSubmissionStatus] = useState(""); 

  useEffect(() => {
    // Fetch courses
    axios.get('http://localhost:5000/api/courses')
      .then(response => {
        setCourses(response.data);
        setLoadingCourses(false);
      })
      .catch(error => {
        setErrorCourses('Error fetching courses');
        setLoadingCourses(false);
        console.error('Error fetching courses:', error);
      });

    // Fetch quizzes
    axios.get('http://localhost:5000/api/quizzes')
      .then(response => {
        setQuizzes(response.data);
        setLoadingQuizzes(false);
      })
      .catch(error => {
        setErrorQuizzes('Error fetching quizzes');
        setLoadingQuizzes(false);
        console.error('Error fetching quizzes:', error);
      });

    // Fetch feedbacks
    axios.get('http://localhost:5000/api/feedback')
      .then(response => {
        setFeedbacks(response.data);
        setLoadingFeedbacks(false);
      })
      .catch(error => {
        setErrorFeedbacks('Error fetching feedback');
        setLoadingFeedbacks(false);
        console.error('Error fetching feedbacks:', error);
      });

    // Fetch results
    axios.get('http://localhost:5000/api/results')
      .then(response => {
        setResults(response.data);
        setLoadingResults(false);
      })
      .catch(error => {
        setErrorResults('Error fetching results');
        setLoadingResults(false);
        console.error('Error fetching results:', error);
      });

    // Fetch library items
    axios.get('http://localhost:5000/api/library')
      .then(response => {
        setLibraryItems(response.data);
        setLoadingLibrary(false);
      })
      .catch(error => {
        setErrorLibrary('Error fetching library items');
        setLoadingLibrary(false);
        console.error('Error fetching library items:', error);
      });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render Home Tab
  const renderHomeTab = () => (
    <div>
      <h2>Welcome to Your Home Page!</h2>
      <p>Click on the tabs to explore Courses, Quizzes, Library, Feedback, and Results.</p>
    </div>
  );

  // Render Courses Tab
  const renderCoursesTab = () => (
    <CourseSection courses={courses} loading={loadingCourses} error={errorCourses} />
  );

  // Render Quizzes Tab
  const renderQuizzesTab = () => (
    <QuizSection quizzes={quizzes} loading={loadingQuizzes} error={errorQuizzes} />
  );

  // Render Library Tab
  const renderLibraryTab = () => (
    <div>
      <h2>Your Library</h2>
      {loadingLibrary ? <p>Loading library items...</p> : errorLibrary ? <p>{errorLibrary}</p> : (
        <ul>
          {libraryItems.map(item => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );

  // Render Feedback Tab
  const renderFeedbackTab = () => (
    <div>
      <h2>Your Feedback</h2>
      {loadingFeedbacks ? <p>Loading feedback...</p> : errorFeedbacks ? <p>{errorFeedbacks}</p> : (
        <ul>
          {feedbacks.map(feedback => (
            <li key={feedback._id}>{feedback.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );

  // Render Results Tab
  const renderResultsTab = () => (
    <div>
      <h2>Your Results</h2>
      {loadingResults ? <p>Loading results...</p> : errorResults ? <p>{errorResults}</p> : (
        <ul>
          {results.map(result => (
            <li key={result._id}>
              <span>{result.quizTitle}</span> - <span>{result.score}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="user-home-container">
      <div className="tabs">
        <button onClick={() => handleTabChange("home")}>Home</button>
        <button onClick={() => handleTabChange("courses")}>Courses</button>
        <button onClick={() => handleTabChange("quizzes")}>Quizzes</button>
        <button onClick={() => handleTabChange("library")}>Library</button>
        <button onClick={() => handleTabChange("feedback")}>Feedback</button>
        <button onClick={() => handleTabChange("results")}>Results</button>
      </div>

      <div className="tab-content">
        {activeTab === "home" && renderHomeTab()}
        {activeTab === "courses" && renderCoursesTab()}
        {activeTab === "quizzes" && renderQuizzesTab()}
        {activeTab === "library" && renderLibraryTab()}
        {activeTab === "feedback" && renderFeedbackTab()}
        {activeTab === "results" && renderResultsTab()}
      </div>

      {quizSubmissionStatus && <p>{quizSubmissionStatus}</p>} {/* Display submission status */}
    </div>
  );
};

export default UserHome;
