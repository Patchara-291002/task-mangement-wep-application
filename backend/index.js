const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT  = process.env.PORT
const connectionString = process.env.DB_STRING

// midleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection 
const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');
    } catch (error) {
        console.error(error);
    }
}

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
