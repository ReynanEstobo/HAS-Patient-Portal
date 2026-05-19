const authService = require('../services/authService');

const login = async (req, res, next) => {
    try {
        const data = await authService.loginUser(req.body);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};