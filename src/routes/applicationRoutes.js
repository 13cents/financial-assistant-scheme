const express = require('express');
const router = express.Router();

const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getAllApplications);
router.post('/', applicationController.createApplication);

module.exports = router;
