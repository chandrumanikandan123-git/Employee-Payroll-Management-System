import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {

    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    // Temporary registration
    // Backend connection will be added later

    alert("Registration Successful!");

    navigate("/login");
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        {/* Application Name */}

        <h1 className="app-title">
          Employee Payroll
        </h1>


        {/* Register Heading */}

        <h2 className="auth-title">
          Register
        </h2>


        {/* Register Form */}

        <form onSubmit={handleRegister}>

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


          {/* Register Button */}

          <button
            type="submit"
            className="auth-button"
          >
            Register
          </button>

        </form>


        {/* Login Link */}

        <p className="auth-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;