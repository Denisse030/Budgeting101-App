import { Form, useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.jpg";
import { useEffect, useState } from "react";

const Intro = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    setAllUsers(users);
  }, []);

  // Handle login for existing users
  const handleLogin = (e) => {
    const selected = e.target.value;
    if (selected) {
      localStorage.setItem("activeUser", JSON.stringify(selected));
      navigate("/");
    }
  };

  return (
    <div className="intro">
      <div>
        <h1>
          Welcome to <span className="accent">Budgeting 101!</span>
        </h1>
        <p>
          Personal budgeting is the key to achieving financial freedom. Begin your adventure today!
        </p>

        {/* ✅ New User Form */}
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>

        {/* ✅ Existing User Login Dropdown */}
        {allUsers.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="login-user" style={{ fontWeight: "bold" }}>
              Already have an account?
            </label>
            <div className="flex-sm" style={{ marginTop: "0.5rem" }}>
              <select
                id="login-user"
                onChange={handleLogin}
                defaultValue=""
                className="btn btn--outline"
              >
                <option value="" disabled>Select your name</option>
                {allUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
