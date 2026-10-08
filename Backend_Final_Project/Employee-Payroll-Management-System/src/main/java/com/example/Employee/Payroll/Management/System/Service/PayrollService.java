package com.example.Employee.Payroll.Management.System.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Employee.Payroll.Management.System.Entity.Payroll;
import com.example.Employee.Payroll.Management.System.Repository.PayrollRepository;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepository;

    public PayrollService(PayrollRepository payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    // ==========================================
    // SAVE PAYROLL
    // ==========================================

    public Payroll savePayroll(Payroll payroll) {

        // Calculate Gross Salary
        double basicSalary = payroll.getBasicSalary();
        double allowances = payroll.getAllowances();

        double grossSalary = basicSalary + allowances;

        // Calculate Net Salary
        double deductions = payroll.getDeductions();

        double netSalary = grossSalary - deductions;

        // Set calculated values
        payroll.setGrossSalary(grossSalary);
        payroll.setNetSalary(netSalary);

        // Save into database
        return payrollRepository.save(payroll);
    }

    // ==========================================
    // GET PAYROLL BY ID
    // ==========================================

    public Payroll getPayrollById(Long id) {

        Optional<Payroll> payrollOptional = payrollRepository.findById(id);

        if (payrollOptional.isEmpty()) {

            throw new RuntimeException(
                    "Payroll ID " + id + " not found");
        }

        return payrollOptional.get();
    }

    // ==========================================
    // GET ALL PAYROLL
    // ==========================================

    public List<Payroll> getAllPayroll() {

        return payrollRepository.findAll();
    }

    // ==========================================
    // DELETE PAYROLL
    // ==========================================

    public void deletePayroll(Long id) {

        if (!payrollRepository.existsById(id)) {

            throw new RuntimeException(
                    "Payroll ID " + id + " not found");
        }

        payrollRepository.deleteById(id);
    }
}