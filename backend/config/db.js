// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error(`mongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
