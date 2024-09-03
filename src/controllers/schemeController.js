const {getAllSchemes} = require('../repository/db-controller')

exports.getAllSchemes = async (req, res) => {
    try {
        const applicants = await getAllSchemes();
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve schemes' });
    }
};

