import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Create Feedback Route
router.post('/create', async (req, res) => {
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

export default router;
