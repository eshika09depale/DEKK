import mongoose from 'mongoose';

//const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  // Add other feedback-related fields here
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default feedbackSchema;