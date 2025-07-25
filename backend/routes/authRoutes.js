const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); // PostgreSQL pool instance

// Login Route
router.post('/login', async (req, res) => {
  const { username, staff_id, password } = req.body;

  if (!username || !staff_id || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1 AND staff_id = $2', [username, staff_id]);

    if (user.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    res.json({ success: true, message: 'Login successful.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Register Route
router.post('/register', async (req, res) => {
  const { username, staff_id, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR staff_id = $2',
      [username, staff_id]
    );

    if (userExists.rows.length > 0) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into DB
    await pool.query(
      'INSERT INTO users (username, staff_id, password) VALUES ($1, $2, $3)',
      [username, staff_id, hashedPassword]
    );

    return res.json({ success: true, message: 'Registration successful' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
  console.log("REGISTER endpoint hit");

});

router.post('/reset-password', async (req, res) => {
  const { staff_id, password } = req.body;

  if (!staff_id || !password) {
    return res.status(400).json({ success: false, message: 'Missing staff ID or password.' });
  }

  try {
    // Check if user exists
    const userResult = await pool.query('SELECT * FROM users WHERE staff_id = $1', [staff_id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Staff ID not found.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await pool.query(
      'UPDATE users SET password = $1 WHERE staff_id = $2',
      [hashedPassword, staff_id]
    );

    return res.json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;