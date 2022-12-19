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
            "url": "https://ecommerce-server.herokuapp.com/",
            schemes: ['http']
            "description": "Main server"
        }
    ]
};
const outputFile = require('./swaggerLog.json')
const endpointsFiles = ['./routes/index.js']
swaggerAutogen(outputFile, endpointsFiles, doc)
