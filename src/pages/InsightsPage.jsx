import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid
  } from "recharts";
  import { fetchData, formatCurrency } from "../helpers";
  
  // 🌿 Pastel green shades
  const COLORS = [
    "#A8D5BA", // mint
    "#C2EABD", // light green
    "#DFF5E1", // very light
    "#B6E2D3", // soft teal
    "#C0E8D5", // pale sage
    "#A3D9A5"  // pastel grass green
  ];
  
  const InsightsPage = () => {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user) return <p>Please select or create a user to view insights.</p>;
  
    const budgets = fetchData("budgets", user) ?? [];
    const expenses = fetchData("expenses", user) ?? [];
  
    const isDark = document.documentElement.classList.contains("dark");
    const chartTextColor = isDark ? "#FFFFFF" : "#000000";
  
    const totalBudgeted = budgets.reduce((acc, b) => acc + b.amount, 0);
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const netBalance = totalBudgeted - totalSpent;
  
    const spendingByBudget = budgets.map((budget) => {
      const spent = expenses
        .filter((exp) => exp.budgetId === budget.id)
        .reduce((acc, curr) => acc + curr.amount, 0);
      return {
        name: budget.name,
        value: spent,
      };
    });
  
    const highestSpendingCategory = spendingByBudget.reduce((max, current) => {
      return current.value > max.value ? current : max;
    }, { name: "None", value: 0 });
  
    const monthlySpending = {};
    expenses.forEach((exp) => {
      const date = new Date(exp.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthlySpending[key] = (monthlySpending[key] ?? 0) + exp.amount;
    });
  
    const monthlyData = Object.entries(monthlySpending).map(([month, value]) => ({
      month,
      value
    }));
  
    return (
      <div className="grid-lg">
        <h1>Spending Insights</h1>
        <div className="grid-md">
          <p><strong>Total Budgeted:</strong> {formatCurrency(totalBudgeted)}</p>
          <p><strong>Total Spent:</strong> {formatCurrency(totalSpent)}</p>
          <p><strong>Net Balance:</strong> {formatCurrency(netBalance)}</p>
          <p><strong>Top Spending Category:</strong> {highestSpendingCategory.name} ({formatCurrency(highestSpendingCategory.value)})</p>
        </div>
  
        {/* Pie Chart */}
        <h2>Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={spendingByBudget}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {spendingByBudget.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{
              backgroundColor: isDark ? "#1e1e1e" : "#f5fffa",
              color: chartTextColor
            }} />
          </PieChart>
        </ResponsiveContainer>
  
        {/* Bar Chart */}
        <h2>Spending by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={spendingByBudget}>
            <XAxis
              dataKey="name"
              tick={{ fill: chartTextColor }}
              axisLine={{ stroke: chartTextColor }}
              tickLine={{ stroke: chartTextColor }}
            />
            <YAxis
              tick={{ fill: chartTextColor }}
              axisLine={{ stroke: chartTextColor }}
              tickLine={{ stroke: chartTextColor }}
            />
            <Tooltip contentStyle={{
              backgroundColor: isDark ? "#1e1e1e" : "#f5fffa",
              color: chartTextColor
            }} />
            <Bar dataKey="value">
              {spendingByBudget.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
  
        {/* Line Chart */}
        <h2>Monthly Spending Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
            <XAxis
              dataKey="month"
              tick={{ fill: chartTextColor }}
              axisLine={{ stroke: chartTextColor }}
              tickLine={{ stroke: chartTextColor }}
            />
            <YAxis
              tick={{ fill: chartTextColor }}
              axisLine={{ stroke: chartTextColor }}
              tickLine={{ stroke: chartTextColor }}
            />
            <Tooltip contentStyle={{
              backgroundColor: isDark ? "#1e1e1e" : "#f5fffa",
              color: chartTextColor
            }} />
            <Line type="monotone" dataKey="value" stroke="#A3D9A5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default InsightsPage;
  