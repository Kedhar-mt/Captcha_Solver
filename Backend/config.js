const mongoose = require('mongoose');

// MongoDB connection string (replace with your own MongoDB URI if needed)
const connect = mongoose.connect('mongodb://localhost:27017/Captcha');

connect.then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

// Create the schema for the signup collection
const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Define the model for the 'signup' collection
const SignupCollection = mongoose.model('signup', SignupSchema);

// Create the schema for the users collection (for logged-in users)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    default: 0 // Initialize coins as 0 for new users
  }
});

// Define the model for the 'users' collection
const UserCollection = mongoose.model('users', UserSchema);

// Export the models for use in server.js
module.exports = { SignupCollection, UserCollection };
