# Career Compass

Career Compass is a full-stack graduation and career-guidance platform.

- **Frontend:** React, TypeScript, Vite, React Router, and Lucide icons
- **Backend:** Java 17, Spring Boot, Spring Data JPA, MySQL, and BCrypt

The project uses two sibling folders because the Java API and React application have separate development tools and build processes.

## Updated product behavior

- Scholarship search and working application links
- Mentor search with phone and email contact actions
- University directory with official website and contact links
- Workplace and life-skill resources with external course links
- Editable student profile saved through the Spring Boot API
- Academic status options from Year 1 through Year 12, plus Graduate
- Database-backed overview counts
- No simulated readiness scores, weekly progress, course completion, profile completion, or mentor-match percentages
- No inactive notification bell, workspace search, save-comparison, password-reset, calendar, or add-experience controls
- No automatic demo-data insertion

## Folder structure

```text
career-compass-platform/
├── backend/        Spring Boot API
├── frontend/       React + TypeScript application
├── start-dev.bat   Optional Windows launcher
├── start-dev.sh    Optional macOS/Linux launcher
└── README.md
```

## Run the backend in Eclipse

1. Open Eclipse.
2. Import `backend` as an **Existing Maven Project**.
3. Open `GraduatesOpportunitesApplication.java`.
4. Run it as **Java Application** or **Spring Boot App**.
5. Keep the Eclipse Console running.

Backend address:

```text
http://localhost:8081
```

The existing MySQL configuration remains in `backend/src/main/resources/application.properties`.

## Run the frontend in Visual Studio Code

1. Open the `frontend` folder in Visual Studio Code.
2. Open a terminal.
3. Run:

```powershell
npm run dev
```

The ZIP already contains the installed frontend packages. If the `node_modules` folder is removed later, run `npm install` once before `npm run dev`.

Frontend address:

```text
http://localhost:5173
```

## Important after replacing an older frontend

The authentication storage key was updated to prevent an old cached student ID from being reused after switching databases. Sign in again with a student account that exists in the current MySQL database.

## Main API endpoints

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/students/{id}
PUT  /api/students/{id}
PUT  /api/students/profile?email={studentEmail}
GET  /api/scholarships
GET  /api/mentors
GET  /api/universities
GET  /api/skills
GET  /api/activities
GET  /api/health
```

## Validation completed

- TypeScript compilation passed
- ESLint passed
- Vite production build passed
- No MySQL schema or existing records were changed by this update
