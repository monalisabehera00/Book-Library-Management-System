const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @route POST api/subscribe
// @desc Subscribe to newsletter
// @access Public
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Email is required' });
    }

    try {
        // Check if email already exists
        let subscriber = await Subscriber.findOne({ email });

        if (subscriber) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Create new subscriber
        subscriber = new Subscriber({
            email,
        });
        await subscriber.save();
        res.status(201).json({ msg: 'Succesfull Subscribed to newsletter' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;