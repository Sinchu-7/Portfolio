# Portfolio Production Deployment Guide

This guide details step-by-step instructions for deploying the Sinchana Poojary portfolio to live hosting platforms, including GitHub Pages, Vercel, Netlify, and Render.

---

## 1. Deploying to GitHub Pages (Automated via GitHub Actions)

The repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy-pages.yml` that automatically builds and publishes the portfolio whenever changes are pushed to the `main` branch.

### Step-by-step setup:

1. Open your repository on GitHub: [https://github.com/Sinchu-7/Portfolio](https://github.com/Sinchu-7/Portfolio).
2. Go to **Settings** > **Pages** (under the "Code and automation" section in the left sidebar).
3. Under **Build and deployment**:
   - Change **Source** from `Deploy from a branch` to **`GitHub Actions`**.
4. Push a commit to the `main` branch (or run the workflow manually under **Actions** > **Deploy Portfolio to GitHub Pages** > **Run workflow**).
5. Once the action finishes, your website will be live at:
   ```text
   https://sinchu-7.github.io/Portfolio/
   ```

### Notes for GitHub Pages:
- The base path in `frontend/vite.config.js` is set to `./`, ensuring all JavaScript, CSS, and image assets load properly under the repository subpath.
- SPA 404 fallback is handled by `frontend/public/404.html`.
- If no backend server is configured, the contact form automatically provides a direct mailto fallback so visitors can still reach out via their email client.

---

## 2. Deploying Frontend to Vercel

Vercel provides edge hosting with custom domains, automatic SSL, and instant preview branches.

### Step-by-step setup:

1. Sign in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New Project** and select `Sinchu-7/Portfolio`.
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (detected automatically via `vercel.json`) or set to `frontend`
   - **Build Command**: `npm --prefix frontend run build` (or `npm run build` if root is `frontend`)
   - **Output Directory**: `frontend/dist` (or `dist` if root is `frontend`)
4. Under **Environment Variables**, optionally set:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://portfolio-backend.onrender.com`).
5. Click **Deploy**.

---

## 3. Deploying Frontend to Netlify

Netlify configuration is centralized in `netlify.toml` and `frontend/public/_redirects`.

### Step-by-step setup:

1. Sign in to [Netlify](https://app.netlify.com).
2. Click **Add new site** > **Import an existing project** > **GitHub**.
3. Select `Sinchu-7/Portfolio`.
4. Netlify will detect `netlify.toml` automatically:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
5. Click **Deploy Sinchu-7/Portfolio**.

---

## 4. Deploying Backend API to Render

The Express backend can be hosted on Render's free tier.

### Step-by-step setup:

1. Sign in to [Render](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `Sinchu-7/Portfolio`.
4. Configure service settings:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
5. Configure Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `CLIENT_URL`: `https://sinchu-7.github.io` (or your custom domain)
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`)
   - `RATE_LIMIT_WINDOW_MS`: `900000`
   - `RATE_LIMIT_MAX`: `20`
   - *(Optional)* SMTP credentials for direct email forwarding:
     - `SMTP_HOST`: `smtp.gmail.com`
     - `SMTP_PORT`: `587`
     - `SMTP_USER`: `sinchhh09@gmail.com`
     - `SMTP_PASS`: `<Google App Password>`
     - `SMTP_FROM`: `sinchhh09@gmail.com`
6. Click **Create Web Service**.
7. Once deployed, copy your Render URL and add it as `VITE_API_URL` in your frontend deployment settings.

---

## 5. Production Health Verification

After deployment, verify the live endpoints:
- **Frontend**: Check that all navigation links, project filter tabs, project details modals, and resume request buttons function properly.
- **Backend Health**: `GET https://your-backend.onrender.com/api/health` should respond with status `200` and `status: "ok"`.
- **Contact Form**: Test submitting a message from the live frontend. If backend is not connected, verify the direct email fallback button activates.
