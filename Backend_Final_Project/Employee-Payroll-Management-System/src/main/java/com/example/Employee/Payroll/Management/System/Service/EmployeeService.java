package com.example.Employee.Payroll.Management.System.Service;

import org.springframework.stereotype.Service;

import com.example.Employee.Payroll.Management.System.Entity.Employee;
import com.example.Employee.Payroll.Management.System.Repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    // Add Employee
    public Employee addEmployee(Employee employee) {

        return employeeRepository.save(employee);
    }


    // Get All Employees
    public List<Employee> getAllEmployees() {

        return employeeRepository.findAll();
    }


    // Get Employee By ID
    public Employee getEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElse(null);
    }


    // Delete Employee
    public void deleteEmployee(Long id) {

        employeeRepository.deleteById(id);
    }
}