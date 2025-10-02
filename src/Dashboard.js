import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ currentBudgetMonth }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Budget Flow</h1>
      <p>Current Month: {currentBudgetMonth.month}</p>
      <Link to="/budget">Go to Budget</Link>
    </div>
  );
}