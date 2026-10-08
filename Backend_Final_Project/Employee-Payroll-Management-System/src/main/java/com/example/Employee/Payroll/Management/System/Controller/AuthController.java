package com.example.Employee.Payroll.Management.System.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Employee.Payroll.Management.System.Entity.Admin;
import com.example.Employee.Payroll.Management.System.Service.AuthService;

@RestController 
@RequestMapping ("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService){
        this.authService =authService;
    }

    @PostMapping ("/register")
    public ResponseEntity<String>register(@RequestBody Admin admin){
        String result=authService.register(admin);
        if(result.equals("Username already Exists")){
            return ResponseEntity.badRequest().body(result);

        }
        return ResponseEntity.ok(result);
    }
    @PostMapping ("/login")
    public ResponseEntity<String> login(
        @RequestBody Map<String,String>loginRequest){
            String username=loginRequest.get("username");
            String password =loginRequest.get("password");
            String result=authService.login(username,password);
            if(result.equals("Invalid Username or Password")){
                return ResponseEntity.badRequest().body(result);
            }
            return ResponseEntity.ok(result);

}    
    
}
