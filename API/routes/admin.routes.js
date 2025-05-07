import express from 'express';
import {
  getAdminStats,
  getRecentUsers,
  getRecentActivities,
  addCourse,
  getAllCourses,
  deleteCourse,
  addQuiz,
  getAllQuizzes,
  addLibraryItem,        // ✅ Import the new controller
  getAllLibraryItems     // ✅ Optional: to fetch all library items
} from '../controller/admin.controller.js';

const router = express.Router();

// Admin dashboard stats & activities
router.get('/stats', getAdminStats);
router.get('/recent-users', getRecentUsers);
router.get('/recent-activities', getRecentActivities);

// Course management
router.post('/add-course', addCourse);
router.get('/courses', getAllCourses);
router.delete('/course/:id', deleteCourse);

// Quiz management
router.post('/add-quiz', addQuiz);
router.get('/quizzes', getAllQuizzes);

// ✅ Library management
router.post('/add-library', addLibraryItem);
router.get('/library', getAllLibraryItems); // Optional, for viewing all library items

export default router;
