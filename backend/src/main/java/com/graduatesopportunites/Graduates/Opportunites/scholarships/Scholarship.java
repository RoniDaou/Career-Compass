package com.graduatesopportunites.Graduates.Opportunites.scholarships;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Scholarship")
public class Scholarship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String provider;
    @Column(nullable = false)
    private String majors;
    @Column(name = "eligibility_criteria", length = 1800, nullable = false)
    private String eligibilityCriteria;
    @Column(nullable = false)
    private String amount;
    @Column(nullable = false)
    private String duration;
    private String phone;
    private String email;
    private LocalDate deadline;
    private String location;
    private String type;
    private String applicationUrl;
    private boolean featured;

    public Scholarship() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getProvider() { return provider != null ? provider : "Scholarship Provider"; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getMajors() { return majors; }
    public void setMajors(String majors) { this.majors = majors; }
    public String getEligibilityCriteria() { return eligibilityCriteria; }
    public void setEligibilityCriteria(String eligibilityCriteria) { this.eligibilityCriteria = eligibilityCriteria; }
    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDate getDeadline() { return deadline != null ? deadline : LocalDate.now().plusMonths(3); }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
    public String getLocation() { return location != null ? location : "International"; }
    public void setLocation(String location) { this.location = location; }
    public String getType() { return type != null ? type : "General"; }
    public void setType(String type) { this.type = type; }
    public String getApplicationUrl() { return applicationUrl != null ? applicationUrl : (email != null ? "mailto:" + email : "#"); }
    public void setApplicationUrl(String applicationUrl) { this.applicationUrl = applicationUrl; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
}
