// components/ProjectDetails.js
import './ProjectDetails.css';

function ProjectDetails({ projectData }) {
  if (!projectData) return <p className="loading-text">Loading project details...</p>;

  const { project, sales, stakeholders, parts, bom } = projectData;

  return (
    <div className="project-details-container">
      <h2 className="section-title">📋 Project {project.project_name} Details</h2>

      <div className="section">
        <table className="details-table">
          <tbody>
            <tr>
              <th>📅 Start Date</th>
              <td>{project.start_date || 'N/A'}</td>
              <th>📅 End Date</th>
              <td>{project.end_date || 'N/A'}</td>
            </tr>
            <tr>
              <th>👤 Customer Name</th>
              <td>{project.customer_name || 'N/A'}</td>
              <th>🏠 Address</th>
              <td>{project.customer_address || 'N/A'}</td>
            </tr>
            <tr>
              <th>📞 Contact</th>
              <td>{project.customer_contact || 'N/A'}</td>
              <th>💰 Order Value</th>
              <td>{project.order_value || 'N/A'}</td>
            </tr>
            <tr>
              <th>⏳ Duration</th>
              <td>{project.duration || 'N/A'}</td>
              <th>🚀 Kickoff Date</th>
              <td>{project.kickoff_date || 'N/A'}</td>
            </tr>
            <tr>
              <th>✅ Kickoff Status</th>
              <td colSpan="3">{project.kickoff_status || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>🛒 Sales Details</h3>
        {sales.length > 0 ? (
          <table className="details-table">
            <tbody>
              {Object.entries(sales[0]).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No sales data available</p>
        )}
      </div>

      <div className="section">
        <h3>👥 Stakeholders</h3>
        {stakeholders.length > 0 ? (
          <table className="details-table">
            <tbody>
              {Object.entries(stakeholders[0]).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No stakeholder data available</p>
        )}
      </div>

      <div className="section">
        <h3>⚙️ Parts</h3>
        {parts.length > 0 ? (
          <table className="details-table">
            <thead>
              <tr>
                {Object.keys(parts[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parts.map((part, index) => (
                <tr key={index}>
                  {Object.values(part).map((value, i) => (
                    <td key={i}>{value || 'N/A'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No parts data available</p>
        )}
      </div>

      <div className="section">
        <h3>📦 Bill of Materials (BOM)</h3>
        {bom.length > 0 ? (
          <table className="details-table">
            <thead>
              <tr>
                {Object.keys(bom[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bom.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, i) => (
                    <td key={i}>{value || 'N/A'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No BOM data available</p>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;