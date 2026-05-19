const adapterService = require("../services/adapterService");

const fetchPatientProfile = async (req, res, next) => {
  try {
    const patientId = req.user.id;

    const token = req.headers.authorization.split(" ")[1];

    const profile = await adapterService.getPatientProfile(patientId, token);

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

const fetchConsultationSummary = async (req, res, next) => {
  try {
    const patientId = req.user.id;

    const token = req.headers.authorization.split(" ")[1];

    const summary = await adapterService.getConsultationHistory(
      patientId,
      token,
    );

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchPatientProfile,
  fetchConsultationSummary,
};
