package com.example.Employee.Payroll.Management.System.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Employee.Payroll.Management.System.Entity.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long> {
Optional<Admin> findByUsername(String username);

    boolean existsByUsername(String username);
}
