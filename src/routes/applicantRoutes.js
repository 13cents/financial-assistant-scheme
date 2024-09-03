const express = require('express');
const router = express.Router();

const applicantController = require('../controllers/applicantController');

router.get('/', applicantController.getAllApplicants);

router.post('/', applicantController.createApplicant);

module.exports = router;
