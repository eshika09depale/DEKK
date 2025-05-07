import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  videoLink: {
    type: String,
    required: true,
    match: [/^https?:\/\/.*$/, 'Please provide a valid video link'], // Validates the URL format
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming the course is created by a User (admin or instructor)
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
