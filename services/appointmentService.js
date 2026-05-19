const axios = require("axios");

const getAvailableDoctors = async (date, token) => {
  try {
    const response = await axios.get(
      `${process.env.ONLINE_APPOINTMENT_URL}/api/doctors/available?date=${date}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch available doctors",
    );
  }
};

const getDoctorSchedule = async (doctorId, date, token) => {
  try {
    const response = await axios.get(
      `${process.env.ONLINE_APPOINTMENT_URL}/api/doctors/${doctorId}/schedule?date=${date}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch doctor schedule",
    );
  }
};

const createAppointment = async (appointmentData, token) => {
  try {
    const response = await axios.post(
      `${process.env.ONLINE_APPOINTMENT_URL}/api/appointments`,
      appointmentData,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to create appointment",
    );
  }
};

module.exports = {
  getAvailableDoctors,
  getDoctorSchedule,
  createAppointment,
};
