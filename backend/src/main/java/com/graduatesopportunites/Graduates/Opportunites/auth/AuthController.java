package com.graduatesopportunites.Graduates.Opportunites.auth;

import com.graduatesopportunites.Graduates.Opportunites.student.StudentResponse;
import com.graduatesopportunites.Graduates.Opportunites.student.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final StudentService studentService;

    public AuthController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        StudentResponse user = studentService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse("Account created successfully", user));
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return new AuthResponse("Welcome back", studentService.authenticate(request.email(), request.password()));
    }
}
