# Student ID-ShopSphere

**Student ID:** `[YOUR_STUDENT_ID]`  
**Project Name:** ShopSphere Enterprise Production and Cloud Modernization  
**Program:** Digital Egypt Cubs Initiative (DECI) — Level 5  

---

## 🔗 Core Project Deliverable URLs

As required by **Task 4 (Sub-task 4.4)**, the live production links for the application, review microservice, and source repository are provided below:

| Resource | Service / Component | Live Production URL |
| :--- | :--- | :--- |
| **1. Application Frontend** | React SPA (Cloud Production) | [https://fullstack-ecommerce-cloud-younes-al-five.vercel.app](https://fullstack-ecommerce-cloud-younes-al-five.vercel.app) |
| **2. Review Microservice** | Express & MongoDB Atlas Review API | [https://shopsphere-review-service-umber.vercel.app/api/reviews](https://shopsphere-review-service-umber.vercel.app/api/reviews) |
| **3. GitHub Repository** | Complete Source Code & CI/CD Pipeline | [https://github.com/Younes-235/fullstack-ecommerce-cloud-younes-aly](https://github.com/Younes-235/fullstack-ecommerce-cloud-younes-aly) |

---

## 🛠️ Supporting Cloud Microservices & APIs

| Resource | Service / Component | Live Production URL |
| :--- | :--- | :--- |
| **Main Backend API** | Express REST API (Supabase & MongoDB) | [https://fullstack-ecommerce-cloud-younes-al.vercel.app/api](https://fullstack-ecommerce-cloud-younes-al.vercel.app/api) |
| **Serverless Email** | Vercel Serverless Welcome Email Function | [https://shopsphere-serverless-email.vercel.app/api/send-welcome-email](https://shopsphere-serverless-email.vercel.app/api/send-welcome-email) |
| **Backend Health Check** | System Uptime & Database Health Probe | [https://fullstack-ecommerce-cloud-younes-al.vercel.app/health](https://fullstack-ecommerce-cloud-younes-al.vercel.app/health) |
| **Review Service Health** | Review Microservice Health Probe | [https://shopsphere-review-service-umber.vercel.app/health](https://shopsphere-review-service-umber.vercel.app/health) |

---

## 🔑 Evaluator Test Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@example.com` | `AdminSecure123!` | Full Admin Panel, Product Management, Activity Logs (`/admin`, `/admin/logs`) |
| **Customer** | `customer@example.com` | `password123` | Product Browsing, Real-Time Cart, Order Checkout, Profile Dashboard (`/profile`, `/cart`) |

---

## 📋 Task Deliverables Summary

- **Task 1:** Cloud-native architecture deployed on Vercel with Supabase PostgreSQL and MongoDB Atlas.
- **Task 2:** Audit activity logging system with dynamic target entities (`PRODUCT`, `USER`, `ORDER`).
- **Task 3:** Microservices decomposition (Review Microservice & Serverless Email Function) with documented [`ADR.md`](file:///c:/Users/Younes/Desktop/cloud-anti/ADR.md).
- **Task 4:** 
  - **4.1:** Multi-stage GitHub Actions CI/CD pipeline across `development`, `staging`, and `production` with branch protection and secured secrets.
  - **4.2:** JSON structured request & error logging with Vercel observability.
  - **4.3:** 1-Page incident detection & recovery plan ([`ROLLBACK_PLAN.md`](file:///c:/Users/Younes/Desktop/cloud-anti/ROLLBACK_PLAN.md)).
  - **4.4:** Centralized project sharing document (`StudentID-ShopSphere.md`).
