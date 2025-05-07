const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trims whitespace around the name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique in the database
    trim: true, // Trims whitespace around the email
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Example minimum password length
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    minlength: 10, // Example: Ensure phone number is at least 10 characters
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Role can only be 'user' or 'admin'
    default: 'user', // Default role is 'user'
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model to be used in other files
module.exports = User;
