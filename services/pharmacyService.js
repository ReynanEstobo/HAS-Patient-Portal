const axios = require("axios");

const createPharmacyOrder = async (orderData, token) => {
  try {
    const response = await axios.post(
      `${process.env.ADAPTER_LAYER_URL}/pharmacy/orders/create`,
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
      error.response?.data?.message || "Unable to create pharmacy order",
    );
  }
};

module.exports = {
  createPharmacyOrder,
};
