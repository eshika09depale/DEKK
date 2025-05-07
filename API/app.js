import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv to handle environment variables
import { authenticate } from './middleware/auth.js';
// Import models and routes
import Course from './models/Course.js';
import Quiz from './models/Quiz.js';
import User from './models/user.model.js';
import libraryRoutes from './routes/library.routes.js';
import resultRoutes from './routes/result.routes.js';
import userRouter from './routes/user.router.js';
import adminRoutes from './routes/admin.routes.js';
import courseRoutes from './routes/courseRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import Feedback from './models/Feedback.js';
import LibraryItem from './models/LibraryItem.js';
import Result from './models/Result.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port or default to 5000

// 📁 add 'uploads' directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📂 Make uploads accessible via URL
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 📸 Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// 📦 API Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/results", resultRoutes);

// 🚀 Upload Course Route
app.post('/api/courses/add', authenticate, async (req, res)=> {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Please upload a file.' });
  }

  try {
    const newCourse = new Course({
      title,
      descriptionFilePath: `/uploads/${file.filename}` // Relative path only
    });

    const savedCourse = await newCourse.save();
    res.status(200).json({
      message: 'Course saved successfully!',
      course: savedCourse
    });
  } catch (err) {
    console.error('❌ Error saving course:', err);
    res.status(500).json({ message: 'Error saving course' });
  }
});

// 🚀 add Quiz Route
app.post('/api/quizzes/add', async (req, res) => {
  const { title, description, questions } = req.body;

  if (!title || !description || !questions || questions.length === 0) {
    return res.status(400).json({ error: 'Title, description, and questions are required' });
  }

  try {
    const newQuiz = new Quiz({
      title,
      description,
      questions
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json({
      message: 'Quiz addd successfully!',
      quiz: savedQuiz
    });
  } catch (err) {
    console.error('❌ Error creating quiz:', err);
    res.status(500).json({ error: 'Error creating quiz' });
  }
});

// 🚀 Get Users Route (Newly added)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from user data
    res.status(200).json(users); // Return the list of users
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 🚀 add Feedback Route
app.post('/api/feedback/add', async (req, res) => {
  const { userId, courseId, feedback } = req.body;

  if (!userId || !courseId || !feedback) {
    return res.status(400).json({ error: 'User ID, Course ID, and Feedback are required' });
  }

  try {
    const newFeedback = new Feedback({
      userId,
      courseId,
      feedback
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({
      message: 'Feedback saved successfully!',
      feedback: savedFeedback
    });
  } catch (err) {
    console.error('❌ Error saving feedback:', err);
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

// 🚀 add Result Route
app.post('/api/results/add', async (req, res) => {
  const { userId, quizId, score } = req.body;

  if (!userId || !quizId || score == null) {
    return res.status(400).json({ error: 'User ID, Quiz ID, and Score are required' });
  }

  try {
    const newResult = new Result({
      userId,
      quizId,
      score
    });

    const savedResult = await newResult.save();
    res.status(201).json({
      message: 'Result saved successfully!',
      result: savedResult
    });
  } catch (err) {
    console.error('❌ Error saving result:', err);
    res.status(500).json({ error: 'Error saving result' });
  }
});

// 🚀 add Library Item Route
app.post('/api/library/add', upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file || !title || !description) {
    return res.status(400).json({ error: 'File, title, and description are required' });
  }

  try {
    const newLibraryItem = new LibraryItem({
      title,
      description,
      filePath: `/uploads/${file.filename}` // Store relative path
    });

    const savedLibraryItem = await newLibraryItem.save();
    res.status(201).json({
      message: 'Library item added successfully!',
      libraryItem: savedLibraryItem
    });
  } catch (err) {
    console.error('❌ Error saving library item:', err);
    res.status(500).json({ error: 'Error saving library item' });
  }
});

// 🏠 Default route
app.get("/", (req, res) => {
  res.send("API Server is running...");
});

// 🛠️ MongoDB Connection Handling
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Skill-Quick', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

  // Update user by ID
app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// 🚀 Delete User Route
app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});


// Other routes here...
const handleSave = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUserData);
    console.log('User updated successfully:', response.data);
    // You can now update the state or show a success message
  } catch (error) {
    console.error('Error updating user:', error);
  }
};


// Start server
app.listen(5000);
console.log("Server listen at link :http://localhost:5000");