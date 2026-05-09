# 🚂 Deploy TaskFlow on Railway — Step by Step

## Prerequisites
- GitHub account
- Railway account (railway.app) — free tier works

---

## STEP 1 — Install Git (if not installed)
```bash
# Check if git is installed
git --version

# If not, download from https://git-scm.com/downloads
```

---

## STEP 2 — Initialize Git repo locally
```bash
cd taskflow
git init
git add .
git commit -m "Initial commit — TaskFlow app"
```

---

## STEP 3 — Create GitHub Repository
1. Go to https://github.com/new
2. Name it: `taskflow`
3. Set to **Public** (free Railway works with public repos)
4. Do NOT add README (we already have one)
5. Click **Create repository**

---

## STEP 4 — Push code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
git branch -M main
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub username.

---

## STEP 5 — Create Railway Account
1. Go to https://railway.app
2. Click **Login** → **Login with GitHub**
3. Authorize Railway to access your GitHub

---

## STEP 6 — Create New Railway Project
1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Find and select your `taskflow` repo
4. Railway auto-detects it as a Node.js project ✅

---

## STEP 7 — Configure Environment (Auto)
Railway reads `railway.json` automatically.
Build command:  `npm run build`
Start command:  `npm run preview`

No manual config needed!

---

## STEP 8 — Generate Domain
1. Click your service → **Settings** tab
2. Scroll to **Networking** → **Generate Domain**
3. Railway gives you a URL like: `taskflow-production.up.railway.app`

---

## STEP 9 — Wait for Deploy (~2 min)
Watch the **Deployments** tab.
Green checkmark = your app is live! 🎉

---

## STEP 10 — Submit
Your Live URL:  https://taskflow-production.up.railway.app
GitHub Repo:    https://github.com/YOUR_USERNAME/taskflow

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails | Check Node version — Railway uses Node 18+ |
| Port error | vite.config.js already reads `process.env.PORT` ✅ |
| White screen | Check browser console; clear localStorage |
| Deploy stuck | Click **Redeploy** in Railway dashboard |

---

## Auto-Deploy on Push
Every `git push` to `main` triggers automatic redeploy on Railway.
```bash
git add .
git commit -m "Update"
git push
```
