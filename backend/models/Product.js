const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discountPrice: {
        type: Number,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    format: {
        type: String,
        required: true,
        enum: ['Paperback', 'Hardcover', 'E-book', 'Audiobook']
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        altText: {
            type: String
        }
    }],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    name: {
        type: String,
        required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
           
        },
        createdAt: {
            type: Date,
            default: Date.now
        },

    }],
    tags: [String],
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    metaKeywords: [String],

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);