const express = require('express');
const router = express.Router();

const schemeController = require('../controllers/schemeController');

router.get('/', schemeController.getAllSchemes);
router.get('/eligible', schemeController.getEligibleSchemes);

module.exports = router;
