const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//@route GET api/orders/myorders
//@desc Get logged in user orders
//@access Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        // Find all orders for the logged in user
        const orders = await Order.find({ user: req.user_.id }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @router GET api/orders/:id
// @desc Get order by ID
// @access Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Return the full order object
        res.json(order);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }   
});

module.exports = router;