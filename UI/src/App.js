import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/NavComponent/Nav';
import Home from './components/HomeComponent/Home';
import About from './components/AboutComponent/About';
import Service from './components/ServiceComponent/Service';
import Contact from './components/ContactComponent/Contact';
import Register from './components/RegisterComponent/Register';
import Login from './components/LoginComponent/Login';
import AdminHome from './components/AdminHomeComponent/AdminHome';
import UserHome from './components/UserHomeComponent/UserHome';
import Profile from './components/ProfileComponent/Profile';
import UserSideBar from './components/UserSideBarCompnonet/UserSideBar';
{/*import Student from './pages/admin/Student';
import Course from './pages/admin/Course';
import Elibrary from './pages/admin/Elibrary';
import Quizess from './pages/admin/Quizess';
import Result from './pages/admin/Result';
import Feedback from './pages/admin/Feedback';
import UserCourse from './pages/user/UserCourse';
import UserElibrary from './pages/user/UserElibrary';
import UserQuizzes from './pages/user/UserQuizzes';
import UserResult from './pages/user/UserResult';
import UserFeedback from './pages/user/UserFeedback';
import UserProfile from './pages/user/UserProfile';*/}
//import Logout from './components/LogoutComponent/Logout';
//import './';

function App() {
  return (
    <>
    <Nav />
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/profile" element={<Profile />} />
          {/*<Route path="/student" element={<Student />} />
          <Route path="/course" element={<Course />} />
          <Route path="/elibrary" element={<Elibrary />} />
          <Route path="/quizess" element={<Quizess />} />
          <Route path="/result" element={<Result />} />
          <Route path="/feedback" element={<Feedback />} />*/}
          
          {/* User Routes */}
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/usersidebar" element={<UserSideBar />} />
          {/*<Route path="/user/course" element={<UserCourse />} />
          <Route path="/user/elibrary" element={<UserElibrary />} />
          <Route path="/user/quizzes" element={<UserQuizzes />} />
          <Route path="/user/result" element={<UserResult />} />
          <Route path="/user/feedback" element={<UserFeedback />} />
          <Route path="/user/profile" element={<UserProfile />} />
          
          <Route path="/logout" element={<Logout />} />*/}
        </Routes>
      </div>
    </>
  );
}

export default App;