let GetAllApplicantsQuery = 'SELECT a.*, h.* from applicant a LEFT JOIN household h ON a.id = h.applicant_id;';
let CreateNewApplicantQuery = 'INSERT INTO applicant (name, employment_status, sex, date_of_birth, marital_status) VALUES (?, ?, ?, ?, ?);';
let GetAllSchemesQuery = 'SELECT s.*, b.*, c.* FROM schemes s LEFT JOIN benefits b ON s.id = b.scheme_id LEFT JOIN criteria c ON s.id = c.scheme_id;';
let GetApplicantById = 'SELECT a.*, h.* from applicant a LEFT JOIN household h ON a.id = h.applicant_id where a.id = ?;';
let GetAllApplicationsQuery = 'SELECT app.*,a.name AS applicant_name, s.name AS scheme_name FROM application app JOIN applicant a ON app.applicant_id = a.id JOIN schemes s ON app.scheme_id = s.id;';
let CreateNewApplicationQuery = 'INSERT into application (applicant_id, scheme_id, status, remarks) values (?, ?, ?, ?);';


module.exports = {
    GetAllApplicantsQuery,
    CreateNewApplicantQuery,
    GetAllSchemesQuery,
    GetApplicantById,
    GetAllApplicationsQuery,
    CreateNewApplicationQuery
}