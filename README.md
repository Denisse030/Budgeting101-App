# Budgeting101 💸

A multi-user budgeting web application built with React that helps users track expenses, manage budgets, and visualize spending trends — all in a sleek, responsive interface.

## 🚀 Features

- **Multi-User Support**: Create and switch between multiple users with personalized data.
- **Persistent Data**: Budgets and expenses are stored in localStorage per user.
- **Budget & Expense Management**: Create custom budgets and assign expenses with ease.
- **Real-Time Alerts**: Get notified when 80% of a budget is used or when it's fully spent.
- **Spending Insights Dashboard**: Visualize financial activity with interactive pie, bar, and line charts using Recharts.
- **Dark Mode**: Toggle between light and dark themes, saved across sessions.
- **Responsive UI**: Optimized for both desktop and mobile devices.

## 🧪 Tech Stack

- **Frontend**: React, JavaScript, React Router
- **Styling**: CSS (custom variables and utility classes)
- **Data Visualization**: Recharts
- **State Management**: React hooks and localStorage

## 📂 Project Structure
```
├── src
│   ├── components     // Reusable UI components
│   ├── pages          // Main route pages (Dashboard, Insights, Expenses)
│   ├── layouts        // Main layout wrapper
│   ├── actions        // Route-based actions (e.g. logout, deleteBudget)
│   ├── assets         // Static images (e.g. illustration)
│   ├── helpers.js     // Utility functions
│   ├── App.jsx        // Root component with routes
│   └── index.css      // Global styles
```

## 🛠 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/Denisse030/Budgeting101-App.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the app**
```bash
npm run dev
```

4. **Open in your browser**
```
http://localhost:5173/
```

## 🙌 Author

Developed by [Denisse Benito](https://github.com/Denisse030) 🧠💻

## Acknowledgments
This project was inspired from Net Ninja on YouTube. Watch the tutorial [here](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iNnY07bh_UPaRIQZcJfARY/)!

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to fork and customize this app for your own budgeting needs! 🎯
