import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPassword from './components/ResetPassword';
import SuccessMessage from './components/SuccessMessage';
import ProjectDisplay from './components/projectdisplay';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<SuccessMessage />} />
        <Route path="/project-display" element={<ProjectDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
