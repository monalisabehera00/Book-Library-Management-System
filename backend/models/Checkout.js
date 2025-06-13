const mongoose = require('mongoose');

const checkoutItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: 
    {   type: String,
        required: true
    },
    price: {
        type: Number,
        required: true 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
},
{_id:false}
);

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed, // You can store payment details as needed
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    isFinalized: {
        type: Boolean,
        required: true,
        default: false 
    },
    finalisedAt: {
        type: Date 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Checkout', checkoutSchema);