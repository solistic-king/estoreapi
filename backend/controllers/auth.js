const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const isUser = await User.findOne({ email: email });
        if (isUser) {
            const error = new Error('User already exists.');
            error.statusCode = 409;
            throw error;
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            password: hashedPw,
            cart: { items: [] },
            isAdmin: false
        });
        const result = await user.save();

        res.status(201).json({ message: 'User was created.', userId: result._id });
    } catch (error) {
        handleError(error, next);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("Email and/or password are wrong.");
            error.statusCode = 404;
            throw error;
        }

        const isEqual = bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("Email and/or password are wrong.");
            error.statusCode = 404;
            throw error;
        }

        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString(),
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: token, userId: user._id.toString(), isAdmin: user.isAdmin });
    } catch (error) {
        handleError(error, next);
    }
};

const handleError = (error, next) => {
    if(!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
}