package com.graduatesopportunites.Graduates.Opportunites.auth;

import com.graduatesopportunites.Graduates.Opportunites.student.StudentResponse;

public record AuthResponse(String message, StudentResponse user) {
}
