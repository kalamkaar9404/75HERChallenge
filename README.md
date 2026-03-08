# NutriCare — Immutable Health Integrity
### #75HER Challenge | CreateHER Fest 2026

---
## 4 Line Problem Frame
> **For** pregnant women and chronic illness patients navigating fragmented healthcare systems,  
> **Who** struggle with lost medical history, disorganized physical reports, and unverified data transfers,  
> **Dr. NutriCare is** a decentralized medical locker and SHA-256 integrity layer  
> **That** creates a portable, tamper-proof timeline of health records to ensure seamless and trusted clinical transitions and gives important helpful insights from stored data.
##  Live Demo

| | Link |
|---|---|
|  **Live App** | https://75-her-challenge-lt72.vercel.app/overview |
| 📋 **Decision Log** | [docs/DECISION_LOG.md](./docs/DECISION_LOG.md) |
| 🛡️ **Risk Log** | [docs/RISK_LOG.md](./docs/RISK_LOG.md) |
| 📊 **Evidence Log** | [docs/EVIDENCE_LOG.md](./docs/EVIDENCE_LOG.md) |

### How to Use the Live App

> The app works entirely in your browser. No MetaMask required for viewing.  
> MetaMask is only needed if you want to **deploy your own contract** — the demo uses a pre-deployed admin wallet.

1. Open the live URL above
2. Navigate to **Patient Portal** (left sidebar) → click **"Anchor to Blockchain"** → watch the green shield appear
3. Navigate to **Doctor Monitor** → select a patient → click **"Verify Record Authenticity"**
4. Click **"🔴 Simulate Data Tamper"** → click **Verify** again → see the red alert
5. Ask the **Maternal Health AI** chatbot: *"Is my hemoglobin normal for Week 28?"*
6. Click any **PolygonScan** link to see the permanent on-chain record

### 🦊 Optional: Connect MetaMask to Polygon Amoy

If you want to interact with the contract directly:

1. Open MetaMask → click **Add Network**
2. Fill in:
   - **Network Name:** Polygon Amoy Testnet
   - **RPC URL:** `https://rpc-amoy.polygon.technology`
   - **Chain ID:** `80002`
   - **Currency Symbol:** `POL`
   - **Block Explorer:** `https://amoy.polygonscan.com`
3. Get free test POL at [faucet.polygon.technology](https://faucet.polygon.technology)
4. Import the `MedicalIntegrity` contract at address `0xA3D7B89A83a6a5B6956194b510AB1b591A916920`

---

**One-line Value Proposition:**  
Pregnant women and their doctors get blockchain-verified, tamper-proof medical records with AI-powered nutritional insights in under 10 seconds, with zero MetaMask popups and zero cloud infrastructure cost.

---

## Problem Statement

**Who:** Pregnant women in under-resourced healthcare settings, NGO health workers, and clinical doctors managing maternal health records across multiple facilities.

**Problem:** Medical records — nutrition plans, lab reports, prescriptions, ultrasound results — are stored in centralized databases that can be silently edited. A falsified hemoglobin value or a tampered meal plan can cause life-threatening harm with no audit trail to detect it.

**Impact:** According to the WHO, anaemia affects 40% of pregnant women globally. If a lab value is tampered with and a doctor acts on falsified data, it directly endangers maternal and fetal health. There is currently no lightweight, zero-cost mechanism for a doctor or NGO to cryptographically verify that the record they are reading is the same one that was originally approved.

---

##  Solution Overview

**What we built:**  NutriCare is a full-stack maternal health dashboard that combines AI-powered nutrition planning with blockchain-backed document integrity. Every patient record and uploaded medical document is SHA-256 hashed and permanently anchored to the Polygon Amoy blockchain. The system provides instant visual feedback — a green "Blockchain Verified" shield or a red "Data Tampering Detected" alert — and a Gemini-powered AI assistant that explicitly states it is analyzing blockchain-verified records before answering any health question.

**Key Features:**

- ** Immutable Health Shield:** When a document is uploaded or a patient record is saved, the browser computes a SHA-256 fingerprint using the native Web Crypto API. The hash is anchored silently to `MedicalIntegrity.sol` on Polygon Amoy. A green shield badge with a hover tooltip showing the exact timestamp and truncated TX hash appears next to every verified document.

- ** Tamper Detection:** The "Verify Authenticity" button re-hashes the current file and compares it against the immutable on-chain record. A single changed byte triggers a red `🔴 DATA TAMPERING DETECTED` alert — proving that even a direct database edit is instantly caught.

- **Maternal Health AI:** A context-aware AI chatbot powered by `google/gemini-2.0-flash-exp:free` via OpenRouter. It receives the patient's verified vitals, pregnancy week so that the medical docs can be used for relevant insights"*

---

##  Quick Start & Demo Path

### Requirements
- Node.js 22+
- Python 3.9+ (optional — for Streamlit backend only)
- An [OpenRouter API key](https://openrouter.ai/keys) (free tier)
- A MetaMask wallet with ≥ 0.05 POL on Polygon Amoy ([get free POL](https://faucet.polygon.technology))

### Installation (2 Commands)

```bash
# Clone and install
git clone <your-repo-url>
cd 75her

# Install root Hardhat dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Configure Environment

**Root `.env`** (for contract deployment):
```dotenv
PRIVATE_KEY=0xYourMetaMaskPrivateKey
AMOY_RPC_URL=https://rpc-amoy.polygon.technology
INTEGRITY_CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
```

**`frontend/.env.local`** (for the web app):
```dotenv
OPENAI_API_KEY=sk-or-v1-...
POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
ADMIN_PRIVATE_KEY=0xYourPrivateKey
INTEGRITY_CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
CONTRACT_ADDRESS=0xA3D7B89A83a6a5B6956194b510AB1b591A916920
```

### Run the App

```bash
cd frontend && npm run dev
```

Access: Open **http://localhost:3000** in your browser.

---

### Demo Path

**Step 1:** Navigate to **Patient Portal** → Locate the ** Secure Document Vault** panel → Drag & drop any PDF or image file → Select **"Lab Report"** → Click **"Anchor to Blockchain"**  
→ *A green "Blockchain Verified" badge appears with a live TX hash in ~5 seconds.*

**Step 2:** Click the green shield badge → Hover tooltip shows timestamp and truncated TX hash → Click **"PolygonScan"** link  
→ *The live transaction appears on [amoy.polygonscan.com](https://amoy.polygonscan.com/address/0xA3D7B89A83a6a5B6956194b510AB1b591A916920) — permanent, immutable proof.*

**Step 3:** In the **Maternal Health AI** sidebar → Type *"Is my hemoglobin normal for Week 28?"*  
→ *AI responds beginning with " I am analyzing your records…" with trimester-specific medical guidance.*

**Step 4:** Click **"Verify Authenticity"** → Edit the uploaded file in any editor → Re-upload → Click **"Verify Authenticity"** again  
→ *Red alert: "🚨 Data Tampering Detected! Hash mismatch — file may have been modified.(Useful for insurance claims too)"*

---

##  Technical Architecture

### Components

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Framer Motion | Server-side rendered dashboard; API routes handle all blockchain signing (private key never touches the browser) |
| **Smart Contract** | Solidity 0.8.20, Hardhat v3, Polygon Amoy (Chain ID 80002) | `MedicalIntegrity.sol` — `mapping(string => Record)` stores SHA-256 hashes keyed by patient/record ID; deployed at `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` |
| **Blockchain Client** | Ethers.js v6, `@nomicfoundation/hardhat-ethers` | Server-side signing in Next.js API routes; `anchorRecord()` and `verifyRecord()` calls; silent admin wallet — no MetaMask required |
| **Hashing** | Web Crypto API (`crypto.subtle.digest`), `crypto-js` (server-side) | Browser: zero-dependency SHA-256 of uploaded files; Server: deterministic key-sorted SHA-256 of JSON records |
| **AI Integration** | `google/gemini-2.0-flash-exp:free` via OpenRouter, `openai` SDK | Maternal Health AI chatbot; patient vitals + verified doc list injected as system prompt context |
| **Backend** | Python 3, Streamlit (optional) | Supplementary NGO kitchen dashboard and nutritionist backend (runs independently on port 8501) |
| **Database** | Local disk (`/public/uploads/`) | Document storage for demo; designed to be swapped with S3 in production |

### Architecture Diagram

```
Browser (React 19)
    │
    ├─ Web Crypto API → SHA-256(file)
    │
    └─ Next.js API Routes (Node.js, server-side)
            │
            ├─ /api/blockchain/anchor-file  ──→  Ethers.js v6  ──→  MedicalIntegrity.sol
            ├─ /api/blockchain/verify-file  ──→  Ethers.js v6  ──→  Polygon Amoy RPC
            ├─ /api/blockchain/tamper       ──→  (dev only — mutates local data)
            └─ /api/chat/maternal           ──→  OpenRouter  ──→  Gemini 2.0 Flash
```

---

## 🤖 goose Integration (AI/ML Track)

**Model:** `google/gemini-2.0-flash-exp:free` via OpenRouter (routed through `openai` SDK compatible client).

**Implementation:**
- The `/api/chat/maternal` Next.js route builds a dynamic system prompt that injects the patient's blockchain-verified context: name, pregnancy week, vitals object, and a list of every anchored document (filename + TX hash + timestamp).
- Every AI response is prefaced with `"🔐 I am analyzing your blockchain-verified records to provide this insight."` — enforced in the system prompt.
- If the model is at capacity (free-tier rate limit), the route returns a graceful fallback message rather than crashing.
- A `OPENROUTER_MODEL` env var allows swapping to any OpenRouter model (e.g., `meta-llama/llama-3.1-8b-instruct:free`) without a code change.

**Impact:** Provides trimester-specific lab value interpretation, iron/folate dietary guidance, and warning sign detection in ~800ms — eliminating the need for a doctor to manually cross-reference lab ranges during a consultation.

---

##  Project Logs & Documentation

| Log Type | Purpose | Link |
|---|---|---|
| **Decision Log** | 16 technical choices & tradeoffs made during the hackathon | [docs/DECISION_LOG.md](./docs/DECISION_LOG.md) |
| **Risk Log** | 15 risks identified, fixed, and documented with evidence | [docs/RISK_LOG.md](./docs/RISK_LOG.md) |
| **Evidence Log** | All sources, dependencies, assets & AI-generated content | [docs/EVIDENCE_LOG.md](./docs/EVIDENCE_LOG.md) |

---

## 📜 Smart Contract

**`MedicalIntegrity.sol`** — Live on Polygon Amoy Testnet

| Field | Value |
|---|---|
| Contract Address | `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` |
| Network | Polygon Amoy · Chain ID 80002 |
| Explorer | [amoy.polygonscan.com/address/0xA3D7B8…](https://amoy.polygonscan.com/address/0xA3D7B89A83a6a5B6956194b510AB1b591A916920) |
| Deploy TX | [`0xbfde64b6…`](https://amoy.polygonscan.com/tx/0xbfde64b6ea1703b6cb9f09e00b36c7134fa33dd31876c0d78f4051c3314ace8b) |
| First Anchor TX | [`0x4c31ad42…`](https://amoy.polygonscan.com/tx/0x4c31ad42cf7cf96cae3a0a9f36e2f603995333b125543a25943f781f4fc5997b) |

| Function | Access | Description |
|---|---|---|
| `anchorRecord(id, hash)` | `onlyOwner` | Store SHA-256 hash for a record ID |
| `verifyRecord(id)` | Public | Returns hash, timestamp, recorder address, exists flag |
| `getRecordHash(id)` | Public | Returns just the stored hash string |
| `recordExists(id)` | Public | Returns `true` if record has been anchored |

---

## 📁 Project Structure

```
75her/
├── contracts/
│   └── MedicalIntegrity.sol              # Deployed: 0xA3D7B89A83a6a5B6956194b510AB1b591A916920
├── scripts/
│   ├── deploy.mjs                        # Deploy to Amoy (npm run deploy)
│   ├── anchorMockPatient.mjs             # Anchor Priya Sharma test record
│   └── checkBalance.mjs                  # Verify wallet balance before deploy
├── hardhat.config.js                     # Hardhat v3 + hardhat-ethers plugin
├── docs/
│   ├── DECISION_LOG.md                   # 16 technical decisions
│   ├── RISK_LOG.md                       # 15 risks identified & fixed
│   └── EVIDENCE_LOG.md                   # All sources & attributions
├── frontend/
│   ├── app/
│   │   ├── (dashboard)/patient-portal/   # Main patient dashboard page
│   │   └── api/
│   │       ├── blockchain/anchor-file/   # POST — upload + SHA-256 + anchor
│   │       ├── blockchain/verify-file/   # POST — re-hash + compare on-chain
│   │       ├── blockchain/tamper/        # POST — dev-only tamper simulator
│   │       └── chat/maternal/            # POST — Gemini AI maternal assistant
│   ├── lib/
│   │   ├── blockchain.ts                 # Ethers v6 contract helpers (server-only)
│   │   └── hash-engine.ts               # Deterministic SHA-256 hashing utility
│   └── components/patient-portal/
│       ├── document-vault.tsx            # Upload + anchor + vault list UI
│       ├── maternal-timeline.tsx         # Pregnancy week-by-week timeline
│       ├── maternal-chatbot.tsx          # Gemini AI sidebar chatbot
│       └── blockchain-badge.tsx          # Green/red shield badge + tooltip
└── README.md
```

---

## 🧪 Testing & Known Issues

**Test Results:** TypeScript compilation passes with zero errors (`npx tsc --noEmit --skipLibCheck`). Contract deployed and verified on Polygon Amoy. Mock patient anchor TX confirmed on-chain.

**Known Issue 1:** Uploaded files in `/public/uploads/` are not persisted across server restarts — judges must upload a fresh file each demo session.  
*Workaround:* Keep the dev server running; do not restart between demo steps.

**Known Issue 2:** Gemini 2.0 Flash free tier has a 20 req/min rate limit — if exceeded, the chatbot returns a graceful fallback message.  
*Workaround:* Set `OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free` in `frontend/.env.local` as a backup.

**Known Issue 3:** Polygon Amoy block explorer occasionally has 30–60s indexing delays after a transaction is confirmed.  
*Workaround:* Wait 60 seconds before showing PolygonScan to judges.

**Next Steps (with more time):**
- Replace local file storage with IPFS pinning via Pinata for permanent document URLs
- Add real-time WebSocket notifications for critical vitals alerts
- Implement vector DB (Pinecone) for full medical record RAG instead of context injection
- Add unit tests for `anchorRecord` / `verifyRecord` contract functions

---

## 🧰 Scripts Reference

```bash
# From project root (C:\Users\khush\75her)
node check_wallet.mjs           # Check wallet balance before deploying
npm run compile                 # Compile MedicalIntegrity.sol
npm run deploy                  # Deploy contract to Polygon Amoy
npm run anchor                  # Anchor mock patient record (Priya Sharma)

# Frontend
cd frontend && npm run dev      # Start Next.js dev server on port 3000
cd frontend && npm run build    # Production build
```

---

## 🔐 Security Notes

- Private keys are **never exposed to the browser** — all blockchain signing is server-side in Next.js API routes
- `.env` and `frontend/.env.local` are excluded from Git (see `.gitignore`)
- `/api/blockchain/tamper` endpoint returns **404 in production** (`NODE_ENV=production`)
- `onlyOwner` modifier in `MedicalIntegrity.sol` ensures only the admin wallet can anchor records
- See [docs/RISK_LOG.md](./docs/RISK_LOG.md) for the full security audit

---

## 👥 Team & Acknowledgments

**Team Name:** 75HER

| Name | Role | GitHub | LinkedIn |
|---|---|---|---|
| Khushi | Full-Stack Developer · Blockchain Engineer · AI Integration | [@khushi](https://github.com) | [Profile](https://linkedin.com) |

**Special thanks to:** CreateHER Fest 2026 organizers, the **goose** AI assistant by Block (used throughout development for code generation and debugging), and the Polygon Developer community for the Amoy testnet infrastructure.

---

## 📄 License & Attributions

**Project License:** MIT — see [`LICENSE`](./LICENSE)

| Library / Asset | License | Link |
|---|---|---|
| Next.js 16 | MIT | [github.com/vercel/next.js](https://github.com/vercel/next.js) |
| React 19 | MIT | [react.dev](https://react.dev) |
| Ethers.js v6 | MIT | [docs.ethers.org](https://docs.ethers.org) |
| Hardhat v3 | MIT | [hardhat.org](https://hardhat.org) |
| Tailwind CSS v4 | MIT | [tailwindcss.com](https://tailwindcss.com) |
| shadcn/ui | MIT | [ui.shadcn.com](https://ui.shadcn.com) |
| Framer Motion | MIT | [framer.com/motion](https://www.framer.com/motion) |
| Lucide React | ISC | [lucide.dev](https://lucide.dev) |
| Radix UI | MIT | [radix-ui.com](https://www.radix-ui.com) |
| Recharts | MIT | [recharts.org](https://recharts.org) |
| Solidity 0.8.20 | GPL-3.0 | [soliditylang.org](https://soliditylang.org) |
| OpenRouter API | Commercial ToS | [openrouter.ai](https://openrouter.ai) |
| Polygon Amoy Testnet | Public Infrastructure | [polygon.technology](https://polygon.technology) |

---

*Built with ❤️ for maternal healthcare data integrity · #75HER Challenge | CreateHER Fest 2026*
