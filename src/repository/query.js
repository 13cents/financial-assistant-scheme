let GetAllApplicantsQuery = 'SELECT a.*, h.* from applicant a LEFT JOIN household h ON a.id = h.applicant_id;';
let CreateNewApplicantQuery = 'INSERT INTO applicant (name, employment_status, sex, date_of_birth, marital_status) VALUES (?, ?, ?, ?, ?);';
let GetAllSchemesQuery = 'SELECT * from schemes;';

module.exports = {
    GetAllApplicantsQuery,
    CreateNewApplicantQuery,
    GetAllSchemesQuery
}