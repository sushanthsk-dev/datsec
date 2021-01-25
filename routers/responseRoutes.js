const express = require('express');
const responseController = require('../controllers/responseController');
const router = express.Router();
router.post('/', responseController.createResponse);

router.delete('/:id', responseController.deleteResponse);
module.exports = router;
