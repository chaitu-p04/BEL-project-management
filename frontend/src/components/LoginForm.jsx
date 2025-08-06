import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import belLogo from '../assets/bel_logo.jpg';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const [showStaffId, setShowStaffId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    const usernameRegex = /^[a-zA-Z]{5,15}$/;
    const staffIdRegex = /^[0-9]{6,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,15}$/;

    if (!usernameRegex.test(username)) {
      alert("Username must be only letters and 5-15 characters long.");
      return false;
    }

    if (!staffIdRegex.test(staffId)) {
      alert("Staff ID must be only numbers and 6-10 digits long.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must be 8-15 characters long and include:\n1 uppercase, 1 lowercase, 1 number, 1 special character.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        staff_id: staffId,
        password
      });

      if (response.data.success) {
  alert('Login successful!');
  

  navigate('/dashboard'); // ✅ redirect to dashboard
} else {
  alert(response.data.message || 'Login failed.');
}

      
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Invalid credentials");
      } else {
        console.error("Login error:", err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/register" className="register-link">Register</Link><br />
        <h2><center className="login-title">Login</center></h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Staff Number</label>
        <div className="input-wrapper">
          <input
            type={showStaffId ? "text" : "password"}
            placeholder="Enter Staff Number"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowStaffId(!showStaffId)}>👁</span>
        </div>

        <label>Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>

        <small className="password-hint">
          Must include 1 capital, 1 small letter, 1 number, 1 special character<br />
        </small><br />

        <button className="login-btn" onClick={handleLogin}>Login</button>

        <Link to="/reset-password" className="forgot-link">Forgot Password?</Link>
      </div>

      <div className="login-side">
        <img src={belLogo} alt="BEL Logo" className="bel_logo" />
        <h2 className="site-title"><b>Project Management</b> <br />Website</h2>
      </div>
    </div>
  );
}

export default LoginForm;
