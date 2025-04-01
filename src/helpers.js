export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// Get current active user
const getUser = () => JSON.parse(localStorage.getItem("activeUser"));

// colors
export const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
  const saturation = 70; // Fixed saturation for pastel colors
  const lightness = 85; // Fixed lightness for pastel colors
  return `${hue} ${saturation}% ${lightness}%`; // HSL format
};

// Local storage
export const fetchData = (key, user) => {
  return JSON.parse(localStorage.getItem(`${key}-${user}`));
};

export const saveData = (key, data, user) => {
  return localStorage.setItem(`${key}-${user}`, JSON.stringify(data));
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const user = getUser();
  const data = fetchData(category, user) ?? [];
  return data.filter((item) => item[key] === value);
};

// Delete item from localStorage
export const deleteItem = ({ key, id }) => {
  const user = getUser();
  const existingData = fetchData(key, user);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return saveData(key, newData, user);
  }
  return localStorage.removeItem(`${key}-${user}`);
};

// Create budget
export const createBudget = ({ name, amount }) => {
  const user = getUser();
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets", user) ?? [];
  return saveData("budgets", [...existingBudgets, newItem], user);
};

// Create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const user = getUser();
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId,
  };
  const existingExpenses = fetchData("expenses", user) ?? [];
  return saveData("expenses", [...existingExpenses, newItem], user);
};

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const user = getUser();
  const expenses = fetchData("expenses", user) ?? [];
  return expenses
    .filter(expense => expense.budgetId === budgetId)
    .reduce((acc, expense) => acc + expense.amount, 0);
};

// Formatting
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

export const formatPercentage = (amt) =>
  amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });

export const formatCurrency = (amt) =>
  amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
