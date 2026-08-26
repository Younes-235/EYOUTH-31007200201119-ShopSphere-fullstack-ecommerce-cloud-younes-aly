# Architecture Decision Record (ADR)
**Project:** ShopSphere Enterprise Cloud Modernization (Level 5 — Task 3)  
**Author:** Younes Aly | **Status:** Approved / Implemented  

---

### 1. Decision: Review Service Extraction to Independent Microservice
- **Extracted Component:** Customer Feedback & Reviews Domain (`ShopSphere-review-service`).
- **Rationale & Suitability:**
  1. **Domain Decoupling & Failure Isolation:** Reviews are supplementary to core transactions. Isolating review management ensures product catalog exploration and checkout flows remain operational even during review service outages.
  2. **Heterogeneous Data Scaling:** Unlike relational orders and user accounts in PostgreSQL, user reviews are unstructured, write-heavy, and best suited for MongoDB document storage. Extracting the service allows independent horizontal scaling and database optimization.
  3. **Targeted Deployment Velocity:** The feedback domain evolves independently (e.g., adding media attachments, sentiment analysis, AI summaries) without requiring redeployment or testing of the central monolith.

---

### 2. Decision: Moving Background Email Dispatching to Serverless
- **Serverless Workload:** Asynchronous Welcome Email Dispatcher (`ShopSphere-serverless-email`).
- **Rationale & Suitability:**
  1. **Event-Driven & Sporadic Traffic:** User registrations occur unpredictably. A dedicated server running 24/7 incurs unnecessary idle costs. Vercel Serverless Functions scale automatically from zero to meet demand on demand, optimizing cloud resource consumption.
  2. **Monolith Resource Offloading:** Establishing SMTP handshakes and rendering email templates are I/O-heavy operations. Delegating this workload to an external serverless function frees the main application's event loop to handle critical API traffic with lower latency.
  3. **Stateless Execution:** Email dispatch is completely stateless and task-bounded, making it an ideal fit for ephemeral, short-lived serverless execution environments.

---

### 3. Summary of Modernized Architecture

```
[ Frontend (SPA) ] ──REST──> [ Main Application (Core API) ] ──REST──> [ Review Microservice (Port 5001) ]
                                          │                                            │
                             HTTP / Event │                                            ▼
                                          ▼                                     [( MongoDB )]
                        [ Vercel Serverless Function ]
                                 (Email Worker)
```
