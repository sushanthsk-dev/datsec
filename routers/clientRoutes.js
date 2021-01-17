const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();
router.post('/response', clientController.createResponse);

module.exports = router;
