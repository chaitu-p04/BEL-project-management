import { useState } from 'react';
import './projectdisplay.css';

function ProjectDisplay() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 'BEL–2024–001', name: 'Radar System', start: 'Jan 2024', status: 'Active', assigned: 'Rajesh Kumar' },
    { id: 'BEL–2024–002', name: 'Communication Network', start: 'Feb 2024', status: 'Planning', assigned: 'Priya Sharma' },
    { id: 'BEL–2024–003', name: 'E-Warfare', start: 'Mar 2024', status: 'Completed', assigned: 'Amit Singh' },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>Project Management</h1>
        <button className="logout" onClick={() => window.location.href = '/'}>Logout</button>
      </header>

      <div className="main">
        <aside className="sidebar">
          <h2>Projects</h2>
          <ul>
            {projects.map(project => (
              <li key={project.id} onClick={() => setSelectedProject(project)}>
                {project.name}
              </li>
            ))}
          </ul>
        </aside>

        <section className="project-details">
          {selectedProject ? (
            <table>
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Name</th>
                  <th>Start</th>
                  <th>Status</th>
                  <th>Assigned</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedProject.id}</td>
                  <td>{selectedProject.name}</td>
                  <td>{selectedProject.start}</td>
                  <td>{selectedProject.status}</td>
                  <td>{selectedProject.assigned}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Select a project to view details</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProjectDisplay;
