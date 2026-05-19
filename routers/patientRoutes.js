const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const patientController = require("../controllers/patientController");

router.get("/profile", verifyToken, patientController.fetchPatientProfile);

router.get(
  "/consultations",
  verifyToken,
  patientController.fetchConsultationSummary,
);

module.exports = router;
