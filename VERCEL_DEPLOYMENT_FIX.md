# 🚨 Vercel Deployment Issues — Diagnosis & Fixes

## Problem Summary

Your Vercel deployment is failing because:

1. **❌ AI Microservices (BioBERT & MedGemma) are not deployed**
   - Your Next.js app proxies `/api/ai/biobert` and `/api/ai/medgemma` to `http://localhost:8100/8200`
   - On Vercel, these localhost URLs point to nowhere → requests fail
   - These are **separate Python/FastAPI services** that must be deployed independently

2. **❌ File uploads use server filesystem (`/public/uploads`)**
   - Vercel serverless functions have **ephemeral, read-only filesystems**
   - `fs.writeFile()` in `/api/upload` and `/api/blockchain/anchor-file` will **fail silently or throw**
   - Uploaded files disappear after each request

3. **⚠️  Chatbots may work (maternal/chef) if OPENAI_API_KEY is set correctly**
   - They call OpenRouter directly, not the local AI services
   - But they depend on patient context that may be missing

---

## ✅ Immediate Fixes (Required)

### 1. Remove or Fix AI Service Proxies

**Option A (Recommended):** Disable the AI microservices entirely if you don't need them.

Edit `frontend/next.config.mjs`:

```javascript
// REMOVE the rewrites section entirely:
async rewrites() {
  return [];  // ← empty array disables the broken proxies
}
```

**Option B:** Deploy BioBERT & MedGemma to a cloud provider (Render, Railway, Fly.io) and update the URLs:

```javascript
async rewrites() {
  return [
    {
      source: '/biobert/:path*',
      destination: 'https://your-biobert.onrender.com/:path*',  // ← deployed URL
    },
    {
      source: '/medgemma/:path*',
      destination: 'https://your-medgemma.onrender.com/:path*',  // ← deployed URL
    },
  ];
}
```

### 2. Replace Local File Storage with Vercel Blob (or S3)

**Quick fix for demo:** Store file metadata only, skip persistent storage.

Edit `frontend/app/api/blockchain/anchor-file/route.ts`:

```typescript
// REMOVE these lines:
import { writeFile, mkdir } from 'fs/promises';
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

// In the multipart/form-data branch, replace the file write with:
// Just compute hash and anchor — don't save the file
// Remove: await mkdir(UPLOAD_DIR, ...); await writeFile(...);
// Instead, skip file storage entirely:
const ext = extname(file.name) || '.bin';
const safeName = `${randomBytes(12).toString('hex')}${ext}`;
// DON'T write to disk — Vercel's filesystem is ephemeral
fileUrl = null;  // or store a fake URL
```

**Better fix:** Use Vercel Blob Storage:

1. Install: `npm i @vercel/blob`
2. Update the route to upload to Blob instead of local disk.

### 3. Ensure All Required Environment Variables Are Set in Vercel

According to `docs/VERCEL_ENV_VARS.md`, you need:

**Required (Production):**
- `OPENAI_API_KEY` — Your OpenRouter key
- `ADMIN_PRIVATE_KEY` — Wallet private key (test wallet only!)
- `POLYGON_RPC_URL` — e.g., `https://rpc-amoy.polygon.technology`
- `INTEGRITY_CONTRACT_ADDRESS` — `0xA3D7B89A83a6a5B6956194b510AB1b591A916920`
- `CONTRACT_ADDRESS` — Same as above (legacy)

**Public (Browser-exposed):**
- `NEXT_PUBLIC_POLYGON_RPC_URL`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`

**Optional (only if you deploy AI services separately):**
- `BACKEND_URL` or `BIOBERT_SERVICE_URL`
- `MEDGEMMA_SERVICE_URL`
- `OPENROUTER_MODEL` (defaults to `google/gemini-2.0-flash-exp:free`)

**How to add in Vercel:**
1. Go to **vercel.com** → Your Project → **Settings** → **Environment Variables**
2. Add each variable above
3. Scope: **Production** (and Preview if you want)
4. Click **Save**
5. **Redeploy** your app

---

## 🧪 Quick Diagnostic Checklist

Run these checks before redeploying:

- [ ] `frontend/.env.local` contains all required keys (matches your local working config)
- [ ] `frontend/next.config.mjs` has **NO** `rewrites` pointing to `localhost`
- [ ] `frontend/app/api/blockchain/anchor-file/route.ts` does **NOT** use `fs.writeFile` (or you've switched to Blob/S3)
- [ ] All environment variables from `docs/VERCEL_ENV_VARS.md` are added to Vercel Dashboard
- [ ] Smart contract `INTEGRITY_CONTRACT_ADDRESS` is the deployed Amoy address

---

## 🔧 Recommended Final Configuration for Vercel

### Updated `next.config.mjs` (remove broken rewrites):

```javascript
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  env: {
    NEXT_PUBLIC_POLYGON_RPC_URL: process.env.NEXT_PUBLIC_POLYGON_RPC_URL ?? 'https://rpc-amoy.polygon.technology',
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0xA3D7B89A83a6a5B6956194b510AB1b591A916920',
    NEXT_PUBLIC_CHAIN_ID: '80002',
    NEXT_PUBLIC_CHAIN_NAME: 'Polygon Amoy',
    NEXT_PUBLIC_EXPLORER_URL: 'https://amoy.polygonscan.com',
  },
  // NO rewrites — AI services are external deployments
};

export default nextConfig;
```

### Updated `anchor-file/route.ts` (skip file storage):

```typescript
// Remove fs imports
// Remove UPLOAD_DIR constant

// Inside multipart/form-data branch:
const buffer = Buffer.from(await file.arrayBuffer());
fileHash = createHash('sha256').update(buffer).digest('hex');
fileName = file.name;
recordId = `${patientId}-${docType}-${Date.now()}`;

// NO file write to disk — skip storage for demo
// If you need the file later, upload to S3/Blob here
fileUrl = null;  // or omit this field

// Continue to anchor on blockchain
```

---

## 📋 Expected Behavior After Fix

✅ **Chatbots (Maternal & Chef):**
- Will work if `OPENAI_API_KEY` is set
- Maternal chatbot uses blockchain context (if patient is anchored)
- Chef chatbot works independently

✅ **Document Vault:**
- Upload → compute SHA-256 → anchor on-chain
- **File won't be saved permanently** on Vercel (ephemeral filesystem)
- For demo: users can upload, anchor, and verify immediately before page reload
- For production: integrate S3/Blob storage

✅ **Blockchain Verification:**
- Works if `ADMIN_PRIVATE_KEY` and `INTEGRITY_CONTRACT_ADDRESS` are set
- Transactions appear on Polygon Amoy

⚠️ **AI Microservices (BioBERT/MedGemma):**
- Will return 502/504 unless deployed separately
- If you don't need them, remove the UI components that call them

---

## 🚀 Redeploy Steps

1. **Make the code changes** above (remove rewrites, fix file storage)
2. **Commit & push** to your GitHub repo
3. **Vercel will auto-deploy** (or trigger manually from dashboard)
4. Test the deployed URL:
   - Chatbots should work
   - Document upload should anchor (no persistent file, but blockchain works)
   - No errors in browser console

---

## 📚 References

- Local working config: `frontend/.env.local` (use these values in Vercel)
- Vercel env vars guide: `docs/VERCEL_ENV_VARS.md`
- Docker dev setup: `docker-compose.yml` (for local AI services)
- Contract address: `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` (Polygon Amoy)

---

**Bottom line:** The main blockers are the `localhost` AI proxies and filesystem writes. Remove those, set env vars, and your chatbots + doc vault will work on Vercel.
