import { db, seedDefaults } from "./db";
import { v4 as uuidv4 } from "uuid";

export const LocalAPI = {
  async getCurrentBudgetMonth() {
    let month = new Date().toISOString().slice(0, 7); // YYYY-MM
    let record = await db.budget_months.where({ month }).first();
    if (!record) {
      const id = uuidv4();
      await db.budget_months.add({ id, month });
      record = await db.budget_months.where({ month }).first();
    }
    return record;
  },

  async initializeDefaults(budgetMonthId) {
    await seedDefaults(budgetMonthId);
  },

  async getBudgetSummary(budgetMonthId) {
    const incomes = await db.incomes.where({ budget_month_id: budgetMonthId }).toArray();
    const accounts = await db.bank_accounts.where({ budget_month_id: budgetMonthId }).toArray();

    const total_income = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    const total_expenses = 0; // expand later
    const leftover = total_income - total_expenses;

    return { total_income, total_expenses, leftover };
  },

  async listBankAccounts(budgetMonthId) {
    return await db.bank_accounts.where({ budget_month_id: budgetMonthId }).toArray();
  }
};