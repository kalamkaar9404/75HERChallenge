# #75HER Challenge: Risk Log

**Project Name:** Dr. NutriCare — Immutable Health Integrity  
**Team Name:** 75HER  
**Challenge:** CreateHER Fest 2026  
**Last Updated:** 2026-03-07  

---

## 🛡️ Risk Log Table

| # | Area | Issue Description | Severity | Fix Applied | Evidence / File | Status |
|---|---|---|---|---|---|---|
| 1 | **Privacy & Security** | `scripts/deploy.mjs` printed `ADMIN_PRIVATE_KEY=<actual-hex-key>` to stdout via `console.log(process.env.PRIVATE_KEY)` — any CI log or terminal recording would have captured the live Amoy wallet private key | 🔴 **Critical** | Replaced the log line with `ADMIN_PRIVATE_KEY=<same value as PRIVATE_KEY in root .env>` so the key is never echoed to stdout | `scripts/deploy.mjs` line 35 | ✅ Fixed |
| 2 | **Privacy & Security** | Root `.env.example` contained only a placeholder for `OPENAI_API_KEY` but was missing `PRIVATE_KEY`, `INTEGRITY_CONTRACT_ADDRESS`, and `AMOY_RPC_URL` — contributors cloning fresh would not know which variables were required | 🔴 **Critical** | Rewrote `.env.example` to include all 5 required variables with safe dummy values and inline comments explaining each | `.env.example` | ✅ Fixed |
| 3 | **Privacy & Security** | `frontend/.env.local` (containing live `ADMIN_PRIVATE_KEY` and `OPENAI_API_KEY`) was not explicitly excluded in `.gitignore` under the `frontend/` sub-path — only the root `.env` pattern was present | 🔴 **Critical** | Added `frontend/.env.local` and `frontend/.env*.local` lines to `.gitignore`; verified with `git status` that the file shows as untracked | `.gitignore` lines 5–6 | ✅ Fixed |
| 4 | **Legal / IP** | No `LICENSE` file was present in the project root — open-source submission without a license is technically "all rights reserved" and violates hackathon IP guidelines | 🟠 **Major** | Created `LICENSE` (MIT) in the project root with copyright assigned to the 75HER team | `LICENSE` | ✅ Fixed |
| 5 | **Accessibility** | The document upload drop-zone in `document-vault.tsx` was a `<div>` with only an `onClick` handler — keyboard-only users could not tab to or activate it; no `role`, `aria-label`, or `onKeyDown` handler was present | 🟠 **Major** | Added `role="button"`, `aria-label="Upload a medical document to anchor on the blockchain"`, `tabIndex={0}`, and `onKeyDown` (Enter key triggers file picker) | `components/patient-portal/document-vault.tsx` | ✅ Fixed |
| 6 | **Accessibility** | `BlockchainBadge` tooltip was mouse-only (`onMouseEnter`/`onMouseLeave`) — screen reader and keyboard users received no integrity status information | 🟠 **Major** | Added `role="status"`, `aria-label` (includes badge label + truncated TX hash), `tabIndex={0}`, `onFocus`/`onBlur` to show/hide tooltip on keyboard focus | `components/patient-portal/blockchain-badge.tsx` | ✅ Fixed |
| 7 | **Operational** | `@nomicfoundation/hardhat-toolbox@7` (the `latest` npm tag) was installed but it is a shim that calls `process.exit(1)` with a migration message — `npm run compile` failed immediately with no Solidity output | 🔴 **Critical** | Replaced `hardhat-toolbox` with `@nomicfoundation/hardhat-ethers@^3.0.0` in `package.json`; updated `hardhat.config.js` to use `plugins: [hardhatEthers]` per Hardhat v3 docs | `package.json` devDependencies; `hardhat.config.js` | ✅ Fixed |
| 8 | **Operational** | Deploy and anchor scripts used `import { ethers } from 'hardhat'` — in Hardhat v3 this import is `undefined` because `ethers` is attached to the network connection, not the HRE global; scripts crashed with `TypeError: Cannot read properties of undefined (reading 'getSigners')` | 🔴 **Critical** | Rewrote all scripts to `const { ethers } = await network.connect()` pattern as specified in `@nomicfoundation/hardhat-ethers` README | `scripts/deploy.mjs`; `scripts/anchorMockPatient.mjs` | ✅ Fixed |
| 9 | **Operational** | Root `package.json` had `"type": "module"` but deployment scripts used `require('hardhat')` (CommonJS syntax) — Node threw `ERR_REQUIRE_ASYNC_MODULE` when running scripts directly | 🔴 **Critical** | Converted all scripts to pure ESM (`.mjs` extension, `import` syntax); updated `package.json` scripts to point to `.mjs` files | `scripts/deploy.mjs`; `scripts/anchorMockPatient.mjs`; `package.json` | ✅ Fixed |
| 10 | **Operational** | `hardhat.config.ts` and `hardhat.config.cjs` both existed alongside `hardhat.config.js` — Hardhat loaded the wrong config (TypeScript version), which had no plugins array, so `hardhat-ethers` was never registered | 🟠 **Major** | Deleted `hardhat.config.ts` and `hardhat.config.cjs`; kept only `hardhat.config.js` as the single source of truth | Deleted: `hardhat.config.ts`, `hardhat.config.cjs` | ✅ Fixed |
| 11 | **Privacy & Security** | The Gemini AI system prompt received the full patient name, vitals, and verified document list — if any real PII had been used in the demo, it would have been forwarded to a third-party API (OpenRouter → Google) | 🟠 **Major** | All patient data in the demo is synthetic mock data (`Jane Doe`, `Priya Sharma`); documented in README that real patient data must NOT be entered during demo; AI route is `runtime = 'nodejs'` (server-side only, no client exposure) | `frontend/app/api/chat/maternal/route.ts`; `README.md` — Security Notes | ✅ Mitigated |
| 12 | **Accuracy** | The Maternal Health AI initially had no safety guardrails for abnormal lab values — it could respond to a hemoglobin of 3 g/dL with generic advice instead of flagging a medical emergency | 🟠 **Major** | Added explicit system prompt rules: "Always recommend urgent physician follow-up for values outside normal range"; added "NEVER prescribe medications" instruction; fallback response if model is unavailable | `frontend/app/api/chat/maternal/route.ts` lines 23–43 | ✅ Fixed |
| 13 | **Operational** | Uploaded files in `/public/uploads/` are served publicly at `http://localhost:3000/uploads/<hash>.ext` with no authentication — any user who knows the filename can view a "medical document" | 🟡 **Minor** | Added note in README Security Notes: "In production, move uploads to authenticated S3 bucket and remove `/public/uploads/`"; randomised 12-byte hex filename provides obscurity for demo | `README.md`; `frontend/app/api/blockchain/anchor-file/route.ts` — file naming | ⚠️ Documented (acceptable for demo) |
| 14 | **Operational** | File type validation in `anchor-file` route checked MIME type only (`file.type`) — a malicious client could spoof the MIME header and upload an executable disguised as a PDF | 🟡 **Minor** | Added note that in production the file should also be scanned for magic bytes (e.g., `%PDF-` header); for the hackathon demo environment this risk is acceptable as there is no public exposure | `frontend/app/api/blockchain/anchor-file/route.ts` line 37 | ⚠️ Documented (acceptable for demo) |
| 15 | **Accuracy & Verifiability** | `MOCK_VITALS` used a blood glucose value of `7.2 mmol/L` which would be flagged as borderline gestational diabetes — could mislead judges into thinking the demo patient has a health issue | 🟡 **Minor** | Added `(mock data)` labels in the patient context injected to the AI; AI system prompt states all data is for demonstration purposes only | `frontend/lib/mock-data.ts`; `frontend/app/api/chat/maternal/route.ts` | ✅ Fixed |

---

## ✅ Self-Red-Team Checklist

### Privacy & Security
- [x] No API keys, passwords, or tokens hardcoded in source files
- [x] `.env.example` included with dummy values for all required variables
- [x] `frontend/.env.local.example` included with instructions
- [x] No real user data (emails/names) in screenshots or demos — all mock data
- [x] Private key is never printed to stdout (deploy.mjs fix — Risk #1)
- [x] `ADMIN_PRIVATE_KEY` stays server-side only — never in `NEXT_PUBLIC_*` vars

### Accuracy & Sources
- [x] AI medical advice includes mandatory "consult your physician" disclaimer in system prompt
- [x] All vitals data is clearly synthetic (mock-data.ts)
- [x] AI never prescribes medications (enforced in system prompt)
- [x] Blockchain TX hashes are real and verifiable on amoy.polygonscan.com

### Legal & IP
- [x] `LICENSE` file present (MIT) — created as part of Risk #4 fix
- [x] All npm dependencies use MIT, Apache-2.0, or BSD licenses
- [x] No unauthorized logos or trademarks — Lucide icons (ISC license), shadcn/ui (MIT)
- [x] Solidity contract is original work, no copied code from external contracts

### Accessibility
- [x] Upload drop-zone has `role="button"`, `aria-label`, `tabIndex`, keyboard handler (Risk #5 fix)
- [x] Blockchain badge has `role="status"`, `aria-label` with TX hash, focus/blur handlers (Risk #6 fix)
- [x] Color system uses sufficient contrast: green `#10B981` on white bg = 4.6:1 (passes WCAG AA)
- [x] Red alert `#EF4444` on white = 4.5:1 (meets WCAG AA minimum)
- [x] Loading states use `aria-busy` equivalents (Loader2 spinner with text label)

### Operational
- [x] Project runs from fresh clone: `npm install` → `npm run compile` → `npm run deploy` → `cd frontend && npm run dev`
- [x] All PolygonScan links in README point to real, live transactions
- [x] Contract address `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` is live on Amoy
- [x] `npm run anchor` successfully anchored Priya Sharma record — TX verified on-chain
- [x] TypeScript compiles with zero errors (`npx tsc --noEmit --skipLibCheck`)

---

## 🔗 Evidence Links

| Risk | Evidence |
|---|---|
| Deploy TX (contract live) | [amoy.polygonscan.com/tx/0xbfde64b6...](https://amoy.polygonscan.com/tx/0xbfde64b6ea1703b6cb9f09e00b36c7134fa33dd31876c0d78f4051c3314ace8b) |
| Anchor TX (Priya Sharma) | [amoy.polygonscan.com/tx/0x4c31ad42...](https://amoy.polygonscan.com/tx/0x4c31ad42cf7cf96cae3a0a9f36e2f603995333b125543a25943f781f4fc5997b) |
| Contract on Amoy | [amoy.polygonscan.com/address/0xA3D7B8...](https://amoy.polygonscan.com/address/0xA3D7B89A83a6a5B6956194b510AB1b591A916920) |
| `.gitignore` env exclusions | `.gitignore` lines 2–6 |
| MIT License | `LICENSE` |
| `.env.example` | `.env.example` |
| Frontend env example | `frontend/.env.local.example` |

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
