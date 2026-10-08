import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Register from "./Page/Register";
import Login from "./Page/Login";
import Dashboard from "./Page/Dashboard";
import Employees from "./Page/Employees";
import Attendance from "./Page/Attendance";
import Leave from "./Page/Leave";
import Payroll from "./Page/Payroll";
import Payslip from "./Page/Payslip";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/employees"
          element={<Employees />}
        />
        <Route
  path="/attendance"
  element={<Attendance />}
/><Route
    path="/leave-requests"
    element={<Leave />}
/>
<Route path="/payroll" element={<Payroll />} />
<Route path="/payslip" element={<Payslip />} />

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;