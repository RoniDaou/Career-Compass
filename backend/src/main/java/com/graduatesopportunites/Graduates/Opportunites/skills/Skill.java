package com.graduatesopportunites.Graduates.Opportunites.skills;

import jakarta.persistence.*;

@Entity
@Table(name = "Skill")
public class Skill {
    @Id
    private String name;
    @Column(nullable = false, length = 1200)
    private String description;
    @Column(nullable = false)
    private String importance;
    @Column(nullable = false)
    private String level;
    private String resources;
    private String category;
    private String resourceName;
    private String resourceUrl;
    private int estimatedHours;

    public Skill() {}
    public String getId() { return name; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImportance() { return importance; }
    public void setImportance(String importance) { this.importance = importance; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getResources() { return resources; }
    public void setResources(String resources) { this.resources = resources; }
    public String getCategory() { return category != null ? category : "Career readiness"; }
    public void setCategory(String category) { this.category = category; }
    public String getResourceName() { return resourceName != null ? resourceName : name + " resource"; }
    public void setResourceName(String resourceName) { this.resourceName = resourceName; }
    public String getResourceUrl() { return resourceUrl != null ? resourceUrl : (resources != null ? resources : "#"); }
    public void setResourceUrl(String resourceUrl) { this.resourceUrl = resourceUrl; }
    public int getEstimatedHours() { return estimatedHours > 0 ? estimatedHours : 4; }
    public void setEstimatedHours(int estimatedHours) { this.estimatedHours = estimatedHours; }
}
