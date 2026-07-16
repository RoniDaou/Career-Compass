package com.graduatesopportunites.Graduates.Opportunites.auth;

import com.graduatesopportunites.Graduates.Opportunites.entities.Gender;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record RegisterRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotBlank String firstName,
        @NotBlank String lastName,
        LocalDate dateOfBirth,
        Gender gender,
        @NotBlank String major,
        @Min(1) @Max(13) int yearOfStudy,
        String address,
        String phone
) {
}
