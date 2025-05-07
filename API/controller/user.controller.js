import '../models/connection.js';
import url from 'url';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import userSchemaModel from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config(); // Make sure to load environment variables

// Save a new user
export const save = async (req, res) => {
  try {
    // Validate the required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: false, error: 'Missing required fields' });
    }

    const users = await userSchemaModel.find();
    const _id = users.length === 0 ? 1 : users[users.length - 1]._id + 1;
    const userDetail = {
      ...req.body,
      _id,
      role: 'user',
      status: 0,
      info: Date(),
    };

    await userSchemaModel.create(userDetail);
    res.status(201).json({ status: true });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

// Fetch users with optional query parameters
export const fetch = async (req, res) => {
  const condition_obj = url.parse(req.url, true).query;

  try {
    // Sanitize input query before querying the database
    const sanitizedCondition = sanitizeInput(condition_obj);
    
    const users = await userSchemaModel.find(sanitizedCondition);
    if (users.length !== 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ msg: 'No users found matching the given criteria' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Update user by condition_obj
export const update = async (req, res) => {
  try {
    const { condition_obj, content_obj } = req.body;
    if (!condition_obj || !content_obj) {
      return res.status(400).json({ msg: 'Missing condition_obj or content_obj in the request body' });
    }

    const user = await userSchemaModel.findOne(condition_obj);
    if (user) {
      const result = await userSchemaModel.updateOne(
        condition_obj,
        { $set: content_obj }
      );
      if (result.modifiedCount > 0) {
        res.status(200).json({ msg: 'User updated successfully' });
      } else {
        res.status(400).json({ msg: 'No changes made to the user' });
      }
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Delete a user by condition
export const deleteUser = async (req, res) => {
  try {
    const user = await userSchemaModel.findOne(req.body);
    if (user) {
      const result = await userSchemaModel.deleteOne(req.body);
      if (result.deletedCount > 0) {
        res.status(200).json({ msg: 'User deleted successfully' });
      } else {
        res.status(400).json({ msg: 'User not deleted' });
      }
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const condition_obj = { email, password };

  try {
    const user = await userSchemaModel.find(condition_obj);
    if (user.length !== 0) {
      const payload = { subject: user[0].email };
      const key = process.env.JWT_SECRET_KEY || rs.generate(); // Use secret key from environment or fallback
      const token = jwt.sign(payload, key);

      res.status(200).json({
        token,
        role: user[0].role === 'admin' ? 'admin' : 'user',
        name: user[0].name,
      });
    } else {
      res.status(401).json({
        message: 'Invalid email or password.',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Test Profile Endpoint (optional)
export const getProfile = (req, res) => {
  res.json({ message: 'Hello from getProfile!' });
};

// Function to sanitize input (basic example)
const sanitizeInput = (input) => {
  // Sanitize the input query to avoid malicious inputs
  const sanitized = {};
  for (const key in input) {
    if (input[key]) {
      sanitized[key] = input[key].toString().trim();
    }
  }
  return sanitized;
};
