const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Registration logic including hashing password
router.post('/register', async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create a new user instance
        const user = new User({ username, email, password });

        // Save the user to the database
        await user.save();

        // Send success response
        res.status(201).send('User registered successfully');
    } catch (error) {
        // Handle potential errors
        res.status(500).send('Server error');
    }
});


// Login logic including verifying password and generating JWT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token });
});





module.exports = router;
