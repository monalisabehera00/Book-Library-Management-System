const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/product');

dotenv.config();

//Connect to mongodb
mongoose.connect(process.env.MONGO_URI);

//Function to seed data 
const seedData = async () => {
    try {
        //Delete existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        
        //Create default admin user
        const createdUser = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: '123456',
            role: 'admin',
        });
        // assign the default user ID to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user:userID }
        });

        // Insert products into database
        await Product.insertMany(sampleProducts);

        console.log('Product Data seeded successfully');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
