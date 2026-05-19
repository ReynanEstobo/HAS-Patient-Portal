const axios = require("axios");

const getPatientProfile = async (patientId, token) => {
  try {
    const response = await axios.get(
      `${process.env.ADAPTER_LAYER_URL}/patients/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Adapter Layer unavailable",
    );
  }
};

const getConsultationHistory = async (patientId, token) => {
  try {
    const response = await axios.get(
      `${process.env.ADAPTER_LAYER_URL}/consultations/history/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch consultation history",
    );
  }
};

module.exports = {
  getPatientProfile,
  getConsultationHistory,
};
