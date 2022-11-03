"use strict";

require('dotenv').config();

module.exports = {
  dbLogin: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL
};