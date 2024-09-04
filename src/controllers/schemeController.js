const {getAllSchemes, getEligibleSchemes} = require('../repository/db-controller');
const url = require('url');


exports.getAllSchemes = async (req, res) => {
    try {
        const schemes = await getAllSchemes();
        res.status(200).json({"schemes": schemes});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve schemes: ' + error});
    }
};


exports.getEligibleSchemes = async (req, res) => {
    const id = req.query.applicant;
    try {
        const applicants = await getEligibleSchemes(id);
        res.status(200).json(applicants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve schemes: ' + error});
    }
};