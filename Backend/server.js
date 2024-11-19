const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { SignupCollection, UserCollection } = require('./config'); // Assuming models are in the config file

const app = express();

// Middleware
app.use(cors());  // Allow Cross-Origin Requests
app.use(express.json()); // To parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Captcha', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await SignupCollection.findOne({ name: username });

    if (existingUser) {
      return res.status(400).send("Username already exists!");
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save it
    const newUser = new SignupCollection({
      name: username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send("Signup successful!");
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send("An error occurred during signup.");
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await SignupCollection.findOne({ name: username });

    if (!user) {
      return res.status(404).send("Username not found!");
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Check if the user exists in UserCollection and create if not
      const existingUser = await UserCollection.findOne({ name: username });

      if (!existingUser) {
        const newUser = new UserCollection({
          name: username,
          coins: 10, // Set initial coins
        });
        await newUser.save();
      }

      res.status(200).send("Login successful!");
    } else {
      res.status(400).send("Incorrect password!");
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send("An error occurred during login.");
  }
});

// Add Coins Route (for example, after solving CAPTCHA)
app.post('/add-coins', async (req, res) => {
  try {
    const { username, coins } = req.body;

    // Find user and update coins
    const user = await UserCollection.findOne({ name: username });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    user.coins += coins;
    await user.save();

    res.status(200).send(`Coins added successfully! Current balance: ${user.coins}`);
  } catch (error) {
    console.error('Error adding coins:', error);
    res.status(500).send("An error occurred while adding coins.");
  }
});

// Server Setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
