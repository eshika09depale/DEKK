import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: { 
    type: String, 
    required: true 
  },
  contact: String,
  address: String,
  city: String,
  role: { 
    type: String, 
    required: true,
    enum: ['admin', 'user'], // Restrict roles to admin and user
  },
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password for login
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};

// Export the User model
const User = mongoose.model('User', userSchema);
export default User;
