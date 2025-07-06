const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')

const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
    } catch (error) {
        console.error('MongoDB connection failed', error.message);
        process.exit(1);
    }
}

module.exports = connectDB