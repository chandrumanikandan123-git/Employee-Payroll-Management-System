import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    // Logout
    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="dashboard-page">

            {/* =========================
                HEADER
            ========================== */}
            <header className="dashboard-header">

                <div className="header-title">
                    <h1>
                        Employee Payroll Management System
                    </h1>

                    <p>
                        Admin Dashboard
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            {/* =========================
                DASHBOARD CONTENT
            ========================== */}
            <main className="dashboard-content">

                <h1 className="welcome-title">
                    Welcome to Admin Dashboard
                </h1>

                <p className="welcome-text">
                    Manage employees, attendance, leave,
                    payroll and payslips from one place.
                </p>


                {/* =========================
                    DASHBOARD CARDS
                ========================== */}
                <div className="dashboard-cards">


                    {/* =====================
                        EMPLOYEES
                    ====================== */}
                    <div className="dashboard-card">

                        <div className="card-icon">
                            👨‍💼
                        </div>

                        <h2>
                            Employees
                        </h2>

                        <p>
                            Manage employee records,
                            salary and joining details.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/employees")
                            }
                        >
                            Manage Employees
                        </button>

                    </div>


                    {/* =====================
                        ATTENDANCE
                    ====================== */}
                    <div className="dashboard-card">

                        <div className="card-icon">
                            🕐
                        </div>

                        <h2>
                            Attendance
                        </h2>

                        <p>
                            Manage employee check-in
                            and check-out attendance.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/attendance")
                            }
                        >
                            Manage Attendance
                        </button>

                    </div>


                    {/* =====================
                        LEAVE REQUESTS
                    ====================== */}
                    <div className="dashboard-card">

                        <div className="card-icon">
                            📝
                        </div>

                        <h2>
                            Leave Requests
                        </h2>

                        <p>
                            View, approve and reject
                            employee leave requests.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/leave-requests")
                            }
                        >
                            Manage Leave
                        </button>

                    </div>


                    {/* =====================
                        PAYROLL
                    ====================== */}
                    <div className="dashboard-card">

                        <div className="card-icon">
                            💰
                        </div>

                        <h2>
                            Payroll
                        </h2>

                        <p>
                            Calculate employee salary,
                            allowances and deductions.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/payroll")
                            }
                        >
                            Manage Payroll
                        </button>

                    </div>


                    {/* =====================
                        PAYSLIP
                    ====================== */}
                    <div className="dashboard-card payslip-card">

                        <div className="card-icon">
                            📄
                        </div>

                        <h2>
                            Payslip
                        </h2>

                        <p>
                            Generate and download
                            employee salary payslips.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/payslip")
                            }
                        >
                            Download Payslip
                        </button>

                    </div>


                </div>

            </main>

        </div>
    );
}

export default Dashboard;