const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/add-projects
router.post('/add-projects', async (req, res) => {
  const {
    projectDetails,
    salesDetails,
    stakeholders,
    parts,
    bom,
    
  } = req.body;

  const client = await db.connect();

  try {
    await client.query('BEGIN'); // Start transaction
    const result = await client.query(
      `INSERT INTO projects (project_name, start_date, end_date, customer_name,
        customer_address, customer_contact, order_value, duration,
        kickoff_date, kickoff_status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        projectDetails.project_name,
        projectDetails.start_date,
        projectDetails.end_date,
        projectDetails.customer_name,
        projectDetails.customer_address,
        projectDetails.customer_contact,
        projectDetails.order_value,
        projectDetails.duration,
        projectDetails.kickoff_date,
        projectDetails.kickoff_status
      ]
    );

    const projectId = result.rows[0].id;

    // 2️⃣ Insert into `project_sales`
    await client.query(
      `INSERT INTO project_sales (
        project_id, order_acceptance, customer_indemnity, customer_pbg,
        contract_creation, contract_approval, sale_order_creation,
        sale_order_release, contract_number_date, sale_order_number_date,
        spare1, spare2
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        projectId,
        salesDetails.order_acceptance,
        salesDetails.customer_indemnity,
        salesDetails.customer_pbg,
        salesDetails.contract_creation,
        salesDetails.contract_approval,
        salesDetails.sale_order_creation,
        salesDetails.sale_order_release,
        salesDetails.contract_number_date,
        salesDetails.sale_order_number_date,
        salesDetails.spare1,
        salesDetails.spare2
      ]
    );

    // 3️⃣ Insert into `project_stakeholders`
    await client.query(
      `INSERT INTO project_stakeholders (
        project_id, project_manager, team_members, architect_team, sales_team,
        qa_team, purchase_team, finance_team, customer_name, customer_address, customer_contact
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        projectId,
        stakeholders.project_manager,
        stakeholders.team_members,
        stakeholders.architect_team,
        stakeholders.sales_team,
        stakeholders.qa_team,
        stakeholders.purchase_team,
        stakeholders.finance_team,
        stakeholders.customer_name,
        stakeholders.customer_address,
        stakeholders.customer_contact
      ]
    );

    // 4️⃣ Insert into `project_parts`
    for (const part of parts) {
      await client.query(
        `INSERT INTO project_parts (project_id, item_name, part_number)
         VALUES ($1, $2, $3)`,
        [projectId, part.item_name, part.part_number]
      );
    }

    // 5️⃣ Insert into `project_bom`
    for (const b of bom) {
      await client.query(
        `INSERT INTO project_bom (project_id, bom_details, production_order, mrp_run)
         VALUES ($1, $2, $3, $4)`,
        [projectId, b.bom_details, b.production_order, b.mrp_run]
      );
    }

    await client.query('COMMIT'); // ✅ Commit all inserts
    res.status(200).json({ message: 'Project added successfully' });

  } catch (err) {
    await client.query('ROLLBACK'); // ❌ Roll back on any error
    console.error('Transaction error during project add:', err);
    res.status(500).json({ error: 'Failed to add project' });
  } finally {
    client.release(); // 🔚 Always release the client
  }
});

// 🔹 Route 1: Get all project names (id + name)
router.get('/projects', async (req, res) => {
  try {
    const result = await db.query('SELECT id, project_name FROM projects ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching project names:', err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// 🔹 Route 2: Get full project details by ID
router.get('/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const client = await db.connect();
    await client.query('BEGIN');

    const project = await client.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    const sales = await client.query('SELECT * FROM project_sales WHERE project_id = $1', [projectId]);
    const stakeholders = await client.query('SELECT * FROM project_stakeholders WHERE project_id = $1', [projectId]);
    const parts = await client.query('SELECT * FROM project_parts WHERE project_id = $1', [projectId]);
    const bom = await client.query('SELECT * FROM project_bom WHERE project_id = $1', [projectId]);

    await client.query('COMMIT');
    client.release();

    res.json({
      project: project.rows[0],
      sales: sales.rows,
      stakeholders: stakeholders.rows,
      parts: parts.rows,
      bom: bom.rows,
    });
  } catch (err) {
    console.error('Error fetching full project details:', err);
    res.status(500).json({ message: 'Error retrieving project details' });
  }
});


module.exports = router;
