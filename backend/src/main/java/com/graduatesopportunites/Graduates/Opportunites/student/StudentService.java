package com.graduatesopportunites.Graduates.Opportunites.student;

import com.graduatesopportunites.Graduates.Opportunites.auth.RegisterRequest;
import com.graduatesopportunites.Graduates.Opportunites.mentorships.MentorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final MentorRepository mentorRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository,
                          MentorRepository mentorRepository,
                          PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.mentorRepository = mentorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public StudentResponse register(RegisterRequest request) {
        if (studentRepository.existsByEmailIgnoreCase(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already taken");
        }

        Student student = new Student();
        student.setEmail(request.email().trim().toLowerCase());
        student.setPassword(passwordEncoder.encode(request.password()));
        student.setRole("STUDENT");
        student.setFirstName(request.firstName().trim());
        student.setLastName(request.lastName().trim());
        student.setDateOfBirth(request.dateOfBirth());
        student.setGender(request.gender());
        student.setMajor(request.major().trim());
        student.setYearOfStudy(request.yearOfStudy());
        student.setAddress(request.address());
        student.setPhone(request.phone());
        student.setBio("Building a focused path from university to a meaningful career.");

        return StudentResponse.from(studentRepository.save(student));
    }

    public StudentResponse authenticate(String email, String password) {
        Student student = studentRepository.findByEmailIgnoreCase(email.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        boolean valid = student.getPassword().startsWith("$2")
                ? passwordEncoder.matches(password, student.getPassword())
                : password.equals(student.getPassword());

        if (!valid) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        if (!student.getPassword().startsWith("$2")) {
            student.setPassword(passwordEncoder.encode(password));
            studentRepository.save(student);
        }

        return StudentResponse.from(student);
    }

    public StudentResponse getById(Long id) {
        return StudentResponse.from(requireStudent(id));
    }

    public StudentResponse update(Long id, UpdateStudentRequest request) {
        return saveUpdates(requireStudent(id), request);
    }

    public StudentResponse updateByEmail(String email, UpdateStudentRequest request) {
        Student student = studentRepository.findByEmailIgnoreCase(email.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student account not found. Please sign out and sign in again."));
        return saveUpdates(student, request);
    }

    private StudentResponse saveUpdates(Student student, UpdateStudentRequest request) {
        if (request.firstName() != null) student.setFirstName(request.firstName().trim());
        if (request.lastName() != null) student.setLastName(request.lastName().trim());
        if (request.dateOfBirth() != null) student.setDateOfBirth(request.dateOfBirth());
        if (request.gender() != null) student.setGender(request.gender());
        if (request.major() != null) student.setMajor(request.major().trim());
        if (request.yearOfStudy() != null) student.setYearOfStudy(request.yearOfStudy());
        if (request.address() != null) student.setAddress(request.address().trim());
        if (request.phone() != null) student.setPhone(request.phone().trim());
        if (request.bio() != null) student.setBio(request.bio().trim());
        if (request.mentorId() != null) {
            student.setMentor(mentorRepository.findById(request.mentorId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found")));
        }

        return StudentResponse.from(studentRepository.save(student));
    }

    private Student requireStudent(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }
}
