package com.graduatesopportunites.Graduates.Opportunites.student;

import com.graduatesopportunites.Graduates.Opportunites.auth.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/api/students/{id}")
    public StudentResponse getStudent(@PathVariable Long id) {
        return studentService.getById(id);
    }

    @PutMapping("/api/students/{id}")
    public StudentResponse updateStudent(@PathVariable Long id,
                                         @Valid @RequestBody UpdateStudentRequest request) {
        return studentService.update(id, request);
    }

    /**
     * Profile updates use the authenticated account email instead of a cached numeric ID.
     * This remains reliable when local database records receive different auto-generated IDs.
     */
    @PutMapping("/api/students/profile")
    public StudentResponse updateStudentProfile(@RequestParam String email,
                                                @Valid @RequestBody UpdateStudentRequest request) {
        return studentService.updateByEmail(email, request);
    }

    // Compatibility endpoints retained from the original backend.
    @GetMapping("/student/data")
    public String getData() {
        return "Career Compass backend is running";
    }

    @PostMapping("/student/login")
    public ResponseEntity<String> legacyLogin(@RequestParam String username,
                                              @RequestParam String password) {
        studentService.authenticate(username, password);
        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/student/add")
    public ResponseEntity<String> legacyRegister(@Valid @RequestBody RegisterRequest request) {
        studentService.register(request);
        return ResponseEntity.status(201).body("Student registered successfully");
    }
}
