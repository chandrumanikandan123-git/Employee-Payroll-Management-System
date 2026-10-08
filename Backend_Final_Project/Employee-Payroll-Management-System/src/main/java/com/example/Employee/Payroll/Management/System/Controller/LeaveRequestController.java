package com.example.Employee.Payroll.Management.System.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Employee.Payroll.Management.System.Entity.LeaveRequest;
import com.example.Employee.Payroll.Management.System.Service.LeaveRequestService;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public LeaveRequestController(
            LeaveRequestService leaveRequestService) {

        this.leaveRequestService = leaveRequestService;
    }

    // ==========================================
    // GET ALL LEAVE REQUESTS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {

        List<LeaveRequest> leaves = leaveRequestService.getAllLeaves();

        return ResponseEntity.ok(leaves);
    }

    // ==========================================
    // GET LEAVES BY EMPLOYEE
    // ==========================================

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getLeavesByEmployee(
            @PathVariable Long employeeId) {

        try {

            List<LeaveRequest> leaves = leaveRequestService
                    .getLeavesByEmployee(employeeId);

            return ResponseEntity.ok(leaves);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // CREATE LEAVE REQUEST
    // ==========================================

    @PostMapping("/employee/{employeeId}")
    public ResponseEntity<?> createLeaveRequest(
            @PathVariable Long employeeId,
            @RequestBody LeaveRequest leaveRequest) {

        try {

            LeaveRequest savedLeave = leaveRequestService
                    .createLeaveRequest(
                            employeeId,
                            leaveRequest);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedLeave);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // APPROVE LEAVE
    // ==========================================

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveLeave(
            @PathVariable Long id) {

        try {

            LeaveRequest updatedLeave = leaveRequestService
                    .approveLeave(id);

            return ResponseEntity.ok(updatedLeave);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // REJECT LEAVE
    // ==========================================

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectLeave(
            @PathVariable Long id) {

        try {

            LeaveRequest updatedLeave = leaveRequestService
                    .rejectLeave(id);

            return ResponseEntity.ok(updatedLeave);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // ==========================================
    // DELETE LEAVE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLeave(
            @PathVariable Long id) {

        try {

            leaveRequestService.deleteLeave(id);

            return ResponseEntity.ok(
                    "Leave request deleted successfully");

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}