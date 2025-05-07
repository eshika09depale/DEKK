import express from 'express';
import Result from '../models/Result.js';

const router = express.Router();

// Create Result Route
router.post('/create', async (req, res) => {
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

export default router;
