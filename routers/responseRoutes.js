const express = require('express');
const responseController = require('../controllers/responseController');
const router = express.Router();
router.post('/response', responseController.createResponse);

module.exports = router;
