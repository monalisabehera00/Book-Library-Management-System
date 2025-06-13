const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            discountPrice,
            countInStock,
            sku,
            category,
            author,
            publisher,
            language,
            pages,
            format,
            isbn,
            publicationDate,
            rating,
            numReviews,
            images,
            isFeatured,
            reviews,
            tags,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;

        const formattedImages = images?.map(image => ({
            url: image,
            altText: ''
        })) || [];

        const formattedReviews = reviews?.map(review => ({
            ...review,
            user: review.user || req.user._id
        })) || [];

        const product = new Product({
            name,
            price,
            description,
            discountPrice,
            countInStock,
            sku,
            category,
            author,
            publisher,
            language,
            pages,
            format,
            isbn,
            publicationDate,
            rating,
            numReviews,
            images: formattedImages,
            isFeatured,
            reviews: formattedReviews,
            tags,
            metaTitle,
            metaDescription,
            metaKeywords,
            user: req.user._id
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/products
// @desc    Get all products with filtering, search and sorting
// @access  Public
router.get('/', async (req, res) => {
    try {
        const {
            collection,
            category,
            minPrice,
            maxPrice,
            rating,
            availability,
            brand,
            sort,
            limit,
            search,
            page
        } = req.query;

        const query = {};

        if (collection && collection.toLowerCase() !== "all") {
            query.collection = collection;
        }

        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (rating) {
            query.rating = { $gte: Number(rating.split(' ')[0]) };
        }

        if (availability) {
            query.countInStock = availability === 'In Stock' ? { $gt: 0 } : { $eq: 0 };
        }

        if (brand) {
            query.publisher = { $in: brand.split(',') };
        }

        let sortOption = {};
        switch (sort) {
            case 'price-low-to-high':
                sortOption = { price: 1 };
                break;
            case 'price-high-to-low':
                sortOption = { price: -1 };
                break;
            case 'a-z':
                sortOption = { name: 1 };
                break;
            case 'z-a':
                sortOption = { name: -1 };
                break;
            case 'newest':
                sortOption = { createdAt: -1 };
                break;
            default:
                sortOption = { isFeatured: -1, createdAt: -1 };
        }

        const products = await Product.find(query)
            .sort(sortOption)
            .select('-reviews');

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/products/best-seller
// @desc    Get product with highest rating
// @access  Public
router.get('/best-seller', async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ msg: 'No best sellers found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/products/new-arrivals
// @desc    Get latest products based on publication date
// @access  Public
router.get('/new-arrivals', async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ publicationDate: -1 }).limit(8);
        res.json({ data: newArrivals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/products/similar/:id
// @desc    Get similar products by category
// @access  Public
router.get('/similar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const similarProducts = await Product.find({
            category: product.category,
            _id: { $ne: id }
        }).limit(4);

        res.json(similarProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ msg: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ msg: 'Product deleted' });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
