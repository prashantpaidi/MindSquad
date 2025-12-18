const errorHandler = (err, req, res, next) => {
    console.error('Server Error:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            success: false,
            error: messages
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};

module.exports = errorHandler;
