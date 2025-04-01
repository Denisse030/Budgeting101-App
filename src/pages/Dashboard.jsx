import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { useEffect } from "react";

// ✅ Loader
export function dashboardLoader() {
  const userName = JSON.parse(localStorage.getItem("activeUser"));
  if (!userName) return { userName: null, budgets: [], expenses: [] };

  const budgets = fetchData("budgets", userName) ?? [];
  const expenses = fetchData("expenses", userName) ?? [];

  return { userName, budgets, expenses };
}


// ✅ Action
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data)

  if (_action === "newUser") {
    try {
      const userName = values.userName;

      // Set active user
      localStorage.setItem("activeUser", JSON.stringify(userName));

      // Add to list of users
      const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
      if (!allUsers.includes(userName)) {
        allUsers.push(userName);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }

      toast.success(`Welcome, ${userName}!`);
      return null;
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

// ✅ Component
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  const shownAlerts = new Set();

  useEffect(() => {
    budgets?.forEach(budget => {
      const totalSpent = expenses
        .filter(exp => exp.budgetId === budget.id)
        .reduce((sum, exp) => sum + exp.amount, 0);

      const percentageSpent = totalSpent / budget.amount;

      if (percentageSpent >= 1 && !shownAlerts.has(`${budget.id}-100`)) {
        toast.error(`You’ve gone over your "${budget.name}" budget! 💸`);
        shownAlerts.add(`${budget.id}-100`);
      } else if (percentageSpent >= 0.8 && !shownAlerts.has(`${budget.id}-80`)) {
        toast.warn(`You’ve used 80% of your "${budget.name}" budget.`);
        shownAlerts.add(`${budget.id}-80`);
      }
    });
  }, [budgets, expenses]);

  if (!userName) return <Intro />;

  return (
    <div className="dashboard">
      <h1>Welcome back, <span className="accent">{userName}</span></h1>
      <div className="grid-sm">
        {budgets.length > 0 ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
            </div>
            {expenses.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table expenses={expenses
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 8)} />
                {expenses.length > 8 && (
                  <Link to="expenses" className="btn btn--dark">
                    View all expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
