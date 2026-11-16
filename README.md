# Sinchana Poojary Portfolio

[![CI](https://github.com/Sinchu-7/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Sinchu-7/Portfolio/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Sinchu-7/Portfolio/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Sinchu-7/Portfolio/actions/workflows/deploy-pages.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A full-stack, production-ready portfolio application built with a React + Vite frontend and an Express + MongoDB backend. Showcases professional engineering experience, AI/ML research projects, education, certifications, and an interactive contact form.

🔗 **Live Website**: [https://sinchu-7.github.io/Portfolio/](https://sinchu-7.github.io/Portfolio/)

---

## Features
- **Modern Responsive Design**: Single-page portfolio with smooth section scrolling, mobile drawer menu, and subtle particle background.
- **Project Filtering & Deep-Dive Modals**: Interactive filter tabs and architectural deep-dive modals allowing visitors to explore projects by category (Computer Vision, AI for Agriculture, Business Intelligence) with direct links to code and discussions.
- **Interactive Experience Timeline**: Detailed career and internship milestones with technology tag badges.
- **Contact Form with Mailto Fallback**: Client-side validated form communicating with a secure backend API, rate limiting, and an automatic direct mailto fallback for static hosting.
- **Accessibility & UX**: Includes WCAG-compliant skip-to-content keyboard link, focus management, ESC-to-close modal and drawer listeners, back-to-top floating control, and one-click email clipboard copy with Toast alerts.
- **Multi-Platform Deployment Ready**: Includes automated GitHub Actions workflow for GitHub Pages, `vercel.json` for Vercel, and `netlify.toml` for Netlify.
- **Modular Express Backend**: Decoupled routes, centralized environment configuration, performance timing middleware (`X-Response-Time`), and health monitoring.
- **Robust Automated Testing**: Unit and integration test suites using Vitest, React Testing Library, and Supertest.
- **Continuous Integration & Automated Deployment**: GitHub Actions workflows validating multi-project linting, tests, builds, and automatic publishing to GitHub Pages on push.

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
|   |   +-- deploy-pages.yml
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
|   +-- public/ (404.html, favicon.svg, robots.txt, sitemap.xml, site.webmanifest, _redirects)
|   |   +-- components/ (BackToTop.jsx, ErrorBoundary.jsx, ProjectModal.jsx, Toast.jsx)
|   |   +-- test/ (ContactForm.test.jsx, ErrorBoundary.test.jsx, ProjectFilter.test.jsx, setup.js)
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
+-- netlify.toml
+-- package.json
+-- README.md
+-- vercel.json
```

---

## Tech Stack

- **Frontend**: React 18/19, Vite, Framer Motion, Lucide React, Modern CSS3
- **Backend**: Node.js, Express, MongoDB + Mongoose, Helmet, CORS, Express Rate Limit, Nodemailer
- **Testing**: Vitest, React Testing Library, Supertest
- **Quality & CI/CD**: ESLint, Prettier, GitHub Actions CI & Pages Deployment

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

## Deployment as a Live Website

### GitHub Pages (1-Click Setup)
1. In your repository on GitHub, navigate to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to **`GitHub Actions`**.
3. Push to `main` — GitHub Actions will automatically build and publish your site at:
   `https://sinchu-7.github.io/Portfolio/`

For detailed setup on **Vercel**, **Netlify**, or **Render**, refer to [`docs/deployment.md`](docs/deployment.md).

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

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/deployment.md`](docs/deployment.md)
- [`docs/troubleshooting.md`](docs/troubleshooting.md)
- [`docs/qa-checklist.md`](docs/qa-checklist.md)
