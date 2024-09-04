const { db } = require('./index');
const { GetAllApplicantsQuery, CreateNewApplicantQuery, GetAllSchemesQuery, GetApplicantById, GetAllApplicationsQuery,
    CreateNewApplicationQuery
} = require('./query');

exports.getAllApplicants = () => {
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

exports.getAllSchemes = () => {
    return new Promise((resolve, reject) => {
        db.all(GetAllSchemesQuery, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                return reject(err);
            }

            const schemesMap = {};

            rows.forEach(row => {
                if (!schemesMap[row.id]) {
                    schemesMap[row.id] = {
                        id: row.id,
                        name: row.name,
                        criteria: {
                            employment_status: row.employment_status === 0 ? 'unemployed' : row.employment_status === 1 ? 'employed' : null,
                            marital_status: row.marital_status,
                            has_children: {school_level: "== " + row.child_school_level}
                        },
                        benefits: []
                    };
                }

                if (row.benefit_id) {
                    schemesMap[row.id].benefits.push({
                        id: row.benefit_id,
                        name: row.benefit,
                        amount: row.amount
                    });
                }
            });

            const result = Object.values(schemesMap);
            resolve(result);
        });
    });
};

exports.getEligibleSchemes = async (id) => {
    const schemes = await this.getAllSchemes();

    const applicant = await new Promise((resolve, reject) => {
        db.all(GetApplicantById, [id], (err, datas) => {
            if (err) {
                console.error(err.message);
                return reject(err);
            } else {
                // Process the rows to group household members by applicant
                const applicantsMap = {};

                datas.forEach(row => {
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
                                date_of_birth: row.hhperson_date_of_birth,
                                school_level: row.school_level
                            }] : []
                        };
                    }
                });
                resolve(Object.values(applicantsMap)[0]);

            }
        });
    });


    const eligibleSchemes = schemes.filter(scheme => {
        const { criteria } = scheme;
        // console.log('applicant',applicant)

        // Check employment status criteria
        const employmentStatusMatch = criteria.employment_status === null ||
            criteria.employment_status === applicant.employment_status;
        console.log('employmentStatusMatch', employmentStatusMatch)


        // Check marital status criteria
        const maritalStatusMatch = criteria.marital_status === null ||
            criteria.marital_status.toLowerCase() === (applicant.marital_status || '').toLowerCase();
        console.log('maritalStatusMatch ', maritalStatusMatch)

        // Check has_children criteria
        let hasChildrenMatch;
        if (criteria.has_children && applicant.household != undefined) {
            hasChildrenMatch = applicant.household.some(member => {
                return member.school_level === 'primary';
            });
        }
        console.log('hasChildrenMatch ', hasChildrenMatch)

        return employmentStatusMatch && maritalStatusMatch && hasChildrenMatch;
    });

    return eligibleSchemes;
}

exports.getAllApplications = () => {
    return new Promise((resolve, reject) => {
        db.all(GetAllApplicationsQuery, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                return reject(err);
            }

            resolve(rows);
        });
    });
};

exports.createApplication = (data) => {
    db.run(CreateNewApplicationQuery, [data.applicant_id, data.scheme_id, 'pending', data.remarks], (err) => {
        if (err) {
            console.error(err.message);
            return err;
        } else {
            return;
        }
    });
}
