package com.graduatesopportunites.Graduates.Opportunites.student;

import com.graduatesopportunites.Graduates.Opportunites.entities.Gender;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDate;

public record UpdateStudentRequest(
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        Gender gender,
        String major,
        @Min(1) @Max(13) Integer yearOfStudy,
        String address,
        String phone,
        String bio,
        Long mentorId
) {
}
