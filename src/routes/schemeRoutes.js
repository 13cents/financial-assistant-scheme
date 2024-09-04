const express = require('express');
const router = express.Router();

const schemeController = require('../controllers/schemeController');

/**
 * @swagger
 * /schemes:
 *   get:
 *     summary: Retrieve all schemes
 *     description: Retrieve a list of all schemes available in the database.
 *     tags:
 *       - Schemes
 *     responses:
 *       200:
 *         description: A list of schemes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schemes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: '4b5ffbc9-47bd-4fab-bc0e-e264f0622d4f'
 *                       name:
 *                         type: string
 *                         example: 'Retrenchment Assistance Scheme'
 *                       criteria:
 *                         type: object
 *                         properties:
 *                           employment_status:
 *                             type: string
 *                             example: 'unemployed'
 *                           marital_status:
 *                             type: string
 *                             example: null
 *                           has_children:
 *                             type: boolean
 *                             example: true
 *                       benefits:
 *                         type: object
 *                         properties:
 *                           amount:
 *                             type: number
 *                             example: 1500
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-03T08:52:13Z'
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-03T08:52:13Z'
 *       500:
 *         description: Failed to retrieve schemes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve schemes'
 */
router.get('/', schemeController.getAllSchemes);

/**
 * @swagger
 * /schemes/eligible:
 *   get:
 *     summary: Retrieve eligible schemes for an applicant
 *     description: Fetch a list of schemes that an applicant is eligible for based on their ID.
 *     parameters:
 *       - in: query
 *         name: applicant
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the applicant for whom eligible schemes are being retrieved.
 *     responses:
 *       '200':
 *         description: Successfully retrieved eligible schemes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   scheme_id:
 *                     type: string
 *                     description: The unique identifier for the scheme.
 *                   scheme_name:
 *                     type: string
 *                     description: The name of the scheme.
 *                   eligibility_criteria:
 *                     type: string
 *                     description: Criteria for eligibility.
 *       '400':
 *         description: Bad Request - missing or invalid parameters
 *       '500':
 *         description: Internal Server Error - failed to retrieve schemes
 */
router.get('/eligible', schemeController.getEligibleSchemes);

module.exports = router;
