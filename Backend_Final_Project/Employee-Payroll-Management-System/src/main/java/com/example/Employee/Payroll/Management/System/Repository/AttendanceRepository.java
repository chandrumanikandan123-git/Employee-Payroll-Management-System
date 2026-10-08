package com.example.Employee.Payroll.Management.System.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Employee.Payroll.Management.System.Entity.Attendance;
import com.example.Employee.Payroll.Management.System.Entity.Employee;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Get attendance records for one employee
    List<Attendance> findByEmployee(Employee employee);

    // Find today's attendance for one employee
    Attendance findByEmployeeAndDate(
            Employee employee,
            LocalDate date);
}