const User = require('../models/user');
const handleError = require('../middleware/errorHandler').default;

exports.me = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Profile', user: user });
    } catch (error) {
        handleError(error, next);
    }
}