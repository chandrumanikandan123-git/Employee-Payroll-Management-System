package com.example.Employee.Payroll.Management.System.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Employee.Payroll.Management.System.Entity.Attendance;
import com.example.Employee.Payroll.Management.System.Entity.Employee;
import com.example.Employee.Payroll.Management.System.Repository.AttendanceRepository;
import com.example.Employee.Payroll.Management.System.Repository.EmployeeRepository;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    // Constructor
    public AttendanceService(
            AttendanceRepository attendanceRepository,
            EmployeeRepository employeeRepository) {

        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    // ==========================================
    // GET ALL ATTENDANCE
    // ==========================================

    public List<Attendance> getAllAttendance() {

        return attendanceRepository.findAll();
    }

    // ==========================================
    // GET ATTENDANCE BY EMPLOYEE
    // ==========================================

    public List<Attendance> getAttendanceByEmployee(Long employeeId) {

        Optional<Employee> employeeOptional =
                employeeRepository.findById(employeeId);

        if (employeeOptional.isEmpty()) {

            throw new RuntimeException(
                    "Employee ID " + employeeId + " does not exist");
        }

        Employee employee = employeeOptional.get();

        return attendanceRepository.findByEmployee(employee);
    }

    // ==========================================
    // CHECK IN
    // ==========================================

    public Attendance checkIn(Long employeeId) {

        // Find employee
        Optional<Employee> employeeOptional =
                employeeRepository.findById(employeeId);

        if (employeeOptional.isEmpty()) {

            throw new RuntimeException(
                    "Employee ID " + employeeId + " does not exist");
        }

        Employee employee = employeeOptional.get();

        // Check today's attendance
        Attendance existingAttendance =
                attendanceRepository.findByEmployeeAndDate(
                        employee,
                        LocalDate.now());

        // Prevent duplicate check-in
        if (existingAttendance != null) {

            throw new RuntimeException(
                    "Employee already checked in today");
        }

        // Create attendance
        Attendance attendance = new Attendance();

        attendance.setEmployee(employee);
        attendance.setDate(LocalDate.now());
        attendance.setCheckIn(LocalTime.now());
        attendance.setStatus("Present");

        // Save
        return attendanceRepository.save(attendance);
    }

    // ==========================================
    // CHECK OUT
    // ==========================================

    public Attendance checkOut(Long employeeId) {

        // Find employee
        Optional<Employee> employeeOptional =
                employeeRepository.findById(employeeId);

        if (employeeOptional.isEmpty()) {

            throw new RuntimeException(
                    "Employee ID " + employeeId + " does not exist");
        }

        Employee employee = employeeOptional.get();

        // Find today's attendance
        Attendance attendance =
                attendanceRepository.findByEmployeeAndDate(
                        employee,
                        LocalDate.now());

        // Employee didn't check in
        if (attendance == null) {

            throw new RuntimeException(
                    "Employee has not checked in today");
        }

        // Already checked out
        if (attendance.getCheckOut() != null) {

            throw new RuntimeException(
                    "Employee already checked out today");
        }

        // Set checkout time
        attendance.setCheckOut(LocalTime.now());

        // Save
        return attendanceRepository.save(attendance);
    }

    // ==========================================
    // DELETE ATTENDANCE
    // ==========================================

    public void deleteAttendance(Long id) {

        if (!attendanceRepository.existsById(id)) {

            throw new RuntimeException(
                    "Attendance record not found");
        }

        attendanceRepository.deleteById(id);
    }
}
