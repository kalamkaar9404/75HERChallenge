# 🏥 Dr. NutriCare — Immutable Health Integrity
### AI-Powered Nutrition + Blockchain-Verified Medical Records on Polygon Amoy

---

## The Problem

Medical data tampering is a silent crisis. Patient records — nutrition plans, prescriptions, lab results — are stored in centralized databases that can be silently modified. A changed hemoglobin value or a falsified meal plan can cause life-threatening harm to pregnant women and chronically ill patients. There is no easy way for a doctor, NGO, or auditor to know if the data they are seeing is the **original, approved data**.

---

## 💡 The Blockchain Solution: Hash & Anchor

Dr. NutriCare implements an **Immutable Health Shield** using the Polygon Amoy testnet:

1. **Hash** — Every patient record and uploaded document is converted into a deterministic **64-character SHA-256 fingerprint**. The same data always produces the same hash.
2. **Anchor** — The hash is written to our `MedicalIntegrity` Solidity contract on Polygon Amoy via a **silent admin wallet**. No MetaMask popup required.
3. **Verify** — At any time, the system recomputes the SHA-256 hash of the current data and compares it against the immutable on-chain hash:
   - 🟢 **Green — Integrity Verified**: Hashes match. Data is untouched.
   - 🔴 **Red — Tamper Detected**: Hashes differ. Someone edited the data after anchoring.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui, Framer Motion |
| AI / LLM | OpenRouter API → `google/gemini-2.0-flash-exp:free` (Maternal Health AI) |
| Blockchain | Solidity 0.8.20, Ethers.js v6, Polygon Amoy Testnet (Chain ID 80002) |
| Smart Contract | `MedicalIntegrity.sol` — string-keyed SHA-256 anchor registry |
| Hashing | SHA-256 via Web Crypto API (browser-native, zero dependencies) |
| Dev Tools | Hardhat v3, dotenv, `@nomicfoundation/hardhat-ethers` |

---

## 🚀 Installation Guide

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd 75her
npm install          # root Hardhat deps
cd frontend && npm install && cd ..
```

### 2. Configure Root `.env`

```dotenv
PRIVATE_KEY=0xYourMetaMaskPrivateKey
AMOY_RPC_URL=https://rpc-amoy.polygon.technology
INTEGRITY_CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
```

### 3. Configure `frontend/.env.local`

```dotenv
OPENAI_API_KEY=sk-or-v1-...
POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
ADMIN_PRIVATE_KEY=0xYourPrivateKey
INTEGRITY_CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
```

### 4. Run the App

```bash
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎬 Hackathon Demo Guide

Follow these **4 steps** to demonstrate the full Immutable Health Shield live to judges.

---

### ⭐ Step 1 — Upload a Fake Medical Report

1. Open the app at `http://localhost:3000`
2. Navigate to **Patient Portal** in the left sidebar
3. Locate the **🔐 Secure Document Vault** panel (left column)
4. Click the upload zone or drag & drop any PDF/image file (you can use a fake "lab_report.pdf")
5. Select document type: **Lab Report**
6. Click **"Anchor to Blockchain"**

**What happens:**
- The browser computes the **SHA-256 hash** of the file using the Web Crypto API
- The hash is POSTed to `/api/blockchain/anchor-file`
- The server calls `anchorRecord(recordId, sha256Hash)` on the `MedicalIntegrity` contract
- After ~5 seconds, a **🔐 "Document Anchored on Blockchain!"** toast appears
- The document appears in the vault with a **green Blockchain Verified badge**

---

### ⭐ Step 2 — Show the Blockchain Transaction on PolygonScan

1. In the document vault, find the anchored document
2. The TX hash is displayed truncated: `0xbfde64b6...`
3. Click **"PolygonScan"** link next to the TX hash

**What to show judges:**
```
https://amoy.polygonscan.com/tx/0xbfde64b6ea1703b6cb9f09e00b36c7134fa33dd31876c0d78f4051c3314ace8b
```

- Contract address: `0xA3D7B89A83a6a5B6956194b510AB1b591A916920`
- The transaction input data contains the patient record ID and SHA-256 hash
- Block timestamp proves **when** the data was anchored
- This record is **permanent and immutable** — no one can change it

> **Hover** over the green shield badge to see the tooltip:
> `"Anchored on Polygon Amoy at [Timestamp] | Transaction: 0xbfde64b6…"`

---

### ⭐ Step 3 — Ask the AI Chatbot About the Report

1. In the right column, find the **Maternal Health AI** chatbot panel
2. It will show: *"🔐 I am analyzing your blockchain-verified records to provide this insight."*
3. Type one of these questions:

```
Is my hemoglobin level normal for Week 28?
```
```
What should my blood glucose be in the third trimester?
```
```
I uploaded a lab report — what nutrients should I focus on?
```

**What judges will see:**
- The AI cites your **blockchain-verified records** explicitly
- It knows your pregnancy week, vitals, and how many documents are anchored
- It gives medically grounded responses powered by **Gemini 2.0 Flash** (free tier)
- Every response begins: *"🔐 I am analyzing your blockchain-verified records to provide this insight."*

---

### ⭐ Step 4 — Simulate Tampering & Show the Red Alert

1. Click **"Verify Authenticity"** on the anchored document → it shows **✅ Integrity Verified!** toast
2. Now **manually edit the file** on your computer (open the PDF/image in an editor and resave it)
3. Click **"Verify Authenticity"** again → select the modified version of the file
4. The system re-hashes the file — the hash is now **different from what's on-chain**

**What judges see:**
```
🚨 Data Tampering Detected!
lab_report.pdf — Hash mismatch! File may have been modified.
```

- The badge turns **🔴 red** (Integrity Failed)
- The Maternal Health Timeline updates the document entry to show the tamper status
- This proves that even a **1-byte change** to the file is instantly detected

---

## 📁 Project Structure

```
75her/
├── contracts/
│   └── MedicalIntegrity.sol             # Deployed: 0xA3D7B89A83a6a5B6956194b510AB1b591A916920
├── scripts/
│   ├── deploy.mjs                       # Deploy to Amoy
│   └── anchorMockPatient.mjs            # Anchor Priya Sharma test record
├── hardhat.config.js                    # Hardhat v3 + hardhat-ethers
├── frontend/
│   ├── app/
│   │   ├── (dashboard)/patient-portal/  # ← Main Patient Dashboard (THIS PAGE)
│   │   └── api/blockchain/
│   │       ├── anchor-file/route.ts     # POST — upload + hash + anchor
│   │       ├── verify-file/route.ts     # POST — re-hash + compare on-chain
│   │       ├── anchor/route.ts          # POST — anchor pre-hashed data
│   │       └── tamper/route.ts          # POST — dev-only tamper simulator
│   │   └── api/chat/
│   │       └── maternal/route.ts        # POST — Gemini AI maternal assistant
│   ├── lib/
│   │   ├── blockchain.ts                # Ethers v6 contract helpers (server-only)
│   │   └── hash-engine.ts              # Deterministic SHA-256 hashing
│   └── components/patient-portal/
│       ├── document-vault.tsx           # Upload + anchor + vault list
│       ├── maternal-timeline.tsx        # Pregnancy week timeline
│       ├── maternal-chatbot.tsx         # Gemini AI chat sidebar
│       └── blockchain-badge.tsx         # Green/red shield badge + tooltip
└── README.md
```

---

## 📜 Smart Contract

**`MedicalIntegrity.sol`** — Deployed on Polygon Amoy

| Address | `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` |
|---|---|
| Network | Polygon Amoy Testnet (Chain ID 80002) |
| Explorer | [amoy.polygonscan.com](https://amoy.polygonscan.com/address/0xA3D7B89A83a6a5B6956194b510AB1b591A916920) |
| Deploy TX | `0xbfde64b6ea1703b6cb9f09e00b36c7134fa33dd31876c0d78f4051c3314ace8b` |
| Anchor TX | `0x4c31ad42cf7cf96cae3a0a9f36e2f603995333b125543a25943f781f4fc5997b` |

| Function | Description |
|---|---|
| `anchorRecord(id, hash)` | Store SHA-256 hash for a document/record ID (owner only) |
| `verifyRecord(id)` | Returns hash, timestamp, recorder address, exists flag |
| `getRecordHash(id)` | Returns just the stored hash string |
| `recordExists(id)` | Returns `true` if anchored |

---

## 🔐 Security Notes

- Private keys are **never exposed to the browser** — all signing is server-side in Next.js API routes
- `.env` and `frontend/.env.local` are excluded from Git via `.gitignore`
- `/api/blockchain/tamper` returns **404 in production**
- `onlyOwner` modifier ensures only the admin wallet can anchor records

---

## 🧪 Scripts

```bash
node check_wallet.mjs           # Check wallet balance before deploying
npm run compile                 # Compile Solidity contracts
npm run deploy                  # Deploy MedicalIntegrity to Amoy
npm run anchor                  # Anchor mock patient (Priya Sharma)
cd frontend && npm run dev      # Start the app
```

---

*Built with ❤️ for maternal healthcare data integrity on Polygon Amoy*
