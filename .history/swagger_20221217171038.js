const swaggerAutogen = require('swagger-autogen');
const doc = {
    info: {
        title: "Ecommerce-pern-backend",
        description: "Ecommerce-pern-backend application"
    },
    host: "localhost:8000",
    schema: {'http'}
}, 
const outputFile = require('./swaggerLog.json')
const endpoint
