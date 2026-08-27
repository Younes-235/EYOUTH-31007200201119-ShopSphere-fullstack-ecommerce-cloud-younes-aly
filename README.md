# ShopSphere — Enterprise Production and Cloud Modernization

**Student ID:** `EYOUTH-31007200201119`  
**Student Name:** Younes Aly  
**Level:** Level 5 Final Project (Digital Egypt Cubs Initiative — DECI)  

---

## 1. Project Overview

ShopSphere is an enterprise-grade, cloud-modernized e-commerce platform. The application has been transitioned from a local monolith into a cloud-native, microservices-driven architecture featuring:
- **Cloud-Native Frontend & Backend:** Hosted on Vercel with Global Edge Content Delivery Network (CDN) and Serverless Node.js execution.
- **Managed Cloud Databases:** Supabase PostgreSQL for relational transactions (products, users, orders, carts) and MongoDB Atlas for customer reviews and activity audit trails.
- **Microservices & Serverless Modernization:** Independent Review Microservice and asynchronous Vercel Serverless Welcome Email Function.
- **Production Operations:** Automated multi-stage GitHub Actions CI/CD pipeline, branch protection, structured JSON logging, and a zero-downtime rollback strategy.

---

## 2. Live Cloud Endpoints (Sub-task 4.4)

| # Deliverable | Component Role | Live Public URL |
| :--- | :--- | :--- |
| **1. Application Frontend** | React Single Page Application (Vercel Edge) | https://fullstack-ecommerce-cloud-younes-al-five.vercel.app |
| **2. Review Microservice** | Independent Reviews Service (Express & MongoDB Atlas) | https://shopsphere-review-service-umber.vercel.app/api/reviews?productId=1 |
| **3. GitHub Repository** | Source Code, Kubernetes Manifests & CI/CD Pipeline | https://github.com/Younes-235/EYOUTH-31007200201119-ShopSphere-fullstack-ecommerce-cloud-younes-aly |
| **4. Main Backend API** | Core REST API (Vercel Serverless Node.js) | https://fullstack-ecommerce-cloud-younes-al.vercel.app/api/products |
| **5. Serverless Email Function** | Background Registration Email Worker | https://shopsphere-serverless-email.vercel.app/api/send-welcome-email |
| **6. Production Health Check** | System Uptime & Monitoring Probe | https://fullstack-ecommerce-cloud-younes-al.vercel.app/health |
| **7. Live Uptime Status Page** | Public UptimeRobot 24/7 Monitoring Dashboard | https://stats.uptimerobot.com/4foTT9R59k |

---

## 3. Evaluator Test Accounts

| Role | Email | Password | Features to Test |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@example.com` | `AdminSecure123!` | Admin Dashboard, Product Management, Activity Audit Logs (`/admin/logs`) |
| **Customer** | `customer@example.com` | `password123` | Browsing Catalog, Cart Synchronization, Order Checkout, Profile (`/profile`) |

---

## 4. Technology Stack

- **Frontend:** React 18, React Router v6, TanStack Query v5, Axios, Vite, Vanilla CSS.
- **Backend API:** Node.js, Express.js, Prisma ORM, Helmet security headers, CORS origin filtering, Rate Limiting.
- **Microservices & Serverless:** Express Review Microservice, Vercel Serverless Functions, Nodemailer.
- **Cloud Databases:** Supabase Managed PostgreSQL (AWS Dublin), MongoDB Atlas (AWS Frankfurt).
- **Container Orchestration:** Kubernetes Multi-Cloud Namespace Simulation (`aws-simulation` and `gcp-simulation`).
- **CI/CD & DevOps:** GitHub Actions Automated Multi-Stage Pipeline, Branch Protection Rules.

---

## 5. Structured Logging & Production Observability (Sub-task 4.2)

Structured JSON logging is implemented across all backend services using dedicated middleware (`backend/middleware/structuredLogger.js` and `backend/middleware/errorMiddleware.js`). Every incoming HTTP request and system error is emitted as a JSON object with an ISO timestamp and severity level:

### Sample Request Entry:
```json
{
  "timestamp": "2026-08-27T09:02:31.171Z",
  "level": "INFO",
  "type": "HTTP_REQUEST",
  "method": "GET",
  "url": "/api/products",
  "statusCode": 200,
  "responseTimeMs": 18.91,
  "ip": "::1",
  "userAgent": "Mozilla/5.0..."
}
```

### Sample Error Entry:
```json
{
  "timestamp": "2026-08-27T09:02:35.402Z",
  "level": "ERROR",
  "type": "SYSTEM_ERROR",
  "method": "POST",
  "url": "/api/orders",
  "statusCode": 500,
  "message": "Database transaction failure"
}
```

### Where Logs Are Read:
- **Production Runtime Logs:** Streamed live in the **Vercel Project Dashboard ➔ Logs / Observability Tab**.
- **Public CI/CD Verification (GitHub Workflows):** When the automated test suite runs during GitHub Actions workflows (`.github/workflows/ci.yml`), the structured JSON logs are printed live in the public **GitHub Actions ➔ Build & Test (CI)** run output. Anyone can open the Actions tab on the repository to see the structured JSON output with timestamps and levels.

---

## 6. Project Documentation & Deliverables

- 📄 [`EYOUTH-31007200201119-ShopSphere.md`](./EYOUTH-31007200201119-ShopSphere.md) — Master links and project sharing document (Sub-task 4.4).
- 📄 [`EYOUTH-31007200201119-ShopSphere-Task2.md`](./EYOUTH-31007200201119-ShopSphere-Task2.md) — Cloud architecture diagram, service classification, and Kubernetes simulation (Task 2).
- 📄 [`EYOUTH-31007200201119-ShopSphere-ADR.md`](./EYOUTH-31007200201119-ShopSphere-ADR.md) — Architecture Decision Record for microservice and serverless choices (Sub-task 3.4).
- 📄 [`EYOUTH-31007200201119-ShopSphere-RollbackPlan.md`](./EYOUTH-31007200201119-ShopSphere-RollbackPlan.md) — 1-Page production incident rollback plan (Sub-task 4.3).