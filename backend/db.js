// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bel_project',
  password: 'Chaithrap@04',
  port: 5432,
});

module.exports = pool;
