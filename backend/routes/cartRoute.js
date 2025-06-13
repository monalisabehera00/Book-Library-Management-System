const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function to get cart for a user or guest
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart
// @desc Add product to cart for a user or a guest
// @access Public
router.post('/', async (req, res) => {
    const { productId, quantity, userId, guestId} = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Determine user is logged in or guest
        let cart = await getCart(userId, guestId);

        // If cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId);

                if (productIndex > -1) {
                    // if product already exists in the cart, update its quantity
                    cart.products[productIndex].quantity += parseInt(quantity, 10); // or Number(quantity);

                }else {
                // if product does not exist in the cart, add it
                cart.products.push({ productId, 
                    quantity, 
                    name: product.name, 
                    price: product.price,
                    rating: product.rating, 
                    image: product.images[0].url });
            }
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc, item) => {
                return acc + (Number(item.price) || 0) * (Number(item.quantity) || 0);
            }, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // If cart does not exist, create a new one
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{ 
                    productId, 
                    quantity, 
                    name: product.name, 
                    price: product.price,
                    rating: product.rating, 
                    image: product.images[0].url }],
                totalPrice: (Number(product.price) || 0) * (Number(quantity) || 0),
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error });
  } 
});

// @route PUT /api/cart
// @desc Update product quantity in cart for a user or a guest
// @access Public
router.put('/', async (req, res) => {
    const { productId, quantity, userId, guestId} = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId);

        if (productIndex > -1) {
            // if product already exists in the cart, update its quantity
            if (quantity > 0) {
                cart.products[productIndex].quantity = parseInt(quantity, 10);
            } else {
                // if quantity is 0, remove the product from the cart
                cart.products.splice(productIndex, 1);
            }
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc, item) => {
                return acc + (Number(item.price) || 0) * (Number(item.quantity) || 0);
            }, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });      
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error });
    }
});

// @route DELETE /api/cart
// @desc Remove product from cart for a user or a guest
// @access Public
router.delete('/', async (req, res) => {
    const { productId, userId, guestId} = req.body;
    try {
        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ msg: 'Cart not found' }); 
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId);

        if (productIndex > -1) {
            // if product already exists in the cart, remove it
            cart.products.splice(productIndex, 1);  
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc, item) => {
                return acc + (Number(item.price) || 0) * (Number(item.quantity) || 0);
            }, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
    }  catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error }); 
    }
});
// @route GET /api/cart
// @desc Get cart for a user or a guest
// @access Public
router.get('/', async (req, res) => {
    const { userId, guestId} = req.query;
    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ msg: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error }); 
    } 
});
// @route GET /api/cart/merge
// @desc Merge guest cart into user cart
// @access Private
router.post('/merge', protect, async (req, res) => {
    const { guestId } = req.body;  

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart){
            if (guestCart.products.length === 0) {
                return res.status(400).json({ msg: 'Guest cart is empty' });
            }
        if (userCart) {
            // Merge guest cart into user cart
            guestCart.products.forEach((guestItem) => {
                const productIndex = userCart.products.findIndex(
                    (item) => item.productId.toString() === guestItem.productId.toString());

                if (productIndex > -1) {
                    // if product already exists in the user cart, update its quantity
                    userCart.products[productIndex].quantity += guestItem.quantity;  
                } else {
                    // if product does not exist in the user cart, add it
                    userCart.products.push(guestItem);
                }
            });
            // Recalculate the total price
            userCart.totalPrice = userCart.products.reduce((acc, item) => {
                return acc + (Number(item.price) || 0) * (Number(item.quantity) || 0);
            }, 0);
            await userCart.save();
            // Delete guest cart
            try {
                await Cart.findOneAndDelete({ guestId }); 
            } catch (error) {
                console.error("Error deleting guest cart: ",error);  
            }
            res.status(200).json(userCart);
            } else {
                // If user cart does not exist, create a new one
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                res.status(200).json(guestCart); 
            }
        } else {
           if (userCart) {
            // guest cart has already been merged, return user cart
            return res.status(200).json(userCart);
        }
        return res.status(404).json({ msg: 'Guest Cart not found' });
    } 
    }catch (error) {
           console.error(error);
           res.status(500).json({ msg: 'Server error', error }); 
        }
});


module.exports = router;