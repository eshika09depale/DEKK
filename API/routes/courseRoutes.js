import express from 'express';
import Course from '../models/Course.js'; // Adjust the import based on your project structure
import { authenticate } from '../middleware/auth.js';  // Use authenticate instead of isAuthenticated

const router = express.Router();

// POST route to create a new course
router.post('/add', authenticate, async (req, res) => {
  const { title, description, videoLink } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      videoLink,
      createdBy: req.user._id, // Assuming req.user holds the current authenticated user
    });

    // Save the course to the database
    await newCourse.save();

    res.status(201).json({ message: 'Course added successfully!' });
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ message: 'Error adding course' });
  }
});

export default router;
