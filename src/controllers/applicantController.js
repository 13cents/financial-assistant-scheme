const {getAllApplicants, createApplicant} = require('../repository/db-controller')

exports.getAllApplicants = async (req, res) => {
    try {
        const applicants = await getAllApplicants();
        res.status(200).json({"applicants":applicants});
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve applicants' });
    }
};

exports.createApplicant = async (req, res) => {
    const { name, employment_status, sex, date_of_birth } = req.body;
    if (!name || employment_status === undefined || sex === undefined || !date_of_birth) {
        return res.status(400).json({ error: 'Missing fields: name, employment_status, sex, date_of_birth, marital_status (optional)' });
    }
    const boolSex = sex.toLowerCase() === 'female' ? 0 : 1;
    const boolEmploymentStatus = employment_status === 'unemployed' ? 0 : 1;
    try {
        await createApplicant({...req.body,
        sex: boolSex,
        employment_status: boolEmploymentStatus});
        res.status(200).json("Successfully created applicant");
    } catch (error) {
        res.status(500).json({ error: 'Failed to create applicant' });
    }
};
