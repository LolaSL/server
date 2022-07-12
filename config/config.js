require('dotenv').config()

module.exports = {
    dbLogin: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,

    },

    node_env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL
    
}
