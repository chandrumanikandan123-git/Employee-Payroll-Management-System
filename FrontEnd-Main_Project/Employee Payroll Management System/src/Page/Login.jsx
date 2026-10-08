import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    // Temporary login
    // Backend connection will be added later

    navigate("/dashboard");
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        {/* Application Name */}

        <h1 className="app-title">
          Employee Payroll
        </h1>


        {/* Login Heading */}

        <h2 className="auth-title">
          Login
        </h2>


        {/* Login Form */}

        <form onSubmit={handleLogin}>

          {/* Username */}

          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>


        {/* Register Link */}

        <p className="auth-link">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;