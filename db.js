const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.SERVER_USER,
  password: process.env.SERVER_PASSWORD,
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  database: process.env.SERVER_DATABASE
}

const proConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = new Pool( proConfig )

module.exports = pool;