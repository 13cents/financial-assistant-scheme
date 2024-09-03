const { db } = require('./index');
const { GetAllApplicantsQuery, CreateNewApplicantQuery, GetAllSchemesQuery } = require('./query');

function getAllApplicants() {
    return new Promise((resolve, reject) => {
        db.all(GetAllApplicantsQuery, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                return reject(err);
            }

            // Process the rows to group household members by applicant
            const applicantsMap = {};

            rows.forEach(row => {
                // If the applicant already exists, add the household member to the array
                if (applicantsMap[row.id]) {
                    applicantsMap[row.id].household.push({
                        id: row.hhperson_id,
                        name: row.hhperson_name,
                        relation: row.relation,
                        employment_status: row.hhperson_employment_status === 1 ? 'employed' : 'unemployed',
                        sex: row.hhperson_sex === 1 ? 'male' : 'female',
                        date_of_birth: row.hhperson_date_of_birth
                    });
                } else {
                    // If the applicant does not exist, create a new entry
                    applicantsMap[row.id] = {
                        id: row.id,
                        name: row.name,
                        employment_status: row.employment_status === 1 ? 'employed' : 'unemployed',
                        sex: row.sex === 1 ? 'male' : 'female',
                        date_of_birth: row.date_of_birth,
                        household: row.hhperson_id ? [{
                            id: row.hhperson_id,
                            name: row.hhperson_name,
                            relation: row.relation,
                            employment_status: row.hhperson_employment_status === 1 ? 'employed' : 'unemployed',
                            sex: row.hhperson_sex === 1 ? 'male' : 'female',
                            date_of_birth: row.hhperson_date_of_birth
                        }] : []
                    };
                }
            });

            // Convert the applicantsMap object to an array
            const result = Object.values(applicantsMap);

            resolve(result);
        });
    });
}

module.exports = { getAllApplicants };


exports.createApplicant = (data) => {
    db.run(CreateNewApplicantQuery, [data.name, data.employment_status, data.sex, data.date_of_birth, data.marital_status], (err) => {
        if (err) {
            console.error(err.message);
            return err;
        } else {
            return;
        }
    });
}

exports.getAllSchemes = async () => {
    return new Promise((resolve, reject) => {
        db.all(GetAllSchemesQuery, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

