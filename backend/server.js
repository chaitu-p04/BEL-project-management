// server.js
const express = require('express');
const cors = require('cors');
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

const bcrypt = require('bcrypt');
const { Pool } = require('pg');


const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // so final route is /api/register


const port = 5000;



// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',         // change if your pgAdmin uses a different user
  host: 'localhost',
  database: 'bel_project',  // ✅ your database name
  password: 'your_password', // replace with your actual pgAdmin password
  port: 5432,
});

// ========== ROUTES ========== //

// 🚀 Register Route
app.post('/register', async (req, res) => {
  const { username, staffId, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await pool.query('SELECT * FROM users WHERE staff_id = $1', [staffId]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query(
      'INSERT INTO users (username, staff_id, password) VALUES ($1, $2, $3)',
      [username, staffId, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 Login Route
app.post('/api/login', async (req, res) => {
  const { username, staffId, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1 AND staff_id = $2', [username, staffId]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔁 Reset Password Route
app.post('/api/reset-password', async (req, res) => {
  const { staffId, newPassword } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE staff_id = $1', [staffId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Staff ID not found' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      'UPDATE users SET password = $1 WHERE staff_id = $2',
      [hashedNewPassword, staffId]
    );

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error during password reset:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
