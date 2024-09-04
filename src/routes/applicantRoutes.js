const express = require('express');
const router = express.Router();

const applicantController = require('../controllers/applicantController');
/**
 * @swagger
 * /applicants:
 *   get:
 *     summary: Retrieve all applicants
 *     description: Retrieve a list of all applicants in the database.
 *     tags:
 *       - Applicants
 *     responses:
 *       200:
 *         description: A list of applicants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applicants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 'f8dc84bd-fccc-48b6-a511-4815e3329886'
 *                       name:
 *                         type: string
 *                         example: 'James'
 *                       employment_status:
 *                         type: boolean
 *                         example: 1
 *                       sex:
 *                         type: boolean
 *                         example: 1
 *                       date_of_birth:
 *                         type: string
 *                         format: date
 *                         example: '1990-07-01'
 *                       marital_status:
 *                         type: string
 *                         example: 'married'
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-03T08:52:13Z'
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-03T08:52:13Z'
 *       500:
 *         description: Failed to retrieve applicants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve applicants'
 */
router.get('/', applicantController.getAllApplicants);


/**
 * @swagger
 * /applicants:
 *   post:
 *     summary: Create a new applicant
 *     description: Create a new applicant with the provided details.
 *     tags:
 *       - Applicants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Mary'
 *               employment_status:
 *                 type: string
 *                 example: 'employed'
 *               sex:
 *                 type: string
 *                 example: 'female'
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: '1992-03-03'
 *               marital_status:
 *                 type: string
 *                 example: 'single'
 *     responses:
 *       200:
 *         description: Successfully created applicant
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Successfully created applicant'
 *       400:
 *         description: Expected fields missing or incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Expected fields: name, employment_status, sex, date_of_birth, marital_status (optional)'
 *       500:
 *         description: Failed to create applicant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to create applicant'
 */
router.post('/', applicantController.createApplicant);

module.exports = router;
