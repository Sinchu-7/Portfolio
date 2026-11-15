# Deployment notes

## Frontend deployment
- Deploy the `frontend` directory to Vercel or Netlify.
- Set the `VITE_API_URL` environment variable to the deployed backend URL.

## Backend deployment
- Deploy the `backend` directory to Render or another Node-compatible host.
- Configure `MONGODB_URI`, `CLIENT_URL`, and optional SMTP values in the hosting environment.

## Database
- Use MongoDB Atlas for production data storage.

## Security
- Never commit `.env` files.
- Keep SMTP credentials and API secrets in environment variables only.
