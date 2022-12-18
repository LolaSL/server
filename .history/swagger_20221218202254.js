const swaggerAutogen = require('swagger-autogen');
const doc = {
    openapi: "3.0.1",
    info: {
        title: "Ecommerce API",
        version: "1.0.0",
        description: "The Demo ecommerce api made for user, cart, and order transactions for an art products store."
    },
    servers: [
        {
            "url": "http://localhost:8000",
            "description": "Main server"
        }
    ]
};
const outputFile = require('./')
const endpointsFiles = ['./routes/index.js']
swaggerAutogen(outputFile, endpointsFiles, doc)
