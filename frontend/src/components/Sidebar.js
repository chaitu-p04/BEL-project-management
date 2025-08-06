// components/Sidebar.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const handleLogout = () => {
    // Clear user-related data here if needed (e.g. localStorage.clear())
    navigate('/'); // Redirect to login or home
  };

  return (
    <div style={{
      width: '260px',
      background: '#eaf3ff',
      padding: '20px',
      height: '100vh',
      borderRight: '2px solid #ccc',
      boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h2 style={{
          marginBottom: '20px',
          fontSize: '20px',
          color: '#2b3e5e',
          borderBottom: '2px solid #aac4e9',
          paddingBottom: '10px'
        }}>
          📁 Projects
        </h2>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {projects.map(project => (
            <li key={project.id} style={{
              background: '#fff',
              padding: '10px 12px',
              marginBottom: '10px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <Link
                to={`/projects/${project.id}`}
                style={{
                  textDecoration: 'none',
                  color: '#0077cc',
                  fontWeight: '500'
                }}
              >
                📂 {project.project_name}
              </Link>
            </li>
          ))}

          <li style={{ marginTop: '30px', textAlign: 'center' }}>
            <Link
              to="/add-projects"
              style={{
                textDecoration: 'none',
                color: '#fff',
                background: '#0077cc',
                padding: '10px 14px',
                borderRadius: '6px',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
            >
              ➕ Add Project
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px',
          background: '#ff4d4d',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;
