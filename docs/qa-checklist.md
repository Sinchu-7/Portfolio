# QA checklist

## Frontend checks
- Run `npm --prefix frontend test`
- Run `npm --prefix frontend run build`
- Run `npm --prefix frontend run lint`
- Verify navigation, hero actions, and contact form states in the browser

## Backend checks
- Run `npm --prefix backend test`
- Start `npm --prefix backend run dev` and verify `GET /api/health`
- Submit valid and invalid contact requests using the local API

## Security
- Keep all credentials in `.env` files and deployment secret storage
- Confirm the contact form never exposes stack traces or internal errors
