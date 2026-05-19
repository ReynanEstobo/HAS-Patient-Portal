const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const appointmentController = require("../controllers/appointmentController");

router.get(
  "/doctors",
  verifyToken,
  appointmentController.fetchAvailableDoctors,
);

router.get(
  "/doctors/:doctorId/schedule",
  verifyToken,
  appointmentController.fetchDoctorSchedule,
);

router.post(
  "/schedule",
  verifyToken,
  appointmentController.scheduleAppointment,
);

module.exports = router;
