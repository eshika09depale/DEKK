import User from '../models/user.model.js';
import Course from '../models/Course.js';
import Library from '../models/LibraryItem.js';
import Quiz from '../models/Quiz.js';
//import Result from '../models/Result.js';
//import Feedback from '../models/Feedback.js';
import Activity from '../models/ActivityLog.js'; // Activity log model import

// ✅ Log activity
const logActivity = async (type, description) => {
  try {
    await Activity.create({
      type,
      description,
      time: new Date(),
    });
  } catch (err) {
    console.error('Error logging activity:', err.message);
  }
};

// ✅ Get dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const courseCount = await Course.countDocuments();
    const quizCount = await Quiz.countDocuments();
    
    const feedbackCount = 50; // Temporary placeholder

    res.json({
      userCount,
      courseCount,
      quizCount,
      feedbackCount,
    });
  } catch (err) {
    console.error('❌ Error in getAdminStats:', err.message);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

// ✅ Get recent users
export const getRecentUsers = async (req, res) => {
  try {
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');

    res.json(recentUsers);
  } catch (err) {
    console.error('❌ Error in getRecentUsers:', err.message);
    res.status(500).json({ message: 'Error fetching recent users' });
  }
};

// ✅ Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ time: -1 })
      .limit(5);

    res.json(activities);
  } catch (err) {
    console.error('❌ Error in getRecentActivities:', err.message);
    res.status(500).json({ message: 'Error fetching recent activities' });
  }
};

// ✅ Add new user
export const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    logActivity('success', `User ${name} added.`);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('❌ Error adding user:', err.message);
    res.status(500).json({ message: 'Error adding user' });
  }
};

// ✅ Add new course
export const addCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newCourse = new Course({
      title,
      description,
    });

    await newCourse.save();
    logActivity('success', `Course "${title}" added.`);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('❌ Error adding course:', err.message);
    res.status(500).json({ message: 'Error adding course' });
  }
};

// ✅ Add new quiz
export const addQuiz = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const newQuiz = new Quiz({
      title,
      questions,
    });

    await newQuiz.save();
    logActivity('success', `Quiz "${title}" created.`);
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error('❌ Error adding quiz:', err.message);
    res.status(500).json({ message: 'Error adding quiz' });
  }
};

// ✅ Delete course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const deleted = await Course.findByIdAndDelete(courseId);
    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }

    logActivity('success', `Course "${deleted.title}" deleted.`);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting course:', err.message);
    res.status(500).json({ message: 'Error deleting course' });
  }
};

// ✅ Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error('❌ Error in getAllCourses:', err.message);
    res.status(500).json({ message: 'Error fetching all courses' });
  }
};

// ✅ Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error('❌ Error in getAllQuizzes:', err.message);
    res.status(500).json({ message: 'Error fetching all quizzes' });
  }
};

//library 
export const addLibraryItem = async (req, res) => {
  const { title, url, description } = req.body;

  if (!title || !url || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newLibraryItem = new Library({ title, url, description });
    await newLibraryItem.save();
    logActivity('success', `Library item "${title}" added.`);
    res.status(201).json(newLibraryItem);
  } catch (err) {
    console.error('❌ Error adding library item:', err.message);
    res.status(500).json({ message: 'Error adding library item' });
  }
};

export const getAllLibraryItems = async (req, res) => {
  try {
    const items = await Library.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('❌ Error fetching library items:', err.message);
    res.status(500).json({ message: 'Error fetching library items' });
  }
};
