import axios from 'axios'; // ✅ axios imported
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import belLogo from '../assets/bel_logo.jpg';
import './LoginForm.css';

function ResetPassword() {
  const [showStaffId, setShowStaffId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigate = useNavigate();

  const validateInputs = () => {
    const staffIdRegex = /^[0-9]{6,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,15}$/;

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

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', {
        staff_id: staffId,
        password: password,
      });

      if (response.data.success) {
        alert("Password reset successful!");
        navigate('/');
      } else {
        alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("Invalid Staff No.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2><center className="login-title">Reset Password</center></h2>

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

        <button className="login-btn" onClick={handleRegister}>Reset</button>
      </div>

      <div className="login-side">
        <img src={belLogo} alt="BEL Logo" className="bel_logo" />
        <h2 className="site-title"><b>Project Management</b> <br />Website</h2>
      </div>
    </div>
  );
}

export default ResetPassword;
