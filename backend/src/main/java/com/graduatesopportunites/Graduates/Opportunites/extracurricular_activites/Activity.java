package com.graduatesopportunites.Graduates.Opportunites.extracurricular_activites;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Activity")
public class Activity {
    @Id
    private String title;
    @Column(nullable = false, length = 1400)
    private String description;
    @Column(name = "issuer_name")
    private String issuerName;
    private String address;
    private String phone;
    private String email;
    private String achievements;
    private String goals;
    private String organizer;
    private String location;
    private LocalDate eventDate;
    private String category;
    private String format;
    private int seatsAvailable;

    public Activity() {}
    public String getId() { return title; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIssuerName() { return issuerName; }
    public void setIssuerName(String issuerName) { this.issuerName = issuerName; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAchievements() { return achievements; }
    public void setAchievements(String achievements) { this.achievements = achievements; }
    public String getGoals() { return goals; }
    public void setGoals(String goals) { this.goals = goals; }
    public String getOrganizer() { return organizer != null ? organizer : (issuerName != null ? issuerName : "Career Compass Partner"); }
    public void setOrganizer(String organizer) { this.organizer = organizer; }
    public String getLocation() { return location != null ? location : (address != null ? address : "Online"); }
    public void setLocation(String location) { this.location = location; }
    public LocalDate getEventDate() { return eventDate != null ? eventDate : LocalDate.now().plusWeeks(2); }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }
    public String getCategory() { return category != null ? category : "Career development"; }
    public void setCategory(String category) { this.category = category; }
    public String getFormat() { return format != null ? format : "In person"; }
    public void setFormat(String format) { this.format = format; }
    public int getSeatsAvailable() { return seatsAvailable; }
    public void setSeatsAvailable(int seatsAvailable) { this.seatsAvailable = seatsAvailable; }
}
