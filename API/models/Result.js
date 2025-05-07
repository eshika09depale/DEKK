import mongoose from 'mongoose';
//import ResultsList from './Result';
//const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true },
  score: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Result = mongoose.model('Result', resultSchema);
export default Result;