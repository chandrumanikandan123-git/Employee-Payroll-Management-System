package com.example.Employee.Payroll.Management.System.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Employee.Payroll.Management.System.Entity.Employee;
import com.example.Employee.Payroll.Management.System.Entity.LeaveRequest;
import com.example.Employee.Payroll.Management.System.Repository.EmployeeRepository;
import com.example.Employee.Payroll.Management.System.Repository.LeaveRequestRepository;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public LeaveRequestService(
            LeaveRequestRepository leaveRequestRepository,
            EmployeeRepository employeeRepository) {

        this.leaveRequestRepository = leaveRequestRepository;
        this.employeeRepository = employeeRepository;
    }

    // ==========================================
    // GET ALL LEAVE REQUESTS
    // ==========================================

    public List<LeaveRequest> getAllLeaves() {

        return leaveRequestRepository.findAll();
    }

    // ==========================================
    // GET LEAVES BY EMPLOYEE
    // ==========================================

    public List<LeaveRequest> getLeavesByEmployee(Long employeeId) {

        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);

        if (employeeOptional.isEmpty()) {

            throw new RuntimeException(
                    "Employee ID " + employeeId + " does not exist");
        }

        Employee employee = employeeOptional.get();

        return leaveRequestRepository.findByEmployee(employee);
    }

    // ==========================================
    // CREATE LEAVE REQUEST
    // ==========================================

    public LeaveRequest createLeaveRequest(
            Long employeeId,
            LeaveRequest leaveRequest) {

        Optional<Employee> employeeOptional = employeeRepository.findById(employeeId);

        if (employeeOptional.isEmpty()) {

            throw new RuntimeException(
                    "Employee ID " + employeeId + " does not exist");
        }

        Employee employee = employeeOptional.get();

        // Set employee
        leaveRequest.setEmployee(employee);

        // Default status
        leaveRequest.setStatus("Pending");

        // Save
        return leaveRequestRepository.save(leaveRequest);
    }

    // ==========================================
    // APPROVE LEAVE
    // ==========================================

    public LeaveRequest approveLeave(Long id) {

        Optional<LeaveRequest> leaveOptional = leaveRequestRepository.findById(id);

        if (leaveOptional.isEmpty()) {

            throw new RuntimeException(
                    "Leave request not found");
        }

        LeaveRequest leave = leaveOptional.get();

        leave.setStatus("Approved");

        return leaveRequestRepository.save(leave);
    }

    // ==========================================
    // REJECT LEAVE
    // ==========================================

    public LeaveRequest rejectLeave(Long id) {

        Optional<LeaveRequest> leaveOptional = leaveRequestRepository.findById(id);

        if (leaveOptional.isEmpty()) {

            throw new RuntimeException(
                    "Leave request not found");
        }

        LeaveRequest leave = leaveOptional.get();

        leave.setStatus("Rejected");

        return leaveRequestRepository.save(leave);
    }

    // ==========================================
    // DELETE LEAVE
    // ==========================================

    public void deleteLeave(Long id) {

        if (!leaveRequestRepository.existsById(id)) {

            throw new RuntimeException(
                    "Leave request not found");
        }

        leaveRequestRepository.deleteById(id);
    }
}