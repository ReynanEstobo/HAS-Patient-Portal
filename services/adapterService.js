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

const getConsultationSummaryByAppointment = async (appointmentId, token) => {
  try {
    const response = await axios.get(
      `${process.env.ADAPTER_LAYER_URL}/consultations/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch consultation summary",
    );
  }
};

module.exports = {
  getPatientProfile,
  getConsultationSummaryByAppointment,
};
