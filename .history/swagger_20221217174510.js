const swaggerAutogen = require('swagger-autogen');
const doc = {
    info: {
        title: "Ecommerce API",
        description: "Ecommerce-pern-backend application"
    },
    host: "localhost:8000",
    schema: ['http']
};
const outputFile = require('./swaggerLog.json')
const endpointFiles = ['./routes/index.js']
swaggerAutogen(outputFile, endpointFiles, doc)
