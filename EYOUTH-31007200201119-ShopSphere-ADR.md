# Architecture Decision Record (ADR)

**Student ID:** `EYOUTH-31007200201119`  
**Student Name:** Younes Aly  
**Project:** ShopSphere Enterprise Production and Cloud Modernization  

---

### 1. Decision: Extracting the Review Service into an Independent Microservice
- **Extracted Component:** Customer Reviews and Ratings (`ShopSphere-review-service`).
- **Why this service was chosen:**
  1. **Keeping core shopping online:** Reviews are not required for customer checkout. If the review service has an issue or goes down, customers can still browse products, add items to their cart, and complete orders without interruption.
  2. **Different database needs:** Reviews use MongoDB document storage for comments and ratings, while orders and users use PostgreSQL. Separating reviews allows each database to be managed and scaled on its own.
  3. **Easier updates:** The team can update and deploy changes to the review system without having to test or redeploy the main application.

---

### 2. Decision: Moving Welcome Emails to a Serverless Function
- **Serverless Workload:** Sending Welcome Emails on Registration (`ShopSphere-serverless-email`).
- **Why this workload was chosen:**
  1. **Only runs when needed:** Sending emails happens only when someone creates an account. A serverless function runs only when triggered and shuts down when done, avoiding the cost of a server running 24/7.
  2. **Faster user signup:** Connecting to email servers takes extra time. Moving email delivery to a background serverless function makes user registration fast and keeps the main API responsive.
  3. **Simple task:** Sending an email is a single, short-lived task that does not need to store state on the server.

---

### 3. Summary of Modernized Architecture

```
[ Frontend (Single Page Application) ] ──REST──> [ Main Application (Core API) ] ──REST──> [ Review Microservice ]
                                                              │                                       │
                                                 HTTP Trigger │                                       ▼
                                                              ▼                               [( MongoDB Atlas )]
                                              [ Vercel Serverless Function ]
                                                     (Email Worker)
```
