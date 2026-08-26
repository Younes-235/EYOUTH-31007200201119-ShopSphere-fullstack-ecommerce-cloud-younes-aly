# ShopSphere Serverless Email Service (Task 3.3)

A dedicated Vercel Serverless Function that executes background email dispatching outside the main ShopSphere application.

## Endpoints

- **`GET /api/send-welcome-email`**: Health check and status.
- **`POST /api/send-welcome-email`**: Accepts `{ "to": "user@example.com", "name": "User Name" }` and dispatches welcome email using Nodemailer and Ethereal test inbox.

## Deployment to Vercel

```bash
cd ShopSphere-serverless-email
npx vercel --prod
```
