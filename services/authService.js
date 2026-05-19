const axios = require("axios");

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SYSTEM_URL}/auth/login`,
      credentials,
    );

    return response.data;
  } catch (error) {
    throw new Error("Authentication system unavailable");
  }
};

module.exports = {
  loginUser,
};
