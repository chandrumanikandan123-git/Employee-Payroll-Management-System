package com.example.Employee.Payroll.Management.System.Service;

import org.springframework.stereotype.Service;

import com.example.Employee.Payroll.Management.System.Entity.Admin;
import com.example.Employee.Payroll.Management.System.Repository.AdminRepository;

@Service
public class AuthService {
    private final AdminRepository adminRepository;

    AuthService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    public String register(Admin admin){
        if(adminRepository.existsByUsername(admin.getUsername())){
            return "Username Already Exists";
        }
        adminRepository.save(admin);
        return "Registration Successful";
    }
    public String login(String username, String password){
        return adminRepository.findByUsername(username)
        .filter(admin->admin.getPassword().equals(password))
        .map(admin->"Login Sucessfully..").orElse("Invalid Username and Password");
    }

}
