const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router()

// @routes Get /api/admin/orders
// @desc Get all orders
// @access Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email')
        res.json(orders)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @routes put /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name');
        
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === 'Delivered'? true : order.isDelivered;
            order.deliveredAt = req.body.status === 'Delivered'? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' }); 
        }
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @routes DELETE /api/admin/orders/:id 
// @desc Delete order
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: 'Order removed' }); 
        }else {
            res.status(404).json({ message: 'Order not found' }); 
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    } 
})

module.exports = router;