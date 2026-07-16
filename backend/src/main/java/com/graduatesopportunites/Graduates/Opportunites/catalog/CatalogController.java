package com.graduatesopportunites.Graduates.Opportunites.catalog;

import com.graduatesopportunites.Graduates.Opportunites.extracurricular_activites.*;
import com.graduatesopportunites.Graduates.Opportunites.mentorships.*;
import com.graduatesopportunites.Graduates.Opportunites.scholarships.*;
import com.graduatesopportunites.Graduates.Opportunites.skills.*;
import com.graduatesopportunites.Graduates.Opportunites.universities.*;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogController {
    private final ScholarshipRepository scholarshipRepository;
    private final MentorRepository mentorRepository;
    private final UniversityRepository universityRepository;
    private final SkillRepository skillRepository;
    private final ActivityRepository activityRepository;

    public CatalogController(ScholarshipRepository scholarshipRepository,
                             MentorRepository mentorRepository,
                             UniversityRepository universityRepository,
                             SkillRepository skillRepository,
                             ActivityRepository activityRepository) {
        this.scholarshipRepository = scholarshipRepository;
        this.mentorRepository = mentorRepository;
        this.universityRepository = universityRepository;
        this.skillRepository = skillRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping("/scholarships")
    public List<Scholarship> scholarships() {
        return scholarshipRepository.findAll(Sort.by(Sort.Direction.ASC, "deadline"));
    }

    @GetMapping("/mentors")
    public List<Mentor> mentors() {
        return mentorRepository.findAll(Sort.by(Sort.Direction.ASC, "firstName", "lastName"));
    }

    @GetMapping("/universities")
    public List<University> universities() {
        return universityRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @GetMapping("/skills")
    public List<Skill> skills() {
        return skillRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @GetMapping("/activities")
    public List<Activity> activities() {
        return activityRepository.findAll(Sort.by(Sort.Direction.ASC, "eventDate"));
    }

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("UP", "Career Compass API");
    }

    public record HealthResponse(String status, String service) {}
}
