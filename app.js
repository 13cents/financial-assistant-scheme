const express = require('express');
const app = express();
const applicantRoutes = require('./src/routes/applicantRoutes');
const schemeRoutes = require('./src/routes/schemeRoutes');


app.use(express.json());

app.use('/api/applicants', applicantRoutes);
app.use('/api/schemes', schemeRoutes);
// app.use('/api/applications', applicationRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

module.exports = app;
