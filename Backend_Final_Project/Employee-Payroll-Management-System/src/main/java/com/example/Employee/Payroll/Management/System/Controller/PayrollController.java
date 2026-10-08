package com.example.Employee.Payroll.Management.System.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.example.Employee.Payroll.Management.System.Entity.Employee;
import com.example.Employee.Payroll.Management.System.Entity.Payroll;

import com.example.Employee.Payroll.Management.System.Repository.EmployeeRepository;

import com.example.Employee.Payroll.Management.System.Service.PayrollService;
import com.example.Employee.Payroll.Management.System.Service.PayslipService;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollController {

    private final PayrollService payrollService;

    private final EmployeeRepository employeeRepository;

    private final PayslipService payslipService;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public PayrollController(
            PayrollService payrollService,
            EmployeeRepository employeeRepository,
            PayslipService payslipService) {

        this.payrollService = payrollService;

        this.employeeRepository = employeeRepository;

        this.payslipService = payslipService;
    }

    // ==========================================
    // CREATE PAYROLL
    // ==========================================

    @PostMapping
    public ResponseEntity<?> savePayroll(
            @RequestBody Payroll payroll) {

        try {

            // Check employee
            if (payroll.getEmployee() == null ||
                    payroll.getEmployee().getId() == null) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Employee ID is required");
            }

            Long employeeId = payroll.getEmployee().getId();

            // Find employee
            Optional<Employee> employeeOptional = employeeRepository.findById(
                    employeeId);

            if (employeeOptional.isEmpty()) {

                return ResponseEntity
                        .status(
                                HttpStatus.NOT_FOUND)
                        .body(
                                "Employee ID "
                                        + employeeId
                                        + " does not exist");
            }

            // Get employee
            Employee employee = employeeOptional.get();

            // Set employee
            payroll.setEmployee(employee);

            // Save payroll
            Payroll savedPayroll = payrollService.savePayroll(
                    payroll);

            return ResponseEntity
                    .status(
                            HttpStatus.CREATED)
                    .body(savedPayroll);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            "Error while saving payroll: "
                                    + e.getMessage());
        }
    }

    // ==========================================
    // GET ALL PAYROLL
    // ==========================================

    @GetMapping
    public ResponseEntity<?> getAllPayroll() {

        try {

            List<Payroll> payrollList = payrollService.getAllPayroll();

            return ResponseEntity.ok(
                    payrollList);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            "Error while getting payroll: "
                                    + e.getMessage());
        }
    }

    // ==========================================
    // GET PAYROLL BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getPayrollById(
            @PathVariable Long id) {

        try {

            Payroll payroll = payrollService.getPayrollById(id);

            return ResponseEntity.ok(
                    payroll);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND)
                    .body(
                            e.getMessage());
        }
    }

    // ==========================================
    // DELETE PAYROLL
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayroll(
            @PathVariable Long id) {

        try {

            payrollService.deletePayroll(id);

            return ResponseEntity.ok(
                    "Payroll deleted successfully");

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND)
                    .body(
                            e.getMessage());
        }
    }

    // ==========================================
    // DOWNLOAD PAYSLIP PDF
    // ==========================================

    @GetMapping("/{id}/payslip")
    public ResponseEntity<byte[]> downloadPayslip(
            @PathVariable Long id) {

        try {

            byte[] pdf = payslipService.generatePayslip(
                    id);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_PDF);

            headers.setContentDispositionFormData(
                    "attachment",
                    "payslip-" + id + ".pdf");

            headers.setContentLength(
                    pdf.length);

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .body(pdf);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND)
                    .build();

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}