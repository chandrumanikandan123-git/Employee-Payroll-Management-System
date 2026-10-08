import React, { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {

  const [attendance, setAttendance] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const API_URL = "http://localhost:8088/api/attendance";

  // Load attendance records
  const loadAttendance = async () => {
    try {
      const response = await axios.get(API_URL);
      setAttendance(response.data);
    } catch (error) {
      console.error("Unable to load attendance", error);
      alert("Unable to load attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // Check In
  const checkIn = async () => {

    if (!employeeId) {
      alert("Please enter Employee ID");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/check-in/${employeeId}`
      );

      alert("Employee checked in successfully");

      setEmployeeId("");

      loadAttendance();

    } catch (error) {
      console.error(error);
      alert("Failed to check in");
    }
  };

  // Check Out
  const checkOut = async () => {

    if (!employeeId) {
      alert("Please enter Employee ID");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/check-out/${employeeId}`
      );

      alert("Employee checked out successfully");

      setEmployeeId("");

      loadAttendance();

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Failed to check out");
      } else {
        alert("Failed to check out");
      }
    }
  };

  return (
    <div className="attendance-container">

      <h1>Attendance Management</h1>

      <div className="attendance-box">

        <label>Employee ID</label>

        <input
          type="number"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <div className="attendance-buttons">

          <button
            className="check-in-btn"
            onClick={checkIn}
          >
            Check In
          </button>

          <button
            className="check-out-btn"
            onClick={checkOut}
          >
            Check Out
          </button>

        </div>

      </div>

      <h2>Attendance Records</h2>

      <table className="attendance-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {attendance.length > 0 ? (

            attendance.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.employeeId}</td>

                <td>{item.date}</td>

                <td>
                  {item.checkIn || "-"}
                </td>

                <td>
                  {item.checkOut || "-"}
                </td>

                <td>
                  <span className="status-present">
                    {item.status}
                  </span>
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="6">
                No attendance records found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Attendance;