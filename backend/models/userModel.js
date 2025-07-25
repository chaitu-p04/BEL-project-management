const db = require('../db');

const createUser = async (username, staffId, hashedPassword) => {
  const query = 'INSERT INTO users (username, staff_id, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, staffId, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getUserByStaffId = async (staffId) => {
  const result = await db.query('SELECT * FROM users WHERE staff_id = $1', [staffId]);
  return result.rows[0];
};

const updatePassword = async (staffId, newHashedPassword) => {
  const result = await db.query('UPDATE users SET password = $1 WHERE staff_id = $2 RETURNING *', [newHashedPassword, staffId]);
  return result.rows[0];
};

module.exports = { createUser, getUserByStaffId, updatePassword };
