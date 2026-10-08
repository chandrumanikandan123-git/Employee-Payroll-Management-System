package com.example.Employee.Payroll.Management.System.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Employee.Payroll.Management.System.Entity.Attendance;
import com.example.Employee.Payroll.Management.System.Service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceService attendanceService;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    // ==========================================
    // GET ALL ATTENDANCE
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {

        List<Attendance> attendanceList =
                attendanceService.getAllAttendance();

        return ResponseEntity.ok(attendanceList);
    }

    // ==========================================
    // GET ATTENDANCE BY EMPLOYEE
    // ==========================================

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getAttendanceByEmployee(
            @PathVariable Long employeeId) {

        try {

            List<Attendance> attendanceList =
                    attendanceService.getAttendanceByEmployee(employeeId);

            return ResponseEntity.ok(attendanceList);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // CHECK IN
    // ==========================================

    @PostMapping("/check-in/{employeeId}")
    public ResponseEntity<?> checkIn(
            @PathVariable Long employeeId) {

        try {

            Attendance savedAttendance =
                    attendanceService.checkIn(employeeId);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedAttendance);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // CHECK OUT
    // ==========================================

    @PutMapping("/check-out/{employeeId}")
    public ResponseEntity<?> checkOut(
            @PathVariable Long employeeId) {

        try {

            Attendance updatedAttendance =
                    attendanceService.checkOut(employeeId);

            return ResponseEntity.ok(updatedAttendance);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // DELETE ATTENDANCE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAttendance(
            @PathVariable Long id) {

        try {

            attendanceService.deleteAttendance(id);

            return ResponseEntity.ok(
                    "Attendance deleted successfully");

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}