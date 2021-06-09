const Pool = require('pg').Pool;
require('dotenv').config();

// const devConfig = {
//   user: process.env.SERVER_USER,
//   password: process.env.SERVER_PASSWORD,
//   host: process.env.SERVER_HOST,
//   port: process.env.SERVER_PORT,
//   database: process.env.SERVER_DATABASE
// }

const devConfig = {
  user: 'postgres',
  password: '2151',
  host: 'localhost',
  port: 5432,
  database: 'edward_and_co'
}

const proConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig)

module.exports = pool;