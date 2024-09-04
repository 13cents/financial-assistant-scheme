const express = require('express');
const router = express.Router();

const applicationController = require('../controllers/applicationController');

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Retrieve all applications
 *     description: Retrieve a list of all applications in the database.
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: A list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: '7b20b71f-d2ae-f-49ca-b769-6d14d8b22f55'
 *                       applicant_id:
 *                         type: string
 *                         example: '97fa59ed-9a9b-4610-b552-4ecc59f5e610'
 *                       scheme_id:
 *                         type: string
 *                         example: '4b5ffbc9-47bd-4fab-bc0e-e264f0622d4f'
 *                       remarks:
 *                         type: string
 *                         example: 'Approved for the scheme'
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-03T08:52:13Z'
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-03T08:52:13Z'
 *       500:
 *         description: Failed to retrieve applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve applications'
 */
router.get('/', applicationController.getAllApplications);


/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     description: Create a new application with the provided details.
 *     tags:
 *       - Applications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicant_id:
 *                 type: string
 *                 example: '97fa59ed-9a9b-4610-b552-4ecc59f5e610'
 *               scheme_id:
 *                 type: string
 *                 example: '4b5ffbc9-47bd-4fab-bc0e-e264f0622d4f'
 *               remarks:
 *                 type: string
 *                 example: 'Pending approval'
 *     responses:
 *       200:
 *         description: Successfully created application
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Successfully created application'
 *       400:
 *         description: Expected fields missing or incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Expected fields: applicant_id, scheme_id, remarks (optional)'
 *       500:
 *         description: Failed to create application
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to create application'
 */
router.post('/', applicationController.createApplication);

module.exports = router;
