import mongoose from 'mongoose';

//const mongoose = require('mongoose');

const libraryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String }, // Or any other field related to the item
});

const libraryItem =mongoose.model('LibraryItem', libraryItemSchema);

export default libraryItemSchema;