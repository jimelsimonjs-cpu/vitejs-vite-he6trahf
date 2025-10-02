import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import BudgetView from "./BudgetView";
import { LocalAPI } from "./lib/localApi";

function App() {
  const [currentBudgetMonth, setCurrentBudgetMonth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentBudgetMonth();
  }, []);

  const fetchCurrentBudgetMonth = async () => {
    const data = await LocalAPI.getCurrentBudgetMonth();
    setCurrentBudgetMonth(data);
    await LocalAPI.initializeDefaults(data.id);
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard currentBudgetMonth={currentBudgetMonth} />}
        />
        <Route
          path="/budget"
          element={<BudgetView currentBudgetMonth={currentBudgetMonth} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;