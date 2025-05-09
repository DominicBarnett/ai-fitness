const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');

// Register new user
router.post('/register', async (req, res) => {
  console.log('Received registration request');
  
  try {
    // Log request data (excluding password)
    const { name, email, password } = req.body;
    console.log('Registration attempt with data:', { name, email, password: '[REDACTED]' });

    // Validate required fields
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Validate password length
    if (password.length < 8) {
      console.log('Password too short');
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long' 
      });
    }

    // Check if user already exists
    console.log('Checking for existing user with email:', email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    console.log('Creating new user...');
    const user = new User({
      name,
      email,
      password
    });

    // Save user with error handling
    try {
      await user.save();
      console.log('User created successfully:', { id: user._id, email: user.email });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      if (saveError.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error',
          details: Object.values(saveError.errors).map(err => err.message)
        });
      }
      throw saveError;
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    let token;
    try {
      token = generateToken(user._id);
      console.log('Token generated successfully');
    } catch (tokenError) {
      console.error('Error generating token:', tokenError);
      throw new Error('Failed to generate authentication token');
    }

    // Send response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Registration error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Send appropriate error response
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Error registering user',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Sign in user
router.post('/login', async (req, res) => {
  console.log('Received login request');
  
  try {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);

    // Validate required fields
    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    console.log('Login successful for user:', { id: user._id, email: user.email });
    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error signing in',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 