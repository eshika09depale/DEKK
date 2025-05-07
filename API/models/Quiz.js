import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true, // Ensure each question has a text
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => v.length >= 2, // Ensure at least two options
      message: 'A question must have at least two options'
    }
  },
  correctAnswer: {
    type: String,
    required: true,
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Quiz title cannot be more than 100 characters']
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: (v) => v.length > 0, // Ensure at least one question
      message: 'A quiz must have at least one question'
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model if quizzes are created by an admin or instructor
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'], // Track quiz status
    default: 'draft'
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
