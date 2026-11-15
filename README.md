# Sinchana Poojary Portfolio

A full-stack professional portfolio for Sinchana Poojary, built with a React + Vite frontend and an Express + MongoDB backend. The project showcases engineering experience, AI/ML work, projects, education, certifications, and a working contact form.

## Features
- Editorial-style single-page portfolio design
- Responsive navigation and mobile drawer menu
- Experience, project, skill, education, and achievement sections
- Contact form with client-side validation and API submission
- Express backend with health check and contact endpoint
- Rate limiting, sanitization, CORS, and security headers
- Optional SMTP email notifications controlled by environment variables
- SEO metadata and accessible UI elements

## Project structure

```text
Portfolio/
+-- frontend/
¦   +-- public/
¦   +-- src/
¦   +-- index.html
¦   +-- package.json
¦   +-- vite.config.js
¦   +-- eslint.config.js
+-- backend/
¦   +-- src/
¦   +-- tests/
¦   +-- .env.example
¦   +-- package.json
¦   +-- vitest.config.js
+-- .github/workflows/
+-- .gitignore
+-- README.md
+-- package.json
```

## Tech stack

Frontend:
- React
- Vite
- JavaScript
- CSS Modules / custom CSS
- Framer Motion
- Lucide icons

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- Helmet
- CORS
- Express Rate Limit
- Nodemailer

Testing:
- Vitest
- Testing Library
- Supertest

## Local setup

1. Install project dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

2. Configure environment variables:

```bash
cp backend/.env.example backend/.env
```

3. Start frontend and backend in separate terminals:

```bash
cd frontend && npm run dev
cd backend && npm run dev
```

4. Open the frontend at `http://localhost:5173`.

## Production build

```bash
cd frontend && npm run build
cd backend && npm run start
```

## Backend API

### Health check
- GET `/api/health`

### Contact form
- POST `/api/contact`

Request body:

```json
{
  "name": "Sinchana",
  "email": "sinchhh09@gmail.com",
  "subject": "Project inquiry",
  "message": "I would like to discuss a collaboration."
}
```

## Environment variables

See `backend/.env.example` for configuration details.

- `PORT`
- `CLIENT_URL`
- `MONGODB_URI`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `NODE_ENV`

SMTP fields are optional; the form still works without email credentials, but email delivery is skipped when SMTP is not configured.

## Deployment

- Frontend: deploy to Vercel or Netlify
- Backend: deploy to Render or any Node-compatible hosting
- Database: MongoDB Atlas

## Testing

```bash
cd frontend && npm test
cd backend && npm test
```

## GitHub workflow

A CI workflow is configured in `.github/workflows/ci.yml` to install dependencies, run frontend/backend tests, and validate frontend builds.
