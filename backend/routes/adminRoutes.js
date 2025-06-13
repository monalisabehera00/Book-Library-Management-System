const express = require('express');
const User = require('../models/User');
const { protect, admin} = require('../middleware/authMiddleware');

const router = express.Router();

//@route GET api/admin/users
//@desc Get all users
//@access Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route post api/admin/users
// @desc Create a new user
// @access Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body; 

    try {
        let user = await User.findOne({ email }); 
        if (user) {
            return res.status(400).json({ msg: 'User already exists' }); 
        }
        user = new User({
            name,
            email,
            password,
            role: role || 'customer' 
        });
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }


        await user.save();
        res.status(201).json({ msg: 'User created successfully', user  });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route put api/admin/users/:id
// @desc Update a user information- name, email, role
// @access Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
   try {
        const user = await User.findById(req.params.id); 
        if (user) {
           user.name = req.body.name || user.name;
           user.email = req.body.email || user.email;
           user.role = req.body.role || user.role;
        }
        const updatedUser = await user.save();
        res.json({ msg: 'User updated successfully', user: updatedUser });
   } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
   }
});

// @route delete api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       if (user) {
           await user.deleteOne();
           res.json({ msg: 'User removed successfully' }); 
       } else {
           res.status(404).json({ msg: 'User not found' }); 
       }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    } 
})

module.exports = router;