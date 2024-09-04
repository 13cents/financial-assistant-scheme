const express = require('express');
const app = express();
const applicantRoutes = require('./src/routes/applicantRoutes');
const schemeRoutes = require('./src/routes/schemeRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


app.use(express.json());

app.use('/api/applicants', applicantRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/applications', applicationRoutes);
const swaggerOptions = require('./swagger.json');
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

module.exports = app;
