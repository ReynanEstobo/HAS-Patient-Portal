const axios = require("axios");

const getAvailableDoctors = async (date, token) => {
  try {
    const response = await axios.get(
      `${process.env.ADAPTER_LAYER_URL}/appointments/doctors/available?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
      `${process.env.ADAPTER_LAYER_URL}/appointments/doctors/${doctorId}/schedule?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const getUpcomingAppointments = async (patientId, token) => {
  try {
    const response = await axios.get(
      `${process.env.ADAPTER_LAYER_URL}/appointments/patient/${patientId}/upcoming`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch upcoming appointments",
    );
  }
};

const getAppointmentHistory = async (patientId, token) => {
  try {
    const response = await axios.get(
      `${process.env.ADAPTER_LAYER_URL}/appointments/patient/${patientId}/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unable to fetch appointment history",
    );
  }
};

const createAppointment = async (appointmentData, token) => {
  try {
    const response = await axios.post(
      `${process.env.ADAPTER_LAYER_URL}/appointments/create`,
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
  getUpcomingAppointments,
  getAppointmentHistory,
  createAppointment,
};
