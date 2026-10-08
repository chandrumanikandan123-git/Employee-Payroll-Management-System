import React, { useEffect, useState } from "react";
import axios from "axios";

function Leave() {

    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);

    const [employeeId, setEmployeeId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        loadEmployees();
        loadLeaves();
    }, []);

    // =========================
    // LOAD EMPLOYEES
    // =========================

    const loadEmployees = async () => {
        try {

            const response = await axios.get(
                "http://localhost:8088/api/employees"
            );

            setEmployees(response.data);

        } catch (error) {

            console.error("Employee loading error:", error);

        }
    };

    // =========================
    // LOAD LEAVES
    // =========================

    const loadLeaves = async () => {
        try {

            const response = await axios.get(
                "http://localhost:8088/api/leaves"
            );

            setLeaves(response.data);

        } catch (error) {

            console.error("Leave loading error:", error);

        }
    };

    // =========================
    // SUBMIT LEAVE
    // =========================

    const submitLeave = async (e) => {

        e.preventDefault();

        if (!employeeId) {
            alert("Please select employee");
            return;
        }

        if (!leaveType) {
            alert("Please select leave type");
            return;
        }

        if (!fromDate || !toDate) {
            alert("Please select dates");
            return;
        }

        try {

            await axios.post(
                `http://localhost:8088/api/leaves/employee/${employeeId}`,
                {
                    leaveType: leaveType,
                    fromDate: fromDate,
                    toDate: toDate,
                    reason: reason
                }
            );

            alert("Leave request submitted successfully");

            setEmployeeId("");
            setLeaveType("");
            setFromDate("");
            setToDate("");
            setReason("");

            loadLeaves();

        } catch (error) {

            console.error("Submit leave error:", error);

            alert(
                error.response?.data ||
                "Failed to submit leave"
            );
        }
    };

    // =========================
    // APPROVE
    // =========================

    const approveLeave = async (id) => {

        try {

            await axios.put(
                `http://localhost:8088/api/leaves/${id}/approve`
            );

            alert("Leave approved");

            loadLeaves();

        } catch (error) {

            console.error(error);

            alert("Failed to approve leave");
        }
    };

    // =========================
    // REJECT
    // =========================

    const rejectLeave = async (id) => {

        try {

            await axios.put(
                `http://localhost:8088/api/leaves/${id}/reject`
            );

            alert("Leave rejected");

            loadLeaves();

        } catch (error) {

            console.error(error);

            alert("Failed to reject leave");
        }
    };

    // =========================
    // DELETE
    // =========================

    const deleteLeave = async (id) => {

        if (!window.confirm("Delete this leave request?")) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8088/api/leaves/${id}`
            );

            alert("Leave deleted");

            loadLeaves();

        } catch (error) {

            console.error(error);

            alert("Failed to delete leave");
        }
    };

    // =========================
    // UI
    // =========================

    return (

        <div className="leave-container">

            <h1>Leave Management</h1>

            {/* =========================
                APPLY LEAVE
            ========================= */}

            <div className="leave-form">

                <h2>Apply Leave</h2>

                <form onSubmit={submitLeave}>

                    <label>
                        Employee
                    </label>

                    <select
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {employees.map((employee) => (

                            <option
                                key={employee.id}
                                value={employee.id}
                            >
                                {employee.id} - {employee.name}
                            </option>

                        ))}

                    </select>


                    <label>
                        Leave Type
                    </label>

                    <select
                        value={leaveType}
                        onChange={(e) =>
                            setLeaveType(e.target.value)
                        }
                    >

                        <option value="">
                            Select Leave Type
                        </option>

                        <option value="Casual Leave">
                            Casual Leave
                        </option>

                        <option value="Sick Leave">
                            Sick Leave
                        </option>

                        <option value="Earned Leave">
                            Earned Leave
                        </option>

                        <option value="Emergency Leave">
                            Emergency Leave
                        </option>

                    </select>


                    <label>
                        From Date
                    </label>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) =>
                            setFromDate(e.target.value)
                        }
                    />


                    <label>
                        To Date
                    </label>

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) =>
                            setToDate(e.target.value)
                        }
                    />


                    <label>
                        Reason
                    </label>

                    <textarea
                        value={reason}
                        onChange={(e) =>
                            setReason(e.target.value)
                        }
                        placeholder="Enter leave reason"
                    />


                    <button type="submit">
                        Submit Leave
                    </button>

                </form>

            </div>


            {/* =========================
                LEAVE TABLE
            ========================= */}

            <div className="leave-table">

                <h2>Leave Requests</h2>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Leave Type</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {leaves.length === 0 ? (

                            <tr>

                                <td colSpan="9">
                                    No leave requests found
                                </td>

                            </tr>

                        ) : (

                            leaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>
                                        {leave.id}
                                    </td>

                                    <td>
                                        {leave.employee?.id}
                                    </td>

                                    <td>
                                        {leave.employee?.name}
                                    </td>

                                    <td>
                                        {leave.leaveType}
                                    </td>

                                    <td>
                                        {leave.fromDate}
                                    </td>

                                    <td>
                                        {leave.toDate}
                                    </td>

                                    <td>
                                        {leave.reason}
                                    </td>

                                    <td>
                                        {leave.status}
                                    </td>

                                    <td>

                                        {leave.status === "Pending" && (

                                            <>
                                                <button
                                                    onClick={() =>
                                                        approveLeave(
                                                            leave.id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        rejectLeave(
                                                            leave.id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>

                                        )}

                                        <button
                                            onClick={() =>
                                                deleteLeave(
                                                    leave.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Leave;