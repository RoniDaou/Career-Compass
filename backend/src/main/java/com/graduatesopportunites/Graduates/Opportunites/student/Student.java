package com.graduatesopportunites.Graduates.Opportunites.student;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.graduatesopportunites.Graduates.Opportunites.entities.Gender;
import com.graduatesopportunites.Graduates.Opportunites.mentorships.Mentor;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Student", indexes = @Index(name = "idx_student_email", columnList = "email", unique = true))
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private String major;

    @Column(name = "year_of_study", nullable = false)
    private int yearOfStudy;

    private String address;
    private String phone;
    private String bio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mentorId")
    private Mentor mentor;

    public Student() {}

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }

    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public Gender getGender() { return gender; }

    public void setGender(Gender gender) { this.gender = gender; }

    public String getMajor() { return major; }

    public void setMajor(String major) { this.major = major; }

    public int getYearOfStudy() { return yearOfStudy; }

    public void setYearOfStudy(int yearOfStudy) { this.yearOfStudy = yearOfStudy; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getBio() { return bio; }

    public void setBio(String bio) { this.bio = bio; }

    public Mentor getMentor() { return mentor; }

    public void setMentor(Mentor mentor) { this.mentor = mentor; }
}
