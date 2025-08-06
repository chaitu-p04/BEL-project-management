import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProject.css';

const AddProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Project details
    project_name: '',
    start_date: '',
    end_date: '',
    customer_name: '',
    customer_address: '',
    customer_contact: '',
    order_value: '',
    duration: '',
    kickoff_date: '',
    kickoff_status: '',

    // Sales details
    order_acceptance: '',
    customer_indemnity: '',
    customer_pbg: '',
    contract_creation: '',
    contract_approval: '',
    sale_order_creation: '',
    sale_order_release: '',
    contract_number_date: '',
    sale_order_number_date: '',
    spare1: '',
    spare2: '',

    // Stakeholders
    project_manager: '',
    team_members: '',
    architect_team: '',
    sales_team: '',
    qa_team: '',
    purchase_team: '',
    finance_team: '',
    stakeholder_customer_name: '',
    stakeholder_customer_address: '',
    stakeholder_customer_contact: '',

    // Parts
    item_name: '',
    part_number: '',

    // BOM
    bom_details: '',
    production_order: '',
    mrp_run: ''
  });

  const [showProject, setShowProject] = useState(true);
  const [showSales, setShowSales] = useState(false);
  const [showStakeholders, setShowStakeholders] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [showBOM, setShowBOM] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-projects', {
        projectDetails: {
          project_name: form.project_name,
          start_date: form.start_date,
          end_date: form.end_date,
          customer_name: form.customer_name,
          customer_address: form.customer_address,
          customer_contact: form.customer_contact,
          order_value: form.order_value,
          duration: form.duration,
          kickoff_date: form.kickoff_date,
          kickoff_status: form.kickoff_status
        },
        salesDetails: {
          order_acceptance: form.order_acceptance,
          customer_indemnity: form.customer_indemnity,
          customer_pbg: form.customer_pbg,
          contract_creation: form.contract_creation,
          contract_approval: form.contract_approval,
          sale_order_creation: form.sale_order_creation,
          sale_order_release: form.sale_order_release,
          contract_number_date: form.contract_number_date,
          sale_order_number_date: form.sale_order_number_date,
          spare1: form.spare1,
          spare2: form.spare2
        },
        stakeholders: {
          project_manager: form.project_manager,
          team_members: form.team_members,
          architect_team: form.architect_team,
          sales_team: form.sales_team,
          qa_team: form.qa_team,
          purchase_team: form.purchase_team,
          finance_team: form.finance_team,
          customer_name: form.stakeholder_customer_name,
          customer_address: form.stakeholder_customer_address,
          customer_contact: form.stakeholder_customer_contact
        },
        parts: [
          {
            item_name: form.item_name,
            part_number: form.part_number
          }
        ],
        bom: [
          {
            bom_details: form.bom_details,
            production_order: form.production_order,
            mrp_run: form.mrp_run
          }
        ]
      });

      alert('✅ Project added successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('❌ Error adding project. Please try again.');
    }
  };

  return (
    <div className="add-project-container">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit} className="project-form">

        {/* Project Details */}
        <fieldset>
          <legend onClick={() => setShowProject(!showProject)}>
            Project Details {showProject ? '▲' : '▼'}
          </legend>
          {showProject && (
            <>
              <label>Project Name</label>
              <input type="text" name="project_name" value={form.project_name} onChange={handleChange} required />

              <label>Start Date</label>
              <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />

              <label>End Date</label>
              <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />

              <label>Customer Name</label>
              <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} />

              <label>Customer Address</label>
              <textarea name="customer_address" value={form.customer_address} onChange={handleChange} />

              <label>Customer Contact</label>
              <input type="text" name="customer_contact" value={form.customer_contact} onChange={handleChange} />

              <label>Order Value</label>
              <input type="number" name="order_value" value={form.order_value} onChange={handleChange} />

              <label>Duration</label>
              <input type="text" name="duration" value={form.duration} onChange={handleChange} />

              <label>Kickoff Date</label>
              <input type="date" name="kickoff_date" value={form.kickoff_date} onChange={handleChange} />

              <label>Kickoff Status</label>
              <input type="text" name="kickoff_status" value={form.kickoff_status} onChange={handleChange} />
            </>
          )}
        </fieldset>

        {/* Sales Details */}
        <fieldset>
          <legend onClick={() => setShowSales(!showSales)}>
            Sales Details {showSales ? '▲' : '▼'}
          </legend>
          {showSales && ([
            "order_acceptance", "customer_indemnity", "customer_pbg",
            "contract_creation", "contract_approval", "sale_order_creation",
            "sale_order_release", "contract_number_date", "sale_order_number_date",
            "spare1", "spare2"
          ].map(field => (
            <div key={field}>
              <label>{field.replaceAll('_', ' ').toUpperCase()}</label>
              <input type="text" name={field} value={form[field]} onChange={handleChange} />
            </div>
          ))) }
        </fieldset>

        {/* Stakeholders */}
        <fieldset>
          <legend onClick={() => setShowStakeholders(!showStakeholders)}>
            Stakeholders {showStakeholders ? '▲' : '▼'}
          </legend>
          {showStakeholders && (
            <>
              {["project_manager", "team_members", "architect_team", "sales_team", "qa_team", "purchase_team", "finance_team"].map(field => (
                <div key={field}>
                  <label>{field.replaceAll('_', ' ').toUpperCase()}</label>
                  <input type="text" name={field} value={form[field]} onChange={handleChange} />
                </div>
              ))}
              <label>Customer Name</label>
              <input type="text" name="stakeholder_customer_name" value={form.stakeholder_customer_name} onChange={handleChange} />

              <label>Customer Address</label>
              <textarea name="stakeholder_customer_address" value={form.stakeholder_customer_address} onChange={handleChange} />

              <label>Customer Contact</label>
              <input type="text" name="stakeholder_customer_contact" value={form.stakeholder_customer_contact} onChange={handleChange} />
            </>
          )}
        </fieldset>

        {/* Parts */}
        <fieldset>
          <legend onClick={() => setShowParts(!showParts)}>
            Parts {showParts ? '▲' : '▼'}
          </legend>
          {showParts && (
            <>
              <label>Item Name</label>
              <input type="text" name="item_name" value={form.item_name} onChange={handleChange} />

              <label>Part Number</label>
              <input type="text" name="part_number" value={form.part_number} onChange={handleChange} />
            </>
          )}
        </fieldset>

        {/* BOM */}
        <fieldset>
          <legend onClick={() => setShowBOM(!showBOM)}>
            BOM {showBOM ? '▲' : '▼'}
          </legend>
          {showBOM && (
            <>
              <label>BOM Details</label>
              <textarea name="bom_details" value={form.bom_details} onChange={handleChange} />

              <label>Production Order</label>
              <input type="text" name="production_order" value={form.production_order} onChange={handleChange} />

              <label>MRP Run</label>
              <input type="text" name="mrp_run" value={form.mrp_run} onChange={handleChange} />
            </>
          )}
        </fieldset>

        <button type="submit">Save Project</button>
      </form>
    </div>
  );
};

export default AddProject;
