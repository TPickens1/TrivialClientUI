# TrivialCompanyClientUserInterface — Data Bridge Integration

## 1. Objective

Create a fully integrated data pipeline and UI for **The Trivial Company’s Client Portal**, where:

- **Google Sheets → Supabase → React Dashboard**
- Project data syncs automatically from Sheets into Supabase
- Supabase powers real-time data views inside the Netlify React app
- The dashboard links to embedded tools (e.g. *Space Estimator*) **without leaving the app**

---

## 2. What’s Completed ✅

### Google Cloud / Sheets
- **Project:** `TheTrivialCompanySheetsAPI`
- **Enabled:** Google Sheets API
- **Service Account:**  
  `sheets-sync@thetrivialcompanysheetsapi.iam.gserviceaccount.com`
- **JSON Key:** Downloaded and stored securely
- **Shared Sheet:**  
  [Client Projects Master](https://docs.google.com/spreadsheets/d/1cmP8rZuZBKLvWNQEFwYV18M8IicymZlwqcrW7N8kNq4/edit#gid=0)
- **Verified:** Deno + JWT fetch successfully pulls data from Sheets API

### Supabase
- Cleaned legacy Edge Functions and secrets  
- Created new **Edge Function:** `sheets-sync`
- Added Supabase secrets:
  - `GOOGLE_SERVICE_ACCOUNT_KEY`
  - `SHEET_ID`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Confirmed upsert of project data (`Google Sheet → JSON → Supabase projects table`)

### Testing
- Verified via Supabase dashboard and PowerShell `GET`
- Logs confirm valid OAuth & inserts
- Fixed FK constraint issues (customer IDs aligned)
- Final response example:
  ```json
  {
    "success": true,
    "rows_synced": 5,
    "timestamp": "2025-10-15T..."
  }
