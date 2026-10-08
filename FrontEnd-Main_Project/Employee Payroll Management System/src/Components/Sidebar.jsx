import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>Payroll</h2>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/employees">
        Employees
      </Link>

      <Link to="/attendance">
        Attendance
      </Link>

      <Link to="/leave-requests">
        Leave Requests
      </Link>

      <Link to="/payroll">
        Payroll
      </Link>

      <Link to="/login">
        Logout
      </Link>

    </div>
  );
}

export default Sidebar;