# #75HER Challenge: Evidence Log

**Project Name:** Dr. NutriCare — Immutable Health Integrity  
**Team Name:** 75HER  
**Challenge:** CreateHER Fest 2026  
**Last Updated:** 2026-03-08

---

## 📊 Evidence Log Table

### A — Core Frameworks & Runtime

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **Next.js 16.1.6** | Full-stack framework — App Router for SSR pages + API routes for server-side blockchain signing | https://nextjs.org | Code | MIT | `frontend/package.json` |
| **React 19.2.4** | UI rendering — component model for all dashboard views | https://react.dev | Code | MIT | Peer dep of Next.js 16 |
| **TypeScript 5.7.3** | Static typing across all `.ts` / `.tsx` files; zero-error compile verified | https://typescriptlang.org | Code | Apache 2.0 | `devDependencies` |
| **Node.js 22** | Server runtime for Next.js API routes and Hardhat scripts | https://nodejs.org | Code | MIT | Required ≥ 18 |

---

### B — Blockchain Stack

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **Solidity 0.8.20** | Smart contract language — `MedicalIntegrity.sol` anchors SHA-256 hashes on-chain | https://soliditylang.org | Code | GPL-3.0 | Optimizer: 200 runs |
| **Hardhat 3.1.11** | Solidity compile + deploy + script runner | https://hardhat.org | Code | MIT | Root `package.json` devDependencies |
| **`@nomicfoundation/hardhat-ethers` 3.0.0** | Hardhat v3 plugin — attaches `ethers` to `network.connect()`; enables `getContractFactory`, `getSigners` | https://github.com/NomicFoundation/hardhat | Code | MIT | Replaces deprecated `hardhat-toolbox` shim |
| **Ethers.js v6.16.0** | Blockchain client — `JsonRpcProvider`, `Wallet`, `Contract`; server-side only in API routes | https://docs.ethers.org/v6 | Code | MIT | Both root + frontend `package.json` |
| **Polygon Amoy Testnet** | Layer-2 blockchain — sub-cent gas fees (~0.023 POL per deploy); Chain ID 80002 | https://polygon.technology/blog/introducing-the-amoy-testnet | Infrastructure | Public Testnet | Deployed contract: `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` |
| **Polygon Amoy Faucet** | Source of free testnet POL used for gas during deployment and anchoring | https://faucet.polygon.technology | Service | Free | 0.5 POL per request |
| **Polygonscan Amoy Explorer** | Verification — judges can confirm deploy TX and anchor TX on-chain | https://amoy.polygonscan.com | Service | Free | Deploy TX: `0xbfde64b6…`; Anchor TX: `0x4c31ad42…` |

---

### C — Frontend UI Libraries

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **Tailwind CSS v4.2.0** | Utility-first CSS — all component styling; zero-runtime, no JS overhead | https://tailwindcss.com | Code | MIT | Uses CSS `@theme` variables (v4 breaking change from v3) |
| **shadcn/ui** | Accessible component primitives — Toast, Dialog, Select, Tabs used throughout dashboard | https://ui.shadcn.com | Code | MIT | Components copied into `frontend/components/ui/` |
| **Radix UI** (various `1.x–2.x`) | Headless accessible primitives underpinning shadcn/ui — Accordion, Dialog, Toast, etc. | https://radix-ui.com | Code | MIT | 20+ packages in `frontend/package.json` |
| **Framer Motion 11.0.3** | Animations — badge entrance/exit, loading progress bar, tamper alert shake effect | https://www.framer.com/motion | Code | MIT | ~140 KB gzipped |
| **Lucide React 0.564.0** | Icon set — `ShieldCheck`, `ShieldAlert`, `FileUp`, `Bot`, `Send` etc. across all components | https://lucide.dev | Code | ISC | Tree-shaken; only imported icons are bundled |
| **Recharts 2.15.0** | Data visualisation — vitals charts, nutrition donut chart in patient dashboard | https://recharts.org | Code | MIT | ~220 KB gzipped |
| **React Hook Form 7.54.1** | Form state management — document upload form, doc type selector | https://react-hook-form.com | Code | MIT | Paired with `zod` for schema validation |
| **Zod 3.24.1** | Runtime schema validation — API request body validation in all blockchain routes | https://zod.dev | Code | MIT | Used in `anchor-file` and `verify-file` routes |

---

### D — AI, Hashing & API Services

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **OpenRouter API** | AI gateway — routes requests to `google/gemini-2.0-flash-exp:free`; single API key covers 100+ models | https://openrouter.ai | Service | Commercial ToS (free tier used) | Rate limit: 20 req/min on free tier |
| **`google/gemini-2.0-flash-exp:free`** | Maternal Health AI model — interprets lab values, gives trimester-specific nutrition guidance | https://openrouter.ai/models/google/gemini-2.0-flash-exp:free | AI Model | Google ToS (accessed via OpenRouter) | ~800ms response; zero cost on free tier |
| **`openai` SDK 6.27.0** | OpenAI-compatible HTTP client — used to call OpenRouter's API from Next.js routes | https://github.com/openai/openai-node | Code | MIT | `baseURL` overridden to `https://openrouter.ai/api/v1` |
| **Web Crypto API** (`crypto.subtle.digest`) | Browser-native SHA-256 of uploaded files — zero external library, zero bundle cost | https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest | Browser API | W3C Standard (no license required) | Used in `document-vault.tsx` for file hashing |
| **`crypto-js` 4.2.0** | Server-side deterministic SHA-256 of JSON patient records (key-sorted before hashing) | https://github.com/brix/crypto-js | Code | MIT | Used in `hash-engine.ts` |
| **Node.js `crypto` module** | Server-side SHA-256 of uploaded file buffers in `anchor-file/route.ts` and anchor scripts | https://nodejs.org/api/crypto.html | Built-in | MIT (Node.js) | `createHash('sha256').update(buffer).digest('hex')` |

---

### E — Development & Build Tools

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **dotenv 17.3.1** | Loads `.env` variables into `process.env` for Hardhat scripts | https://github.com/motdotla/dotenv | Code | BSD-2-Clause | Root `package.json` dependency |
| **`@vercel/analytics` 1.6.1** | Page view analytics in the Next.js frontend | https://vercel.com/analytics | Code | Apache 2.0 | No PII collected |
| **Python 3 + Streamlit** | Optional NGO kitchen dashboard backend (runs on port 8501 independently) | https://streamlit.io | Code | Apache 2.0 | `backend/app.py`; not required for blockchain demo |
| **concurrently 9.2.1** | Runs Next.js and Streamlit in parallel with `npm run dev:all` | https://github.com/open-cli-tools/concurrently | Code | MIT | Dev dependency only |

---

### F — Visual Assets

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **`pregnancy-wellness-hero.jpg`** | Hero banner image on the Patient Portal page | Placeholder — origin unverified | Visual | ⚠️ Demo-only placeholder | **Must be replaced** with a licensed image (Unsplash/Pexels) before public release |
| **`healthy-meal-bowl.jpg`** | Meal plan section background | Placeholder — origin unverified | Visual | ⚠️ Demo-only placeholder | **Must be replaced** before public release |
| **`vital-monitoring.jpg`** | Vitals overview section visual | Placeholder — origin unverified | Visual | ⚠️ Demo-only placeholder | **Must be replaced** before public release |
| **`placeholder-user.jpg`** | Patient avatar default image | Auto-generated placeholder | Visual | MIT (Next.js scaffold) | Safe for demo use |

---

### G — Medical Reference Data

| Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|
| **WHO Anaemia Thresholds** | AI system prompt uses WHO-defined Hb thresholds: <11 g/dL in T1/T3, <10.5 g/dL in T2 = anaemia in pregnancy | https://www.who.int/publications/i/item/9789240050624 | Research | WHO © (Fair Use — educational) | Paraphrased, not quoted verbatim |
| **ACOG Gestational Diabetes Screening Criteria** | AI uses 140 mg/dL threshold for 1-hour GCT as context for blood glucose interpretation | https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/02/screening-and-diagnosis-of-gestational-diabetes-mellitus | Research | ACOG © (Fair Use — educational) | Guideline reference only; AI defers to treating physician |
| **NHS Pregnancy Blood Pressure Guidance** | AI flags >140/90 mmHg as requiring urgent clinical review for pre-eclampsia | https://www.nhs.uk/pregnancy/related-conditions/complications/high-blood-pressure | Research | NHS © Open Government Licence | Paraphrased in system prompt |

---

## 🤖 AI-Generated Content Log

| # | AI Tool | Purpose | What AI Generated | What We Changed | Verification Method |
|---|---|---|---|---|---|
| 1 | **goose (Block)** | `MedicalIntegrity.sol` smart contract | Full Solidity 0.8.20 contract with `mapping(string => Record)`, `anchorRecord()`, `verifyRecord()`, modifiers (`onlyOwner`, `validId`, `validHash`), NatDoc comments | Changed from `bytes32` keys to `string` keys to support human-readable patient IDs; added `validHash` modifier requiring exactly 64 chars; added `totalRecords` counter | Compiled with `npm run compile` (zero errors); deployed to Polygon Amoy at `0xA3D7B89A83a6a5B6956194b510AB1b591A916920`; deploy TX verified on amoy.polygonscan.com |
| 2 | **goose (Block)** | `frontend/lib/blockchain.ts` — Ethers.js v6 helpers | Initial `getProvider()`, `getAdminWallet()`, `anchorRecordById()`, `verifyRecordById()` functions using ethers v5 syntax | Updated all calls to ethers v6 API: `contract.deployed()` → `waitForDeployment()`, `contract.address` → `contract.target`; removed all `console.log` calls that exposed wallet address; changed `VerifyByIdResult` to include `integrityMatch` boolean | Ran `npx tsc --noEmit --skipLibCheck` — zero errors; tested anchor via `npm run anchor` — TX confirmed on-chain |
| 3 | **goose (Block)** | `frontend/lib/hash-engine.ts` — deterministic SHA-256 | `generateRecordHash()`, `sortedStringify()`, `deepSortKeys()`, `hashPatientRecord()`, `hashMealPlan()` functions | Added `truncateHash()` utility; fixed `deepSortKeys` to handle `null` values without throwing; added JSDoc explaining why key-sorting is required for hash determinism | Manually tested: `{ b:2, a:1 }` and `{ a:1, b:2 }` both produce `3e744...` — confirmed deterministic |
| 4 | **goose (Block)** | `scripts/deploy.mjs` — Hardhat v3 deployment script | Initial script using `import { ethers } from 'hardhat'` pattern | Fixed to `const { ethers } = await network.connect()` (Hardhat v3 correct API); added zero-balance guard; **removed** `console.log(process.env.PRIVATE_KEY)` line that exposed the private key (Risk Log #1); replaced with `ADMIN_PRIVATE_KEY=<same value as PRIVATE_KEY>` | Successfully deployed — TX: `0xbfde64b6…` confirmed on Polygonscan |
| 5 | **goose (Block)** | `scripts/anchorMockPatient.mjs` — mock patient anchor script | Full script with mock patient data, `deepSortKeys` SHA-256, `anchorRecord()` call, on-chain verification | Ensured mock patient object keys are sorted in the same order as `hashPatientRecord()` in `hash-engine.ts` to guarantee hash parity; fixed `ethers` import pattern | Ran `npm run anchor` — TX: `0x4c31ad42…` confirmed on-chain; `verifyRecord()` returned exact same hash — ✅ MATCH |
| 6 | **goose (Block)** | `frontend/components/patient-portal/document-vault.tsx` | Full component with upload zone, hashing, anchor flow, document list, verify button | Added `role="button"`, `aria-label`, `tabIndex={0}`, `onKeyDown` for keyboard accessibility (Risk Log #5); added `docType` selector; fixed `sha256File` to use Web Crypto API instead of `crypto-js` for browser compatibility | Tested in Chrome — upload, anchor, verify, tamper all confirmed working |
| 7 | **goose (Block)** | `frontend/components/patient-portal/blockchain-badge.tsx` | Green/red shield badge with hover tooltip, `AnimatePresence` animation | Added `role="status"`, `aria-label` with TX hash, `onFocus`/`onBlur` for keyboard accessibility (Risk Log #6); added PolygonScan link inside tooltip | Tested tooltip hover and keyboard tab focus — both show timestamp and TX hash correctly |
| 8 | **goose (Block)** | `frontend/components/patient-portal/maternal-chatbot.tsx` | Chatbot sidebar with quick prompts, message bubbles, Gemini integration | Added "Blockchain-Verified Analysis" header strip inside AI message bubbles; added `resetChat()` button; fixed welcome message to show `BlockchainBadge` when context is anchored | Tested 4 quick prompts — AI responds with blockchain-verified preamble; graceful fallback tested by setting wrong API key |
| 9 | **goose (Block)** | `frontend/app/api/chat/maternal/route.ts` — Gemini AI route | Initial route using `openai/gpt-4o`; system prompt with patient context injection | Changed model to `google/gemini-2.0-flash-exp:free`; added mandatory `"🔐 I am analyzing your blockchain-verified records"` preamble rule in system prompt; added WHO/ACOG-aligned lab value interpretation guidelines; added graceful fallback for rate limit errors | Live-tested: sent *"Is my hemoglobin normal for Week 28?"* — AI correctly cited 11 g/dL threshold and gave trimester-specific advice |
| 10 | **goose (Block)** | `docs/DECISION_LOG.md`, `docs/RISK_LOG.md`, `README.md` | Structured markdown tables for all 3 submission documents | Verified every file path, line number, TX hash, and library version against the actual codebase before finalising; removed placeholder text; updated contract address to live deployed value | All PolygonScan links verified live; all file paths confirmed with `dir` commands; TypeScript compile check passed |

---

## ✅ Submission Checklist

- [x] At least 3 credible sources documented — **34 total entries across 7 categories**
- [x] Every image and visual asset has a license note (demo-only placeholders flagged for replacement)
- [x] All code dependencies listed with package name, version, and license
- [x] All AI-generated content has a "What You Changed" description with specific evidence
- [x] All links are active and verified (PolygonScan TX links confirmed live)
- [x] No "TBD" or placeholder text in this document

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
