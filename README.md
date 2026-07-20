<div align="center">

# 🎓 Career Compass

### Empowering Students to Plan Their Future.

A full-stack graduation and career guidance platform that helps students explore scholarships, universities, mentors, career resources, and opportunities—all in one place.

</div>

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

---

## 📖 About the Project

**Career Compass** is a full-stack web application designed to guide students throughout their academic and professional journey. The platform provides access to scholarships, universities, mentors, workplace skills, and career resources while allowing students to manage their personal profiles through a secure backend.

The project follows a separated architecture with independent React and Spring Boot applications for easier development and maintenance.

---

## ✨ Features

- 🎓 Browse scholarship opportunities with direct application links.
- 👨‍🏫 Find mentors with phone and email contact options.
- 🏫 Explore universities with official websites and contact information.
- 📚 Access workplace and life-skill learning resources.
- 👤 Create and edit a personalized student profile.
- 📈 Track academic status from **Year 1** through **Graduate**.
- 📊 Dashboard overview powered by real database data.
- 🔐 Secure authentication using BCrypt password encryption.
- 📱 Responsive and modern user interface.

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Lucide React

### Backend

- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- BCrypt

---

## 📂 Project Structure

```text
career-compass-platform/
├── backend/        Spring Boot API
├── frontend/       React + TypeScript
├── start-dev.bat   Windows launcher
├── start-dev.sh    macOS/Linux launcher
└── README.md
```

---

## 🚀 Getting Started

### 1. Run the Backend

Open the **backend** folder as an **Existing Maven Project** in Eclipse.

Run:

```
GraduatesOpportunitesApplication.java
```

The backend will start at:

```
http://localhost:8081
```

The MySQL configuration can be found in:

```
backend/src/main/resources/application.properties
```

---

### 2. Run the Frontend

Open the **frontend** folder in Visual Studio Code.

Install dependencies (only if needed):

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

```http
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
