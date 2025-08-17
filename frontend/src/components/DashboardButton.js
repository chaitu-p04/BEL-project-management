import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";
import "./DashboardButton.css";

const DashboardButton = () => {
  const navigate = useNavigate();

  // Highlight states
  const [barActiveIndex, setBarActiveIndex] = useState(null);
  const [issueActiveIndex, setIssueActiveIndex] = useState(null);
  const [milestoneActiveIndex, setMilestoneActiveIndex] = useState(null);
  const [phaseActiveIndex, setPhaseActiveIndex] = useState(null);

  // Data
  const milestonesData = [
    { id: 1, value: 100 }, { id: 2, value: 90 }, { id: 3, value: 80 },
    { id: 4, value: 70 }, { id: 5, value: 60 }, { id: 6, value: 50 },
    { id: 7, value: 40 }, { id: 8, value: 30 }, { id: 9, value: 40 }, { id: 10, value: 50 },
  ];
  const barColors = ["#999999", "#FF8042"];

  const issuesData = [
    { name: "Green", value: 1 }, { name: "Lime", value: 1 },
    { name: "Blue", value: 1 }, { name: "Magenta", value: 1 },
    { name: "Red", value: 1 }, { name: "Dark Red", value: 1 },
  ];
  const issuesColors = ["#2ECC40", "#01FF70", "#0074D9", "#F012BE", "#FF4136", "#85144b"];

  const milestonesPieData = Array(10).fill({ value: 1 });
  const milestonesPieColors = [
    "#FF0000", "#FF4136", "#2ECC40", "#01FF70", "#0074D9",
    "#B10DC9", "#7FDBFF", "#AAAAAA", "#FFDC00", "#3D9970"
  ];

  const projectPhaseData = [
    { name: "Initiation", value: 5 },
    { name: "Design", value: 10 },
    { name: "Development", value: 15 },
    { name: "Testing", value: 7 },
    { name: "Integration", value: 3 },
    { name: "Closed", value: 20 },
  ];
  const phaseColors = ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800", "#9C27B0"];

  // Reusable handler for highlight toggle
  const handleClick = (index, setter, currentIndex) => {
    setter(currentIndex === index ? null : index);
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="back-button"
      >
        Back
      </button>

      <h1 className="dashboard-title">DASHBOARD</h1>

      {/* Milestone Bar Chart */}
      <h3 className="chart-title">Milestones Achieved</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={milestonesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {milestonesData.map((_, i) => (
              <Cell
                key={`bar-${i}`}
                fill={
                  barActiveIndex === i
                    ? "orange"
                    : barColors[i % barColors.length]
                }
                onClick={() => handleClick(i, setBarActiveIndex, barActiveIndex)}
                cursor="pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="dashboard-row">
        {/* Issues Pie */}
        <div>
          <h3 className="chart-title">Issues Resolved</h3>
          <ResponsiveContainer width={500} height={300}>
            <PieChart>
              <Pie
                data={issuesData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={() => "16.6667%"}
              >
                {issuesData.map((_, i) => (
                  <Cell
                    key={`issue-${i}`}
                    fill={issueActiveIndex === i ? "orange" : issuesColors[i]}
                    onClick={() =>
                      handleClick(i, setIssueActiveIndex, issueActiveIndex)
                    }
                    cursor="pointer"
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

       {/* Milestones Pie*/}
        <div>
          <h3 className="chart-title">Milestones</h3>
          <ResponsiveContainer width={500} height={300}>
            <PieChart>
              <Pie
                data={milestonesPieData} 
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={() => "10%"}
              >
                {milestonesPieData.map((_, i) => (
                  <Cell
                    key={`mile-${i}`}
                    fill={
                      milestoneActiveIndex === i
                        ? "orange"
                        : milestonesPieColors[i]
                    }
                    onClick={() =>
                      handleClick(i, setMilestoneActiveIndex, milestoneActiveIndex)
                    }
                    cursor="pointer"
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        

        {/* Project Phase Pie */}
        <div>
          <h3 className="chart-title">Project Phases</h3>
          <ResponsiveContainer width={500} height={300}>
            <PieChart>
              <Pie
                data={projectPhaseData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {projectPhaseData.map((_, i) => (
                  <Cell
                    key={`phase-${i}`}
                    fill={
                      phaseActiveIndex === i
                        ? "orange"
                        : phaseColors[i]
                    }
                    onClick={() =>
                      handleClick(i, setPhaseActiveIndex, phaseActiveIndex)
                    }
                    cursor="pointer"
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardButton;


