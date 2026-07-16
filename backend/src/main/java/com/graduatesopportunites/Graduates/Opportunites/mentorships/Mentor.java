package com.graduatesopportunites.Graduates.Opportunites.mentorships;

import com.graduatesopportunites.Graduates.Opportunites.entities.Gender;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Mentorship")
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    private Gender gender;
    private String major;
    private String experience;
    private String address;
    private String phone;
    private String email;
    @Column(name = "job_title")
    private String jobTitle;
    @Column(name = "area_of_expertise")
    private String areaOfExpertise;
    private String company;
    @Column(length = 1500)
    private String bio;
    private String location;
    private double rating;
    private int menteeCount;
    private boolean available;

    public Mentor() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getJobTitle() { return jobTitle != null ? jobTitle : "Industry Mentor"; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getAreaOfExpertise() { return areaOfExpertise != null ? areaOfExpertise : (major != null ? major : "Career Guidance"); }
    public void setAreaOfExpertise(String areaOfExpertise) { this.areaOfExpertise = areaOfExpertise; }
    public String getCompany() { return company != null ? company : "Independent Professional"; }
    public void setCompany(String company) { this.company = company; }
    public String getBio() { return bio != null ? bio : "Experienced professional offering practical guidance to students and graduates."; }
    public void setBio(String bio) { this.bio = bio; }
    public String getLocation() { return location != null ? location : (address != null ? address : "Remote"); }
    public void setLocation(String location) { this.location = location; }
    public double getRating() { return rating > 0 ? rating : 4.7; }
    public void setRating(double rating) { this.rating = rating; }
    public int getMenteeCount() { return menteeCount; }
    public void setMenteeCount(int menteeCount) { this.menteeCount = menteeCount; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
