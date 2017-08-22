const express = require('express');
const industryController = require('./controllers/industryController');

const router = express.Router();

router.get('/industry', industryController.index);

module.exports = router;
