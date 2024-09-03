const express = require('express');
const router = express.Router();

const schemeController = require('../controllers/schemeController');

router.get('/', schemeController.getAllSchemes);


module.exports = router;
