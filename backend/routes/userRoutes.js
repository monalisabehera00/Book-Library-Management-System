const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route POST api/users/register
// @desc Register new user
// @access Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
       let user = await User.findOne({ email });
       if (user) {
           return res.status(400).json({ msg: 'User already exists' });
       }
       
       // Create new user (password hashing is handled in the User model)
       user = new User({
           name,
           email,
           password,
       });
       await user.save();

       // create jwt payload
       const payload = {
           user: {
               id: user._id,
               role: user.role,
           },
       };

       //sign and return the token along with the user data
       jwt.sign(
           payload,
           process.env.JWT_SECRET,
           { expiresIn: "40h" },
           (err, token) => {
               if (err) throw err;
               // send token and user data
               res.status(201).json({
                   user: {
                       _id: user._id,
                       name: user.name,
                       email: user.email,
                       role: user.role,
                   },
                   token,
               });
           }
       );

    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
       let user = await User.findOne({ email }); 
       if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
       // Use the User model's method to check password
       const isMatch = await user.matchPassword(password);

       if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

       // create jwt payload
       const payload = {
           user: {
               id: user._id,
               role: user.role,
           },
       };
    //sign and return the token along with the user data
       jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "40h" },
        (err, token) => {
            if (err) throw err;
            // send token and user data
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        }
    );
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error });
    }
});

// @route GET api/users/profile
// @desc Get logged in user profile (protected route)
// @access Private
router.get('/profile', protect, async (req, res) => {
    res.json(req.user);
    
})

module.exports = router;
