const axios = require("axios");

const createPharmacyOrder = async (orderData, token) => {
  try {
    const response = await axios.post(
      `${process.env.PHARMACY_SYSTEM_URL}/orders/create`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Pharmacy Management System unavailable",
    );
  }
};

module.exports = {
  createPharmacyOrder,
};
