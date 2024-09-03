let GetAllApplicantsQuery = 'SELECT a.*, h.* from applicant a LEFT JOIN household h ON a.id = h.applicant_id;';
let CreateNewApplicantQuery = 'INSERT INTO applicant (name, employment_status, sex, date_of_birth, marital_status) VALUES (?, ?, ?, ?, ?);';
let GetAllSchemesQuery = 'SELECT s.*, b.*, c.* FROM schemes s LEFT JOIN benefits b ON s.id = b.scheme_id LEFT JOIN criteria c ON s.id = c.scheme_id;';

module.exports = {
    GetAllApplicantsQuery,
    CreateNewApplicantQuery,
    GetAllSchemesQuery
}