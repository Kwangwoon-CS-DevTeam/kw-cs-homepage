const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors.array().map((error) => error.msg),
        });
    }
    next();
};

module.exports = { handleValidationErrors };
