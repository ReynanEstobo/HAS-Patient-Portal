const pharmacyService = require('../services/pharmacyService');

const placeOrder = async (req, res, next) => {
    try {
        const result = await pharmacyService.createPharmacyOrder(req.body);

        res.status(201).json({
            success: true,
            message: 'Pharmacy order placed successfully',
            result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    placeOrder
};