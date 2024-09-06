const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils');

exports.registerUser = async ({ username, email, password }) => {
    let user = await User.findOne({ email });
    if (user) {
        return { error: 'User already exists' };
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return { success: true };
};

exports.loginUser = async ({ email, password }) => {
    let user = await User.findOne({ email });
    if (!user) {
        return { error: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { error: 'Invalid credentials' };
    }

    const token = jwtUtils.generateToken(user.id);
    return { token };
};
