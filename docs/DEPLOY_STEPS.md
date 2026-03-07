# 🚀 Step-by-Step Vercel Deployment Guide

Follow these steps exactly to get your live `.vercel.app` link.

---

## STEP 1 — Push your code to GitHub

```powershell
# From C:\Users\khush\75her
git init                          # if not already a git repo
git add .
git commit -m "feat: production-ready NutriCare with Immutable Health Shield"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nutricare-75her.git
git push -u origin main
```

> **Important:** `.env` and `frontend/.env.local` are in `.gitignore` so your  
> private keys will NOT be pushed. Verify with `git status` before pushing.

---

## STEP 2 — Create a Vercel account & import the repo

1. Go to **https://vercel.com** → click **Sign Up** → choose **Continue with GitHub**
2. Click **Add New → Project**
3. Find your `nutricare-75her` repo → click **Import**
4. Vercel will auto-detect it as a Next.js project

---

## STEP 3 — Configure the project settings

On the "Configure Project" screen:

| Setting | Value |
|---|---|
| **Framework Preset** | Next.js (auto-detected) |
| **Root Directory** | `frontend` ← **IMPORTANT: change this** |
| **Build Command** | `npm run build` (auto-detected) |
| **Output Directory** | `.next` (auto-detected) |
| **Install Command** | `npm install` (auto-detected) |

> Click **Edit** next to Root Directory and type `frontend`

---

## STEP 4 — Add Environment Variables

Still on the "Configure Project" screen, scroll to **Environment Variables**.  
Add each one below by clicking **+ Add**:

### 🔴 Required (copy exactly)

```
OPENAI_API_KEY          = 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
ADMIN_PRIVATE_KEY       = 12bd52d3de64cb8836e3077a4314557c509d0bdf907c8589fd3ef99a3a27904f
POLYGON_RPC_URL         = https://rpc-amoy.polygon.technology
INTEGRITY_CONTRACT_ADDRESS = 0xA3D7B89A83a6a5B6956194b510AB1b591A916920
CONTRACT_ADDRESS        = 0xA3D7B89A83a6a5B6956194b510AB1b591A916920
```

### 🟡 Required for browser reads

```
NEXT_PUBLIC_POLYGON_RPC_URL   = https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CONTRACT_ADDRESS  = 0xA3D7B89A83a6a5B6956194b510AB1b591A916920
```

### 🟢 Optional (AI model)

```
OPENROUTER_MODEL = google/gemini-2.0-flash-exp:free
```

---

## STEP 5 — Click Deploy

1. Click the big **Deploy** button
2. Wait ~2 minutes for the build to complete
3. Vercel will show: **"🎉 Your project has been deployed"**
4. Click **Visit** to open your live URL

Your URL will look like:
```
https://nutricare-75her.vercel.app
```

---

## STEP 6 — Verify it works

Open your live URL and test:

| Test | Expected Result |
|---|---|
| Load the home page | Dashboard loads without errors |
| Go to Patient Portal → click **Anchor to Blockchain** | Spins → **🟢 Integrity Verified** |
| Click the PolygonScan link | Opens `amoy.polygonscan.com` with real TX |
| Ask the AI chatbot a question | Gemini responds with blockchain-verified context |
| Click **Simulate Tamper** → **Verify** | **🔴 Data Tampering Detected** |

---

## STEP 7 — Update README with your live URL

Once deployed, edit `README.md` line 8:

```markdown
| 🌐 **Live App** | [https://nutricare-75her.vercel.app](https://nutricare-75her.vercel.app) |
```

Then push:
```powershell
git add README.md
git commit -m "docs: add live demo URL"
git push
```

Vercel will auto-redeploy.

---

## Troubleshooting

### Build fails with "Module not found"
→ Make sure **Root Directory** is set to `frontend` in Vercel project settings.

### "INTEGRITY_CONTRACT_ADDRESS is not set"
→ Go to Vercel Dashboard → Project → Settings → Environment Variables  
→ Add the missing var → Deployments → Redeploy

### Blockchain calls time out
→ The free Amoy RPC can be slow. Add an Alchemy key:  
→ Replace `POLYGON_RPC_URL` with `https://polygon-amoy.g.alchemy.com/v2/YOUR_KEY`  
→ Free Alchemy account: https://www.alchemy.com

### AI chatbot returns error
→ Check `OPENAI_API_KEY` is set correctly in Vercel env vars  
→ The key must be an OpenRouter key (starts with `sk-or-v1-`)

---

## Optional: Deploy BioBERT to Render (for NER feature)

1. Go to **https://render.com** → New → Web Service
2. Connect your GitHub repo → select the `services/biobert` folder as root
3. Set:
   - **Environment:** Docker
   - **Dockerfile path:** `services/biobert/Dockerfile`
   - **Port:** `8200`
4. Add env var: `ALLOWED_ORIGINS=https://your-app.vercel.app`
5. After deploy, copy the Render URL (e.g., `https://biobert-xyz.onrender.com`)
6. Add to Vercel: `BIOBERT_SERVICE_URL = https://biobert-xyz.onrender.com`
7. Redeploy Vercel

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
