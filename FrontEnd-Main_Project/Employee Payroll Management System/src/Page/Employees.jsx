import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Employees() {

  const API_URL = "http://localhost:8088/api/employees";

  // Employee form
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    basicSalary: "",
    status: "Active"
  });

  // Employee list
  const [employees, setEmployees] = useState([]);

  // Loading states
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit mode
  const [editId, setEditId] = useState(null);

  // --------------------------------
  // GET ALL EMPLOYEES
  // --------------------------------
  const getEmployees = async () => {

    try {

      setLoadingEmployees(true);

      const response = await axios.get(API_URL);

      console.log("Employees:", response.data);

      setEmployees(response.data);

    } catch (error) {

      console.error("GET ERROR:", error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }

      alert("Unable to load employees");

    } finally {

      setLoadingEmployees(false);

    }
  };

  // --------------------------------
  // LOAD EMPLOYEES WHEN PAGE OPENS
  // --------------------------------
  useEffect(() => {
    getEmployees();
  }, []);

  // --------------------------------
  // HANDLE INPUT CHANGE
  // --------------------------------
  const handleChange = (e) => {

    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value
    });
  };

  // --------------------------------
  // ADD / UPDATE EMPLOYEE
  // --------------------------------
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      if (editId === null) {

        // ADD EMPLOYEE

        await axios.post(API_URL, employee);

        alert("Employee added successfully!");

      } else {

        // UPDATE EMPLOYEE

        await axios.put(
          `${API_URL}/${editId}`,
          employee
        );

        alert("Employee updated successfully!");

      }

      // Clear form

      setEmployee({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
        basicSalary: "",
        status: "Active"
      });

      // Exit edit mode

      setEditId(null);

      // Refresh list

      await getEmployees();

    } catch (error) {

      console.error("SAVE/UPDATE ERROR:", error);

      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Data:",
          error.response.data
        );

      }

      alert(
        editId === null
          ? "Failed to add employee"
          : "Failed to update employee"
      );

    } finally {

      setSaving(false);

    }
  };

  // --------------------------------
  // EDIT EMPLOYEE
  // --------------------------------
  const handleEdit = (emp) => {

    setEditId(emp.id);

    setEmployee({
      name: emp.name || "",
      email: emp.email || "",
      phone: emp.phone || "",
      department: emp.department || "",
      designation: emp.designation || "",
      joiningDate: emp.joiningDate || "",
      basicSalary: emp.basicSalary || "",
      status: emp.status || "Active"
    });

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // --------------------------------
  // CANCEL EDIT
  // --------------------------------
  const handleCancelEdit = () => {

    setEditId(null);

    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: "",
      basicSalary: "",
      status: "Active"
    });
  };

  // --------------------------------
  // DELETE EMPLOYEE
  // --------------------------------
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(`${API_URL}/${id}`);

      alert("Employee deleted successfully!");

      await getEmployees();

    } catch (error) {

      console.error("DELETE ERROR:", error);

      alert("Failed to delete employee");

    }
  };

  return (

    <div>

      <Navbar />

      <div className="dashboard-container">

        <Sidebar />

        <div className="dashboard-content">

          <h1>Employees</h1>

          <p>
            Manage employee details
          </p>


          {/* ============================= */}
          {/* EMPLOYEE FORM */}
          {/* ============================= */}

          <div className="form-card">

            <h2>
              {editId === null
                ? "Add Employee"
                : "Edit Employee"}
            </h2>


            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">

                <label>
                  Employee Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* PHONE */}

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* DEPARTMENT */}

              <div className="form-group">

                <label>
                  Department
                </label>

                <select
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="IT">
                    IT
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                </select>

              </div>


              {/* DESIGNATION */}

              <div className="form-group">

                <label>
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
                  value={employee.designation}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* JOINING DATE */}

              <div className="form-group">

                <label>
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* SALARY */}

              <div className="form-group">

                <label>
                  Basic Salary
                </label>

                <input
                  type="number"
                  name="basicSalary"
                  placeholder="Enter basic salary"
                  value={employee.basicSalary}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* STATUS */}

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={employee.status}
                  onChange={handleChange}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>


              {/* BUTTONS */}

              <button
                type="submit"
                className="add-button"
                disabled={saving}
              >

                {saving
                  ? "Saving..."
                  : editId === null
                  ? "Add Employee"
                  : "Update Employee"}

              </button>


              {/* CANCEL */}

              {editId !== null && (

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </button>

              )}

            </form>

          </div>


          {/* ============================= */}
          {/* EMPLOYEE TABLE */}
          {/* ============================= */}

          <div className="employee-table-container">

            <h2>
              Employee List
            </h2>


            {loadingEmployees &&
            employees.length === 0 ? (

              <p>
                Loading employees...
              </p>

            ) : (

              <table className="employee-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Department</th>

                    <th>Designation</th>

                    <th>Joining Date</th>

                    <th>Salary</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>


                <tbody>

                  {employees.length === 0 ? (

                    <tr>

                      <td
                        colSpan="10"
                        className="no-data"
                      >
                        No employees found
                      </td>

                    </tr>

                  ) : (

                    employees.map((emp) => (

                      <tr key={emp.id}>

                        <td>
                          {emp.id}
                        </td>

                        <td>
                          {emp.name}
                        </td>

                        <td>
                          {emp.email}
                        </td>

                        <td>
                          {emp.phone}
                        </td>

                        <td>
                          {emp.department}
                        </td>

                        <td>
                          {emp.designation}
                        </td>

                        <td>
                          {emp.joiningDate}
                        </td>

                        <td>
                          ₹{emp.basicSalary}
                        </td>

                        <td>

                          <span
                            className={
                              emp.status === "Active"
                                ? "status-active"
                                : "status-inactive"
                            }
                          >
                            {emp.status}
                          </span>

                        </td>

                        <td>

                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(emp)
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(emp.id)
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

            )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Employees;