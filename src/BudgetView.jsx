import React, { useEffect, useState } from "react";
import { LocalAPI } from "./lib/localApi";

export default function BudgetView({ currentBudgetMonth }) {
  const [summary, setSummary] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    load();
  }, [currentBudgetMonth]);

  const load = async () => {
    const s = await LocalAPI.getBudgetSummary(currentBudgetMonth.id);
    const a = await LocalAPI.listBankAccounts(currentBudgetMonth.id);
    setSummary(s);
    setAccounts(a);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Budget Summary</h2>
      {summary && (
        <ul>
          <li>Total Income: {summary.total_income}</li>
          <li>Total Expenses: {summary.total_expenses}</li>
          <li>Leftover: {summary.leftover}</li>
        </ul>
      )}
      <h3>Bank Accounts</h3>
      <ul>
        {accounts.map(a => (
          <li key={a.id}>
            {a.account_name}: ${a.ending_balance}
          </li>
        ))}
      </ul>
    </div>
  );
}
