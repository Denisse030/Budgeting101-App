import { Form, NavLink, useLocation, useNavigate } from "react-router-dom";
import { TrashIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import logomark from "../assets/logomark.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [activeUser, setActiveUser] = useState(null);

  // ✅ Sync activeUser from localStorage every time the location changes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("activeUser"));
    setActiveUser(storedUser);
  }, [location]);

  // ✅ Apply dark mode on toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ Handle user switch (to new user only)
  const handleUserSwitch = (e) => {
    const selected = e.target.value;

    if (selected === "__new") {
      localStorage.removeItem("activeUser");
      toast.info("Switched to new user mode.");
      window.location.href = "/";
    }
  };

  return (
    <nav>
      {/* Left section: logo and links */}
      <div className="flex-sm">
        <NavLink to="/" aria-label="Go to home">
          <span>💰 Budgeting101</span>
        </NavLink>
        <NavLink to="/insights">📊 Insights</NavLink>
      </div>

      {/* Right section: actions */}
      <div className="flex-sm">
        {/* Theme toggle */}
        <button className="btn btn--outline" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon width={20} /> : <MoonIcon width={20} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* ✅ Dropdown showing active user */}
        {activeUser && (
          <select
            onChange={handleUserSwitch}
            value={activeUser}
            className="btn btn--outline"
          >
            <option value={activeUser}>👤 {activeUser}</option>
            <option value="__new">➕ New User</option>
          </select>
        )}

        {/* Delete User */}
        {activeUser && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm(`Delete all data for ${activeUser}?`)) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User 🗑️</span>
            </button>
          </Form>
        )}
      </div>
    </nav>
  );
};

export default Nav;
