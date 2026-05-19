const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');
const pharmacyController = require('../controllers/pharmacyController');

router.post(
    '/order',
    verifyToken,
    pharmacyController.placeOrder
);

module.exports = router;