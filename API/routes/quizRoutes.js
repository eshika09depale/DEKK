import express from 'express';
import Quiz from '../models/Quiz.js'; // Ensure the path to the Quiz model is correct

const router = express.Router();

// POST route for creating a quiz
router.post('/create', async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    // Validation - Ensure all required fields are present
    if (!title || !description || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'Title, description, and questions are required' });
    }

    // Ensure that questions is an array
    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: 'Questions must be an array' });
    }

    // Create new quiz
    const newQuiz = new Quiz({
      title,
      description,
      questions
    });

    // Save quiz in the database
    await newQuiz.save();

    // Respond with the created quiz data
    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: newQuiz
    });
  } catch (err) {
    console.error('Error creating quiz:', err); // Log the error for debugging
    res.status(500).json({ error: 'Error creating quiz' });
  }
});

// GET route to fetch all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // Fetch all quizzes from the database
    res.json(quizzes); // Send quizzes as the response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching quizzes' });
  }
});

// GET route to fetch a single quiz by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Get quiz ID from the route parameters
  try {
    const quiz = await Quiz.findById(id); // Find the quiz by its ID
    if (quiz) {
      res.json(quiz); // If quiz is found, send it as the response
    } else {
      res.status(404).json({ error: 'Quiz not found' }); // Quiz not found
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching quiz' });
  }
});

// PUT route to update a quiz by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get quiz ID from the URL parameters
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true }); // Update quiz with request body data
    if (updatedQuiz) {
      res.json({ message: 'Quiz updated successfully', quiz: updatedQuiz }); // Return updated quiz
    } else {
      res.status(404).json({ error: 'Quiz not found' }); // If quiz not found, send error
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating quiz' });
  }
});

// DELETE route to delete a quiz by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get quiz ID from the URL parameters
  try {
    const result = await Quiz.findByIdAndDelete(id); // Delete quiz from the database
    if (result) {
      res.json({ message: 'Quiz deleted successfully' }); // If quiz deleted, return success message
    } else {
      res.status(404).json({ error: 'Quiz not found' }); // If quiz not found, send error
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting quiz' });
  }
});

export default router;
