# ShopSphere Production Rollback Plan

**Student ID:** `EYOUTH-31007200201119`  
**Student Name:** Younes Aly  
**Project:** ShopSphere Enterprise Production and Cloud Modernization  
**Target Recovery Time:** Under 60 Seconds  

---

## 1. How Problems Are Detected in Production (Task 1 Monitoring)

A production issue is caught immediately using the monitoring tools set up in **Task 1**:

| Monitoring Tool | Metric & Trigger Condition | Alert Threshold |
| :--- | :--- | :--- |
| **Uptime Monitoring Probe** | `/health` endpoint non-200 status or timeout | Immediate alert if 2 consecutive 60-second checks fail. |
| **Vercel Observability** | Server errors (5xx status codes) spike above 1% | Real-time threshold alert in Vercel dashboard. |
| **Structured Logging Stream** | Clustered `level: "ERROR"` entries | Automated filter catches unexpected server errors. |

---

## 2. Step-by-Step Production Restoration Procedure

When a failure occurs after a new deployment, the operations team follows these steps:

```
[ Failure Detected ] ──► [ Instant Vercel Rollback (<5s) ] ──► [ Git Revert on Main ] ──► [ Verification ]
```

### Step 1: Instant Production Rollback (Blue/Green Traffic Switch)
1. Open the **Vercel Project Dashboard** for the affected service (Backend or Frontend).
2. Go to the **Deployments** tab.
3. Locate the **last known stable production deployment**.
4. Click the options menu (`...`) on that deployment and select **"Promote to Production"**.
5. **Instant Traffic Switch:** Vercel uses an instant Blue/Green traffic switch to route all user traffic back to the working build in **less than 5 seconds** with zero build delay and zero downtime.

### Step 2: Git Codebase Synchronization (Revert Bad Code)
To prevent the faulty code from being redeployed in future merges:
1. Revert the bad commit on the `main` branch:
   ```bash
   git checkout main
   git pull origin main
   git revert <FAILED_COMMIT_HASH> -m "revert: rollback failed production release"
   git push origin main
   ```
2. Sync the revert to `staging` and `development` branches to keep all environments aligned.

### Step 3: Database Recovery (If Migration Failed)
- If the failed release included an incompatible database migration:
  1. Open the **Supabase Dashboard ➔ Database ➔ Backups**.
  2. Restore the backup snapshot taken before the deployment.

### Step 4: Verification
1. Run a health check: `curl -I https://fullstack-ecommerce-cloud-younes-al.vercel.app/health` (must return HTTP 200 OK).
2. Confirm the Uptime monitor turns green.
3. Test logging in as `customer@example.com` and adding an item to the cart to verify end-to-end functionality.
