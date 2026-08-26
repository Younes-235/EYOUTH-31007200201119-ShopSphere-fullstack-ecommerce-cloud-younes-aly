# ShopSphere Production Rollback Plan

**Author:** ShopSphere Cloud Operations Team  
**Scope:** Main Backend API, Review Microservice, Serverless Email Function, and Frontend SPA  
**Target RTO (Recovery Time Objective):** < 60 Seconds  

---

## 1. Incident Detection & Failure Triggers (Task 1 Monitoring)

A production release failure is detected immediately via the automated monitoring instruments established in **Task 1**:

| Detection Instrument | Metric / Failure Condition | Alert Mechanism & Threshold |
| :--- | :--- | :--- |
| **UptimeRobot Health Probe** | `/health` endpoint non-200 response or HTTP timeout | Instant alert triggered if 2 consecutive 60s probes fail. |
| **Vercel Observability** | Spike in HTTP 5xx error rates ($> 1\%$ of traffic) | Real-time threshold alert via Vercel Runtime Monitoring. |
| **Vercel Log Stream (Task 4.2)** | Cluster of `level: "ERROR"` structured JSON logs | Automated error filter flagging fatal unhandled exceptions. |
| **Latency Monitor** | p95 latency $> 2000\text{ms}$ sustained for 2 minutes | Automated performance alert on API gateway. |

---

## 2. Step-by-Step Production Restoration Procedure

When a failure is confirmed post-deployment, the on-call engineer executes the following zero-downtime rollback workflow:

```
[ Incident Detected ] ──► [ Instant Vercel Rollback (<15s) ] ──► [ Git Revert on Main ] ──► [ Verification ]
```

### Step 1: Instant Production Rollback (Primary Procedure — Zero Build Delay)
1. Open the **Vercel Project Dashboard** for the affected service:
   - Backend: [`fullstack-ecommerce-cloud-younes-al`](https://vercel.com/younes14/fullstack-ecommerce-cloud-younes-al)
   - Frontend: [`fullstack-ecommerce-cloud-younes-al-five`](https://vercel.com/younes14/fullstack-ecommerce-cloud-younes-al-five)
2. Navigate to the **Deployments** tab.
3. Locate the **last known healthy production deployment** (the prior green release).
4. Click the **`...` (Options)** menu on that deployment and select **"Promote to Production"** (or **"Rollback to this Deployment"**).
5. **Instant Traffic Rerouting:** Vercel switches production traffic to the healthy build in **$< 5$ seconds** without waiting for a rebuild.

### Step 2: Git Codebase Synchronization (Revert Failed Commit)
To prevent the bad commit from being re-deployed on future merges:
1. Identify the bad commit hash on `main`:
   ```bash
   git checkout main
   git pull origin main
   git revert <FAILED_COMMIT_HASH> -m "revert: rollback failed production release"
   git push origin main
   ```
2. Propagate the revert to `staging` and `development` branches:
   ```bash
   git checkout staging && git merge main && git push origin staging
   git checkout development && git merge main && git push origin development
   git checkout main
   ```

### Step 3: Database & State Recovery (If Migration Failed)
- If the failed release involved a destructive PostgreSQL schema migration:
  1. Access **Supabase Dashboard ➔ Database ➔ Backups**.
  2. Restore the Point-in-Time Recovery (PITR) backup snapshot taken prior to the deployment timestamp.
  3. Verify MongoDB Atlas collection indexes remain intact.

### Step 4: Post-Rollback Health Verification
1. Run automated health probe:
   ```bash
   curl -I https://fullstack-ecommerce-cloud-younes-al.vercel.app/health
   # Must return HTTP/2 200 OK
   ```
2. Verify UptimeRobot monitor status turns green (`Online / 100%`).
3. Verify synthetic transactions on frontend: Sign in as `customer@example.com`, add product to cart, and test checkout.

---

## 3. Incident Review & Post-Mortem
Following recovery, the failed release is reproduced and debugged in the isolated **`staging`** environment before any future promotion to `main`.
