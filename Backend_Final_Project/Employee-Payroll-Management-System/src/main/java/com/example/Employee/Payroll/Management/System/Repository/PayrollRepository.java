package com.example.Employee.Payroll.Management.System.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Employee.Payroll.Management.System.Entity.Payroll;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

}
