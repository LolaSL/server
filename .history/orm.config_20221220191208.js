require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'],
};