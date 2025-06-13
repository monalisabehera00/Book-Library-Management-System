const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const routes = express.Router();

// @routes Post /api/checkout
// @desc Create a new checkout session
// @access Private
routes.post('/', protect, async (req, res) => {
  const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body;

  // Validate required fields
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({message: 'Checkout is empty'}); 
  }
  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: 'Pending',
      isPaid: false,
    }); 
    console.log(`Checkout created: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error(" Error creating checkout session: ", error);
    res.status(500).json({message: 'Server error'}); 
  }
})

// @routes PUT /api/checkout/:id/pay
// @desc Update the checkout session to paid after successful payment
// @access Private
routes.put('/:id/pay', protect, async (req, res) => {
   const {paymentStatus, paymentDetails} = req.body;
   try {
    // Find the checkout session by ID
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({message: 'Checkout  not found'});
    }
    
    if (paymentStatus === 'paid') {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(200).json(checkout);
    }else {
      res.status(400).json({message: 'Invalid payment status'});
    }
   } catch (error) {
    console.error('Error updating checkout session to paid: ', error);
    res.status(500).json({message: 'Server error'});
   }
});

// @routes POST /api/checkout/:id/finalize
// @desc Finalize the checkout session and create a new order
// @access Private
routes.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({message: 'Checkout not found'});
    }

    if ((checkout.isPaid || checkout.paymentMethod === 'cod') && !checkout.isFinalized) {
        // Created Final order based on the checkout session
        const finalOrder = await Order.create({
          user: checkout.user,
          orderItems: checkout.checkoutItems,
          shippingAddress: checkout.shippingAddress,
          paymentMethod: checkout.paymentMethod,
          totalPrice: checkout.totalPrice,
          paymentStatus: 'paid',
          isPaid: true,
          paidAt: checkout.paidAt,
          isDelivered: false,
          paymentDetails: checkout.paymentDetails,
        });

        // Mark the checkout  as finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();

        // Delete the cart associated with the user
        await Cart.findOneAndDelete({user: checkout.user });
        res.status(201).json({message: 'Checkout finalized successfully', order: finalOrder});;
    } else if (checkout.isFinalized) {
      res.status(400).json({message: 'Checkout is already finalized'}); 
    } else {
      res.status(400).json({message: 'Checkout is not paid'});
    }
  } catch (error) {
   console.error('Error finalizing checkout session: ', error);
   res.status(500).json({message: 'Server error'});
  }
});

module.exports = routes;