const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        };
        await mongoose.connect(process.env.MONGO_URI, options);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error("MongoDB connection failed.", err);
        process.exit(1);
    }
};
module.exports = connectDB;
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("MongoDB connected");
// };

// module.exports = connectDB;
