const {getAllApplications, createApplication} = require('../repository/db-controller')

exports.getAllApplications = async (req, res) => {
    try {
        const applicants = await getAllApplications();
        res.status(200).json({"applications":applicants});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve applications' });
    }
};

exports.createApplication = async (req, res) => {
    const { applicant_id, scheme_id, remarks} = req.body;
    if (!applicant_id || !scheme_id ) {
        return res.status(400).json({ error: 'Expected fields: applicant_id, scheme_id, remarks (optional)' });
    }
    try {
        await createApplication( { applicant_id, scheme_id, remarks} );
        res.status(200).json("Successfully created application");
    } catch (error) {
        res.status(500).json({ error: 'Failed to create application' });
    }
};
