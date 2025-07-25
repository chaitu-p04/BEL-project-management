import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPassword from './components/ResetPassword';
import SuccessMessage from './components/SuccessMessage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<SuccessMessage />} />
      </Routes>
    </Router>
  );
}

export default App;
