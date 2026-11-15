# Sinchana Poojary Portfolio

A full-stack, production-ready portfolio application built with a React + Vite frontend and an Express + MongoDB backend. Showcases professional engineering experience, AI/ML research projects, education, certifications, and an interactive contact form.

---

## Features
- **Modern Responsive Design**: Single-page portfolio with smooth section scrolling, mobile drawer menu, and subtle particle background.
- **Project Filtering**: Interactive filter tabs allowing visitors to explore projects by category (Computer Vision, AI for Agriculture, Business Intelligence).
- **Interactive Experience Timeline**: Detailed career and internship milestones with technology tag badges.
- **Contact Form**: Client-side validated form communicating with a secure backend API, rate limiting, and optional SMTP notification.
- **Accessibility & UX**: Includes WCAG-compliant skip-to-content keyboard link, back-to-top floating control, and one-click email clipboard copy.
- **Modular Express Backend**: Decoupled routes, centralized environment configuration, performance timing middleware (`X-Response-Time`), and health monitoring.
- **Robust Automated Testing**: Unit and integration test suites using Vitest, React Testing Library, and Supertest.
- **Continuous Integration**: GitHub Actions workflow validating multi-project linting, tests, and production builds on push and pull requests.

---

## Project Structure

```text
Portfolio/
+-- .github/
|   +-- ISSUE_TEMPLATE/
|   |   +-- bug_report.md
|   |   +-- feature_request.md
|   +-- workflows/
|   |   +-- ci.yml
|   +-- pull_request_template.md
+-- backend/
|   +-- src/
|   |   +-- config/ (db.js, env.js)
|   |   +-- middleware/ (errorHandler.js, requestTimer.js, security.js)
|   |   +-- models/ (ContactMessage.js)
|   |   +-- routes/ (contactRoutes.js, healthRoutes.js)
|   |   +-- utils/ (emailService.js)
|   |   +-- validators/ (contactValidator.js)
|   |   +-- server.js
|   +-- tests/ (contact.test.js, errorHandler.test.js, health.test.js, notFound.test.js)
|   +-- .env.example
|   +-- package.json
|   +-- vitest.config.js
+-- docs/
|   +-- architecture.md
|   +-- deployment.md
|   +-- qa-checklist.md
|   +-- troubleshooting.md
+-- frontend/
|   +-- public/ (favicon.svg, robots.txt, sitemap.xml, site.webmanifest)
|   +-- src/
|   |   +-- components/ (BackToTop.jsx, ErrorBoundary.jsx, Toast.jsx)
|   |   +-- test/ (ContactForm.test.jsx, ErrorBoundary.test.jsx, setup.js)
|   |   +-- App.jsx
|   |   +-- App.test.jsx
|   |   +-- main.jsx
|   |   +-- styles.css
|   +-- eslint.config.js
|   +-- index.html
|   +-- package.json
|   +-- vite.config.js
+-- .prettierrc
+-- .prettierignore
+-- package.json
+-- README.md
```

---

## Tech Stack

- **Frontend**: React 18, Vite, Framer Motion, Lucide React, Modern CSS3
- **Backend**: Node.js, Express, MongoDB + Mongoose, Helmet, CORS, Express Rate Limit, Nodemailer
- **Testing**: Vitest, React Testing Library, Supertest
- **Quality & CI**: ESLint, Prettier, GitHub Actions CI

---

## Quick Start & Setup

### 1. Install Dependencies
```bash
npm run install:all
```
*(or run `npm install` inside `frontend/` and `backend/` separately)*

### 2. Configure Backend Environment
```bash
cp backend/.env.example backend/.env
```

### 3. Start Development Servers
Run frontend and backend simultaneously or in separate terminal sessions:
```bash
# Frontend (http://localhost:5173)
npm run dev:frontend

# Backend (http://localhost:5000)
npm run dev:backend
```

---

## Available Scripts

From the repository root:
- `npm run check:all`: Runs linting, all tests, and frontend production build.
- `npm run test`: Runs test suites for both frontend and backend.
- `npm run test:frontend`: Runs frontend Vitest suite.
- `npm run test:backend`: Runs backend Vitest suite.
- `npm run lint`: Runs ESLint across frontend source code.
- `npm run build`: Compiles optimized production bundle in `frontend/dist`.

---

## Backend API Endpoints

### Health Check
- `GET /api/health`
- Returns uptime, environment, node version, memory metrics, and database connectivity.

### Contact Submission
- `POST /api/contact`
- Payload:
```json
{
  "name": "Sinchana",
  "email": "sinchhh09@gmail.com",
  "subject": "Project Inquiry",
  "message": "Hello, I would like to discuss an opportunity."
}
```

---

## Documentation Links

- `docs/architecture.md`
- `docs/deployment.md`
- `docs/troubleshooting.md`
- `docs/qa-checklist.md`
