# Architecture overview

The portfolio is intentionally split into a frontend and backend so the presentation layer and API layer remain independent.

## Frontend
- Vite-based React application
- Reusable content sections for portfolio storytelling
- Custom CSS to maintain a premium editorial design system

## Backend
- Express server for security, validation, and request handling
- Mongoose model for persistent contact storage when MongoDB is configured
- Optional SMTP integration for email notifications

## Deployment model
- Frontend served via Vercel/Netlify
- Backend served via Render or similar hosting
- MongoDB Atlas for persistent storage
