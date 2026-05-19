const axios = require('axios');

const createPharmacyOrder = async (orderData) => {
    try {
        const response = await axios.post(
            `${process.env.PHARMACY_SYSTEM_URL}/orders/create`,
            orderData
        );

        return response.data;
    } catch (error) {
        throw new Error('Pharmacy Management System unavailable');
    }
};

module.exports = {
    createPharmacyOrder
};