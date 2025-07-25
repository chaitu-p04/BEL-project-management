import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import belLogo from '../assets/bel_logo.jpg';
import './LoginForm.css';

function RegisterForm() {
  const [showStaffId, setShowStaffId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [username, setUsername] = useState('');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    const usernameRegex = /^[a-zA-Z]{5,15}$/;
    const staffIdRegex = /^[0-9]{6,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,15}$/;

    if (!usernameRegex.test(username)) {
      alert("Username must be only letters and 5–15 characters long.");
      return false;
    }

    if (!staffIdRegex.test(staffId)) {
      alert("Staff ID must be only numbers and 6–10 digits long.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must be 8–15 characters and include:\n1 uppercase, 1 lowercase, 1 number, 1 special character.");
      return false;
    }

    if (password !== rePassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        staff_id: staffId, // ✅ matches backend key name
        password
      });

      if (response.data.success) {
        alert(response.data.message); // e.g., "User registered successfully"
        navigate('/');
      } else {
        alert(response.data.message); // e.g., "User already exists"
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2><center className="login-title">Register</center></h2>

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

        <label>Enter Password</label>
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>

        <label>Re-enter Password</label>
        <div className="input-wrapper">
          <input
            type={showRePassword ? "text" : "password"}
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowRePassword(!showRePassword)}>👁</span>
        </div>

        <small className="password-hint">
          Must include 1 capital, 1 small letter, 1 number, 1 special character<br />
        </small><br />

        <button className="login-btn" onClick={handleRegister}>Register</button>

        <p style={{ marginTop: '10px' }}>
          Already have an account? <Link to="/" className="forgot-link">Login</Link>
        </p>
      </div>

      <div className="login-side">
        <img src={belLogo} alt="BEL Logo" className="bel_logo" />
        <h2 className="site-title"><b>Project Management</b> <br />Website</h2>
      </div>
    </div>
  );
}

export default RegisterForm;
