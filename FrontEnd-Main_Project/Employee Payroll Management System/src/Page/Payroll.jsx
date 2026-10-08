import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payroll.css";

function Payroll() {

    const [employees, setEmployees] = useState([]);

    const [employeeId, setEmployeeId] = useState("");
    const [month, setMonth] = useState(10);
    const [year, setYear] = useState(2026);
    const [basicSalary, setBasicSalary] = useState("");
    const [allowances, setAllowances] = useState("");
    const [deductions, setDeductions] = useState("");

    const [grossSalary, setGrossSalary] = useState(0);
    const [netSalary, setNetSalary] = useState(0);

    const [message, setMessage] = useState("");

    // Load employees from backend
    useEffect(() => {

        axios.get("http://localhost:8088/api/employees")
            .then((response) => {
                console.log("Employees:", response.data);
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Failed to load employees:", error);
            });

    }, []);

    // Calculate salary automatically
    useEffect(() => {

        const basic = Number(basicSalary) || 0;
        const allow = Number(allowances) || 0;
        const deduct = Number(deductions) || 0;

        const gross = basic + allow;
        const net = gross - deduct;

        setGrossSalary(gross);
        setNetSalary(net);

    }, [basicSalary, allowances, deductions]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!employeeId) {
            alert("Please select an employee");
            return;
        }

        if (!basicSalary) {
            alert("Please enter basic salary");
            return;
        }

        const payrollData = {
            employee: {
                id: Number(employeeId)
            },
            month: Number(month),
            year: Number(year),
            basicSalary: Number(basicSalary),
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0
        };

        console.log("Sending payroll:", payrollData);

        try {

            const response = await axios.post(
                "http://localhost:8088/api/payroll",
                payrollData
            );

            console.log("Payroll response:", response.data);

            setMessage("Payroll added successfully!");

            // Clear form
            setEmployeeId("");
            setMonth(10);
            setYear(2026);
            setBasicSalary("");
            setAllowances("");
            setDeductions("");

        } catch (error) {

            console.error("Payroll error:", error);

            setMessage("Failed to add payroll");

        }
    };


    return (
        <div className="payroll-page">

            <div className="payroll-container">

                <h1>Payroll Management</h1>

                <p className="payroll-subtitle">
                    Calculate and manage employee salary
                </p>

                {message && (
                    <div className="payroll-message">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Employee */}
                    <div className="form-group">

                        <label>Employee</label>

                        <select
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        >

                            <option value="">
                                -- Select Employee --
                            </option>

                            {employees.map((employee) => (

                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.name} - {employee.email}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Month */}
                    <div className="form-group">

                        <label>Month</label>

                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >

                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>

                        </select>

                    </div>


                    {/* Year */}
                    <div className="form-group">

                        <label>Year</label>

                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />

                    </div>


                    {/* Basic Salary */}
                    <div className="form-group">

                        <label>Basic Salary</label>

                        <input
                            type="number"
                            placeholder="Enter basic salary"
                            value={basicSalary}
                            onChange={(e) => setBasicSalary(e.target.value)}
                        />

                    </div>


                    {/* Allowances */}
                    <div className="form-group">

                        <label>Allowances</label>

                        <input
                            type="number"
                            placeholder="Enter allowances"
                            value={allowances}
                            onChange={(e) => setAllowances(e.target.value)}
                        />

                    </div>


                    {/* Deductions */}
                    <div className="form-group">

                        <label>Deductions</label>

                        <input
                            type="number"
                            placeholder="Enter deductions"
                            value={deductions}
                            onChange={(e) => setDeductions(e.target.value)}
                        />

                    </div>


                    {/* Salary Calculation */}
                    <div className="salary-summary">

                        <div>
                            <span>Gross Salary</span>
                            <strong>₹ {grossSalary.toFixed(2)}</strong>
                        </div>

                        <div>
                            <span>Net Salary</span>
                            <strong>₹ {netSalary.toFixed(2)}</strong>
                        </div>

                    </div>


                    <button
                        type="submit"
                        className="payroll-button"
                    >
                        Generate Payroll
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Payroll;