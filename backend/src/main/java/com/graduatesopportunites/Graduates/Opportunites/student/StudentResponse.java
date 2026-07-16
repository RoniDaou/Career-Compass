package com.graduatesopportunites.Graduates.Opportunites.student;

import com.graduatesopportunites.Graduates.Opportunites.entities.Gender;

import java.time.LocalDate;

public record StudentResponse(
        Long id,
        String email,
        String role,
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        Gender gender,
        String major,
        int yearOfStudy,
        String address,
        String phone,
        String bio,
        Long mentorId
) {
    public static StudentResponse from(Student student) {
        return new StudentResponse(
                student.getId(),
                student.getEmail(),
                student.getRole(),
                student.getFirstName(),
                student.getLastName(),
                student.getDateOfBirth(),
                student.getGender(),
                student.getMajor(),
                student.getYearOfStudy(),
                student.getAddress(),
                student.getPhone(),
                student.getBio(),
                student.getMentor() == null ? null : student.getMentor().getId()
        );
    }
}
