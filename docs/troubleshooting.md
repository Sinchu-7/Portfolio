# Developer Troubleshooting Guide

This guide provides practical solutions for common local development, environment, and testing issues in the Sinchana Poojary Portfolio repository.

---

## 1. Port In Use / Address Already In Use

### Backend (`EADDRINUSE: 5000`)
- **Cause**: Another instance of the Node server or an external process is running on port 5000.
- **Solution**:
  1. Specify an alternative port in `backend/.env`:
     ```env
     PORT=5001
     ```
  2. Or terminate the occupying process on Windows:
     ```powershell
     netstat -ano | findstr :5000
     taskkill /PID <PID> /F
     ```

### Frontend (`Port 5173 in use`)
- Vite automatically attempts port 5174 if 5173 is occupied. If the port changes, make sure `backend/src/server.js` or `backend/.env` has `CLIENT_URL=http://localhost:5174`.

---

## 2. MongoDB Connectivity & Offline Mode

- The backend server is designed to gracefully operate even when MongoDB is offline.
- If `MONGODB_URI` is not reachable:
  - The server starts successfully.
  - Health check (`/api/health`) reports `"database": "not_connected"`.
  - Contact submissions still return HTTP 201 with `"database": "skipped"`.
- To connect a live MongoDB instance, configure `backend/.env`:
  ```env
  MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
  ```

---

## 3. Contact Form Email Delivery (SMTP)

- If SMTP credentials (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`) are omitted or invalid:
  - An informational warning is logged: `Optional email notification is unavailable`.
  - The contact request does **not** fail; the user receives a successful submission confirmation.

---

## 4. Rate Limiting (`HTTP 429 Too Many Requests`)

- By default, the contact API limits requests to 10 submissions per 15 minutes.
- To relax limits during automated or manual testing, configure `backend/.env`:
  ```env
  RATE_LIMIT_MAX=500
  RATE_LIMIT_WINDOW_MS=60000
  ```

---

## 5. Clearing Vite Cache & Fresh Rebuild

If encountering stale module resolution in the frontend:
```bash
cd frontend
rm -rf node_modules/.vite dist
npm run build
```
