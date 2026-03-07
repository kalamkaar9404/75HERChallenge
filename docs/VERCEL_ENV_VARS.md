# Vercel Environment Variables — Dr. NutriCare

Copy every row below into the Vercel Dashboard:
**Project → Settings → Environment Variables**

Set scope to **Production + Preview + Development** for all vars unless noted.

---

## 🔴 Required — App will NOT work without these

| Variable | Example Value | Notes |
|---|---|---|
| `OPENAI_API_KEY` | `sk-or-v1-xxxxxxxx` | OpenRouter API key — get at https://openrouter.ai/keys |
| `ADMIN_PRIVATE_KEY` | `0x12bd52d3…` | MetaMask wallet private key — **⚠️ use a dedicated test wallet** |
| `POLYGON_RPC_URL` | `https://rpc-amoy.polygon.technology` | Polygon Amoy public RPC |
| `INTEGRITY_CONTRACT_ADDRESS` | `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` | Deployed MedicalIntegrity contract |
| `CONTRACT_ADDRESS` | `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` | Same as above (legacy routes) |

---

## 🟡 Required for Public Blockchain Reads (browser-side)

| Variable | Example Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_POLYGON_RPC_URL` | `https://rpc-amoy.polygon.technology` | Exposed to browser — read-only |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` | Exposed to browser — read-only |

---

## 🟢 Optional — AI & Backend Services

| Variable | Example Value | Notes |
|---|---|---|
| `OPENROUTER_MODEL` | `google/gemini-2.0-flash-exp:free` | Default model for all AI routes. Override to swap models |
| `BACKEND_URL` | `https://your-biobert.onrender.com` | BioBERT NER service URL (Render/Railway deploy) |
| `BIOBERT_SERVICE_URL` | `https://your-biobert.onrender.com` | Same as BACKEND_URL (used by `/api/ai/biobert` route) |
| `MEDGEMMA_SERVICE_URL` | `https://your-medgemma.onrender.com` | MedGemma service URL (optional — AI routes degrade gracefully if offline) |

---

## ⚙️ Build / System

| Variable | Value | Notes |
|---|---|---|
| `NEXT_TELEMETRY_DISABLED` | `1` | Disables Next.js telemetry during builds |
| `NODE_ENV` | `production` | Set automatically by Vercel — disables tamper endpoint |

---

## 🚫 DO NOT add these to Vercel (server secrets only)

These must stay in `frontend/.env.local` locally and **never** be prefixed with `NEXT_PUBLIC_`:

- `ADMIN_PRIVATE_KEY` — only needed server-side in API routes
- `OPENAI_API_KEY` — only needed server-side
- Private keys of any kind

---

## How to add vars in Vercel Dashboard

1. Go to: **vercel.com/dashboard → your project → Settings → Environment Variables**
2. For each row above: paste the **Name**, paste the **Value**, select scope **Production**
3. Click **Save**
4. After all vars are added → go to **Deployments** → click **Redeploy**
