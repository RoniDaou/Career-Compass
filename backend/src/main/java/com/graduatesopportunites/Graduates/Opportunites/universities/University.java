package com.graduatesopportunites.Graduates.Opportunites.universities;

import jakarta.persistence.*;

@Entity
@Table(name = "University")
public class University {
    @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String department;
    @Column(name = "tuition_fees", nullable = false)
    private String tuitionFees;
    @Column(nullable = false)
    private String major;
    private String address;
    private String phone;
    private String email;
    private String website;
    private int matchScore;

    public University() {}

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public String getDepartment() { return department; }

    public void setDepartment(String department) { this.department = department; }

    public String getTuitionFees() { return tuitionFees; }

    public void setTuitionFees(String tuitionFees) { this.tuitionFees = tuitionFees; }

    public String getMajor() { return major; }

    public void setMajor(String major) { this.major = major; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getWebsite() { return website; }

    public void setWebsite(String website) { this.website = website; }

    public int getMatchScore() { return matchScore; }

    public void setMatchScore(int matchScore) { this.matchScore = matchScore; }
}
