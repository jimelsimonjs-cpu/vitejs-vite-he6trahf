import Dexie from "dexie";

export const db = new Dexie("budgetflow");
db.version(1).stores({
  budget_months: "++id, month",
  incomes: "++id, budget_month_id",
  bank_accounts: "++id, budget_month_id"
});

// Seed function for initial data
export async function seedDefaults(monthId) {
  const count = await db.incomes.where({ budget_month_id: monthId }).count();
  if (count === 0) {
    await db.incomes.add({
      budget_month_id: monthId,
      source: "Job",
      amount: 0
    });
  }
  const acctCount = await db.bank_accounts
    .where({ budget_month_id: monthId })
    .count();
  if (acctCount === 0) {
    await db.bank_accounts.add({
      budget_month_id: monthId,
      account_name: "Checking",
      ending_balance: 0
    });
  }
}