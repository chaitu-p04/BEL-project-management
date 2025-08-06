// components/ProjectPage.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import Sidebar from './Sidebar';

function ProjectPage() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(res => setProjectData(res.data))
      .catch(err => console.error('Error loading project details:', err));
  }, [id]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <ProjectDetails projectData={projectData} />
      </div>
    </div>
  );
}

export default ProjectPage;
