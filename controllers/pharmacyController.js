const pharmacyService = require("../services/pharmacyService");

const placeOrder = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const result = await pharmacyService.createPharmacyOrder(req.body, token);

    res.status(201).json({
      success: true,
      message: "Pharmacy order placed successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
};
