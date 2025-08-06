import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProject from './components/AddProject';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import ProjectDetails from './components/ProjectDetails';
import ProjectPage from './components/ProjectPage';
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/add-projects" element={<AddProject />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
