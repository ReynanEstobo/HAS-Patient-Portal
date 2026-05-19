const appointmentService = require("../services/appointmentService");

const fetchAvailableDoctors = async (req, res, next) => {
  try {
    const { date } = req.query;

    const token = req.headers.authorization.split(" ")[1];

    const doctors = await appointmentService.getAvailableDoctors(date, token);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    next(error);
  }
};

const fetchDoctorSchedule = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const token = req.headers.authorization.split(" ")[1];

    const schedule = await appointmentService.getDoctorSchedule(
      doctorId,
      date,
      token,
    );

    res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

const fetchPatientAppointments = async (req, res, next) => {
  try {
    const patientId = req.user.id;

    const token = req.headers.authorization.split(" ")[1];

    const appointments = await appointmentService.getPatientAppointments(
      patientId,
      token,
    );

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

const scheduleAppointment = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const result = await appointmentService.createAppointment(req.body, token);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAvailableDoctors,
  fetchDoctorSchedule,
  fetchPatientAppointments,
  scheduleAppointment,
};
