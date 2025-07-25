// controllers/authController.js
const pool = require('../db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, staff_id, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, staff_id, password) VALUES ($1, $2, $3) RETURNING *',
      [username, staff_id, hashedPassword]
    );
    res.status(201).json({ user: result.rows[0], message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Staff ID already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

const login = async (req, res) => {
  const { username, staff_id, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE staff_id = $1', [staff_id]);
    const user = result.rows[0];

    if (!user || user.username !== username) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { username, staff_id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { staff_id, newPassword } = req.body;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE staff_id = $2 RETURNING *',
      [hashed, staff_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Staff ID not found' });
    }

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register, login, resetPassword };
