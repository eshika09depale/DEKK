import express from 'express';
const router = express.Router();

// Import the User model and userController
import User from '../models/user.model.js';
import * as userController from '../controller/user.controller.js';

// POST route to save a new user
router.post("/save", userController.save);

// GET route to fetch users
router.get("/fetch", userController.fetch);

// PATCH route to update user information
router.patch("/update", userController.update);

// DELETE route to delete a user
router.delete("/delete", userController.deleteUser);

// POST route to handle user login
router.post("/login", userController.login);

// ✅ New route: Get all users (excluding password field)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field for security
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, contact, address, city, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields: name, email, password, role." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,  // Password hashing will be handled in the user model via pre-save hook
      contact,
      address,
      city,
      role
    });

    // Save new user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.delete('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Deleting user with ID: ${userId}`); // Log user deletion request

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
