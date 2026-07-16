import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Building2,
  ChevronRight,
  Clock3,
  Compass,
  GraduationCap,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MentorCard, ScholarshipCard } from '../components/OpportunityCards'
import { PublicHeader } from '../components/PublicHeader'
import { api } from '../services/api'
import type { Mentor, Scholarship, Skill, University } from '../types'

function UniversityPreviewCard({ university }: { university: University }) {
  const initials = university.name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')

  return (
    <article className="directory-preview-card">
      <div className="directory-preview-head">
        <span className="directory-preview-mark">{initials}</span>
        <div><small>{university.type}</small><h3>{university.name}</h3></div>
      </div>
      <p><MapPin size={15} /> {university.address}</p>
      <div className="directory-preview-detail"><small>Programs</small><strong>{university.major}</strong><span>{university.department}</span></div>
      <Link className="button button-secondary button-block" to="/app/universities"><LockKeyhole size={16} /> Sign in to view university</Link>
    </article>
  )
}

function SkillPreviewCard({ skill }: { skill: Skill }) {
  return (
    <article className="directory-preview-card skill-preview-card">
      <div className="directory-preview-head">
        <span className="directory-preview-icon"><BookOpenCheck /></span>
        <div><small>{skill.category} · {skill.level}</small><h3>{skill.name}</h3></div>
      </div>
      <p className="skill-preview-description">{skill.description}</p>
      <div className="skill-preview-meta"><span><Clock3 size={14} /> {skill.estimatedHours} suggested hours</span><span>{skill.importance} priority</span></div>
      <Link className="button button-secondary button-block" to="/app/skills"><LockKeyhole size={16} /> Sign in to open resource</Link>
    </article>
  )
}

export function LandingPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    Promise.all([api.scholarships(), api.mentors(), api.universities(), api.skills()])
      .then(([scholarshipData, mentorData, universityData, skillData]) => {
        setScholarships(scholarshipData.slice(0, 3))
        setMentors(mentorData.slice(0, 3))
        setUniversities(universityData.slice(0, 3))
        setSkills(skillData.slice(0, 3))
      })
      .catch(() => undefined)
  }, [])

  return (
    <div className="public-page">
      <PublicHeader />
      <main>
        <section className="hero-section">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-pill">
                <Sparkles size={15} /> One platform for your next chapter
              </div>
              <h1>
                Find the information you need to make{" "}
                <em>better study and career decisions.</em>
              </h1>
              <p>
                Explore scholarships, universities, mentors, and practical
                skills. Sign in to open the complete directories and provider
                details.
              </p>
              <div className="hero-actions">
                <Link
                  className="button button-primary button-lg"
                  to="/register"
                >
                  Create account <ArrowRight size={18} />
                </Link>
                <a className="button button-white button-lg" href="#explore">
                  Explore opportunities
                </a>
              </div>
              <div className="hero-proof">
                <ShieldCheck />
                <div>
                  <strong>Database-backed information</strong>
                  <p>
                    Selected opportunities are loaded from the platform
                    database. Full access requires an account.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="hero-visual"
              aria-label="Career Compass resource preview"
            >
              <div className="visual-grid" />
              <div className="dashboard-preview resource-preview">
                <div className="preview-head">
                  <span className="preview-logo">
                    <Compass size={17} />
                  </span>
                  <div>
                    <small>Career Compass</small>
                    <strong>Resource directory</strong>
                  </div>
                </div>
                <div className="resource-preview-list">
                  <div>
                    <span className="task-icon gold">
                      <Award size={17} />
                    </span>
                    <p>
                      <strong>Scholarships</strong>
                      <small>
                        Eligibility, awards, deadlines, and application links
                      </small>
                    </p>
                    <ChevronRight />
                  </div>
                  <div>
                    <span className="task-icon blue">
                      <UsersRound size={17} />
                    </span>
                    <p>
                      <strong>Mentors</strong>
                      <small>
                        Expertise, experience, and contact details after sign-in
                      </small>
                    </p>
                    <ChevronRight />
                  </div>
                  <div>
                    <span className="task-icon mint">
                      <Building2 size={17} />
                    </span>
                    <p>
                      <strong>Universities</strong>
                      <small>
                        Programs, locations, tuition notes, and official
                        websites
                      </small>
                    </p>
                    <ChevronRight />
                  </div>
                  <div>
                    <span className="task-icon purple">
                      <BookOpenCheck size={17} />
                    </span>
                    <p>
                      <strong>Skill resources</strong>
                      <small>Courses for workplace and life preparation</small>
                    </p>
                    <ChevronRight />
                  </div>
                </div>
              </div>
              <div className="floating-card floating-card-two">
                <span>
                  <LockKeyhole size={20} />
                </span>
                <div>
                  <strong>Explore first</strong>
                  <small>Sign in to see every resource</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="credibility-strip">
          <div className="container credibility-inner">
            <p>Organized around the decisions students face most</p>
            <div>
              <span>UNIVERSITIES</span>
              <span>SCHOLARSHIPS</span>
              <span>MENTORS</span>
              <span>WORKPLACE SKILLS</span>
            </div>
          </div>
        </section>

        <section className="section" id="explore">
          <div className="container">
            <div className="section-heading centered">
              <span>Explore Career Compass</span>
              <h2>Discover opportunities before creating an account</h2>
              <p>
                Guests can review selected options from every category. The
                complete directories and external details are available after
                sign-in.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card feature-card-large feature-green">
                <div className="feature-icon">
                  <GraduationCap />
                </div>
                <h3>Search scholarship opportunities</h3>
                <p>
                  Review eligibility requirements, funding amounts, deadlines,
                  and official application pages.
                </p>
                <Link to="/app/scholarships">
                  View all scholarships <ChevronRight size={17} />
                </Link>
                <div className="feature-opportunity-note">
                  <Award />
                  <div>
                    <strong>Opportunities for different study paths</strong>
                    <span>
                      Compare funding, eligibility, location, and deadlines.
                    </span>
                  </div>
                </div>
              </article>
              <article className="feature-card">
                <div className="feature-icon feature-icon-blue">
                  <UsersRound />
                </div>
                <h3>Contact experienced mentors</h3>
                <p>
                  Search by field and access available phone or email
                  information after signing in.
                </p>
                <Link to="/app/mentors">
                  View all mentors <ChevronRight size={17} />
                </Link>
              </article>
              <article className="feature-card">
                <div className="feature-icon feature-icon-gold">
                  <Building2 />
                </div>
                <h3>Research universities</h3>
                <p>
                  Browse institutions, programs, locations, tuition notes, and
                  official websites.
                </p>
                <Link to="/app/universities">
                  View all universities <ChevronRight size={17} />
                </Link>
              </article>
              <article className="feature-card feature-card-wide">
                <div className="feature-icon feature-icon-purple">
                  <BookOpenCheck />
                </div>
                <div>
                  <h3>Open practical learning resources</h3>
                  <p>
                    Access workplace and life-skills courses from external
                    learning providers after signing in.
                  </p>
                </div>
                <Link className="text-link skills-card-link" to="/app/skills">
                  View all skills <ChevronRight size={17} />
                </Link>
                <div className="resource-topic-tags">
                  <span>Communication</span>
                  <span>Technology</span>
                  <span>Leadership</span>
                  <span>Life skills</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-tint" id="about">
          <div className="container process-grid">
            <div className="process-copy">
              <span className="section-kicker">About Career Compass</span>
              <h2>Research, compare, and take the next step</h2>
              <p>
                Career Compass organizes education and career information in one
                workspace. Applications, enrollment, mentorship arrangements,
                and course progress remain with the external provider or
                institution.
              </p>
              <div className="process-steps">
                <div>
                  <span>01</span>
                  <div>
                    <h3>Explore available opportunities</h3>
                    <p>
                      Review selected records from each directory on the public
                      homepage.
                    </p>
                  </div>
                </div>
                <div>
                  <span>02</span>
                  <div>
                    <h3>Create or sign in to your account</h3>
                    <p>
                      Your student profile is stored in MySQL and your password
                      is securely hashed.
                    </p>
                  </div>
                </div>
                <div>
                  <span>03</span>
                  <div>
                    <h3>Open the complete directories</h3>
                    <p>
                      Search all records and continue to official provider,
                      university, and course websites.
                    </p>
                  </div>
                </div>
              </div>
              <Link className="button button-primary" to="/register">
                Create my account <ArrowRight size={17} />
              </Link>
            </div>
            <div className="process-panel information-panel">
              <div className="process-panel-head">
                <span>What the platform provides</span>
                <small>Clear and transparent</small>
              </div>
              <article>
                <span className="recommend-icon">
                  <Award />
                </span>
                <div>
                  <small>Scholarships</small>
                  <strong>Eligibility and application information</strong>
                  <p>Search and open the official link</p>
                </div>
              </article>
              <article>
                <span className="recommend-icon blue">
                  <UsersRound />
                </span>
                <div>
                  <small>Mentors</small>
                  <strong>Field, experience, phone, and email</strong>
                  <p>Contact the professional directly</p>
                </div>
              </article>
              <article>
                <span className="recommend-icon gold">
                  <Building2 />
                </span>
                <div>
                  <small>Universities</small>
                  <strong>Programs and official websites</strong>
                  <p>Confirm details with admissions</p>
                </div>
              </article>
              <div className="panel-insight">
                <ShieldCheck />
                <p>
                  <strong>No fake tracking:</strong> The platform does not
                  invent progress scores, completion percentages, or application
                  status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {scholarships.length > 0 && (
          <section className="section preview-category-section">
            <div className="container">
              <div className="section-heading row-heading">
                <div>
                  <span>Scholarship opportunities</span>
                  <h2>Funding opportunities worth reviewing</h2>
                </div>
                <Link className="text-link" to="/app/scholarships">
                  View all scholarships <ArrowRight size={17} />
                </Link>
              </div>
              <div className="cards-grid three-column">
                {scholarships.map((item) => (
                  <ScholarshipCard
                    key={item.id}
                    scholarship={item}
                    compact
                    lockedPath="/app/scholarships"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="section preview-category-section preview-category-tint">
            <div className="container">
              <div className="section-heading row-heading">
                <div>
                  <span>UniSkills resources</span>
                  <h2>Practical learning resources</h2>
                </div>
                <Link className="text-link" to="/app/skills">
                  View all skills <ArrowRight size={17} />
                </Link>
              </div>
              <div className="cards-grid three-column">
                {skills.map((item) => (
                  <SkillPreviewCard key={item.id} skill={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {universities.length > 0 && (
          <section className="section preview-category-section">
            <div className="container">
              <div className="section-heading row-heading">
                <div>
                  <span>University options</span>
                  <h2>Institutions to explore</h2>
                </div>
                <Link className="text-link" to="/app/universities">
                  View all universities <ArrowRight size={17} />
                </Link>
              </div>
              <div className="cards-grid three-column">
                {universities.map((item) => (
                  <UniversityPreviewCard key={item.id} university={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {mentors.length > 0 && (
          <section className="section mentors-section preview-category-section">
            <div className="container">
              <div className="section-heading row-heading light-heading">
                <div>
                  <span>Mentor network</span>
                  <h2>Professionals across different fields</h2>
                  <p>Sign in to see their available contact information.</p>
                </div>
                <Link className="text-link light-text-link" to="/app/mentors">
                  View all mentors <ArrowRight size={17} />
                </Link>
              </div>
              <div className="cards-grid three-column">
                {mentors.map((item) => (
                  <MentorCard
                    key={item.id}
                    mentor={item}
                    lockedPath="/app/mentors"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section final-cta-section">
          <div className="container final-cta">
            <div>
              <span className="eyebrow-pill light">
                <Sparkles size={15} /> Ready for full access?
              </span>
              <h2>Keep your education and career resources in one place.</h2>
              <p>Create an account and access every database record.</p>
            </div>
            <Link className="button button-white button-lg" to="/register">
              Get started <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="public-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <span>
                <Compass />
              </span>
              <strong>Career Compass</strong>
            </div>
            <p>
              Organized education and career resources for students and
              graduates.
            </p>
          </div>
          <div>
            <strong>Navigation</strong>
            <Link to="/">Home</Link>
            <a href="#explore">Explore</a>
            <a href="#about">About</a>
          </div>
          <div>
            <strong>Account</strong>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Create account</Link>
            <Link to="/app">Dashboard</Link>
          </div>
          <div>
            <strong>Built for</strong>
            <span>University students</span>
            <span>Recent graduates</span>
            <span>Career explorers</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Career Compass.</span>
          <span>Graduation and career guidance platform.</span>
        </div>
      </footer>
    </div>
  );
}
