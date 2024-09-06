const express = require('express');
const connectToDB = require('./configs/db.config');
const authRoutes = require('./routes/authRoute');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
connectToDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
