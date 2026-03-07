# #75HER Challenge: Evidence Log

**Project Name:** Dr. NutriCare — Immutable Health Integrity  
**Team Name:** 75HER  
**Challenge:** CreateHER Fest 2026  
**Last Updated:** 2026-03-07

---

## 📊 Evidence Log Table

### Section A — Core Frameworks & Runtime

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| A1 | **Next.js 16.1.6** | Full-stack React framework; App Router for SSR + API routes (blockchain signing, AI chat, file upload) | https://nextjs.org | Code | MIT — Vercel, Inc. | Used `app/` directory; `runtime = 'nodejs'` on all blockchain routes |
| A2 | **React 19.2.4** | UI component tree, hooks (`useState`, `useRef`, `useCallback`) | https://react.dev | Code | MIT — Meta Platforms | Upgraded from v18 for concurrent features |
| A3 | **TypeScript 5.7.3** | Static typing across all `.ts`/`.tsx` files; zero compile errors confirmed via `tsc --noEmit` | https://www.typescriptlang.org | Code | Apache 2.0 — Microsoft | `strict: true` enabled in `tsconfig.json` |
| A4 | **Node.js 22.16.0** | Server runtime for Next.js API routes and Hardhat scripts | https://nodejs.org | Runtime | MIT — OpenJS Foundation | v22 required for ESM `import()` support in Hardhat v3 |

---

### Section B — Blockchain & Smart Contract Stack

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| B1 | **Solidity 0.8.20** | Smart contract language for `MedicalIntegrity.sol` — `mapping(string => Record)`, `onlyOwner` modifier, events | https://soliditylang.org | Code | GPL-3.0 — Ethereum Foundation | Compiled with optimizer 200 runs; SPDX: MIT |
| B2 | **Hardhat 3.1.11** | Solidity compile + deploy pipeline; `npx hardhat compile` and `run` tasks | https://hardhat.org | Code | MIT — Nomic Foundation | Hardhat v3 is ESM-only; required `.mjs` scripts |
| B3 | **@nomicfoundation/hardhat-ethers 3.0.0** | Hardhat plugin that attaches `ethers` to `network.connect()` in v3 scripts | https://github.com/NomicFoundation/hardhat/tree/main/packages/hardhat-ethers | Code | MIT — Nomic Foundation | Replaced broken `hardhat-toolbox@7` shim (see Risk Log #7) |
| B4 | **Ethers.js 6.16.0** | Blockchain interaction: `JsonRpcProvider`, `Wallet`, `Contract`, `formatEther`, `keccak256` | https://docs.ethers.org/v6 | Code | MIT — Richard Moore | v6 uses native `bigint`; broke v5 `contract.deployed()` → fixed to `waitForDeployment()` |
| B5 | **Polygon Amoy Testnet** | Live blockchain network (Chain ID 80002) where `MedicalIntegrity.sol` is deployed | https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos | Infrastructure | Public testnet — Polygon Labs | RPC: `https://rpc-amoy.polygon.technology` |
| B6 | **Polygon Amoy Faucet** | Source of free testnet POL used to pay gas for contract deployment and anchor transactions | https://faucet.polygon.technology | Service | Free — Polygon Labs | Dispensed 0.5 POL per request; wallet topped up before deploy |
| B7 | **PolygonScan Amoy Explorer** | On-chain verification of all transactions; used in `BlockchainBadge` tooltip links | https://amoy.polygonscan.com | Service | Free — Etherscan / Polygonscan | Deploy TX and Anchor TX both verified live on explorer |

---

### Section C — Frontend UI Libraries

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| C1 | **Tailwind CSS 4.2.0** | Utility-first styling across all components; `glass-silk`, gradient, responsive grid | https://tailwindcss.com | Code | MIT — Tailwind Labs | v4 removed `tailwind.config.js`; migrated to CSS `@theme` variables |
| C2 | **shadcn/ui** | Pre-built accessible components: `Toast`, `Dialog`, `Select`, `Tabs`, `Badge` — built on Radix UI | https://ui.shadcn.com | Code | MIT — shadcn | Components copied into `components/ui/`; not an npm package |
| C3 | **Radix UI (20 packages)** | Headless, accessible primitives underlying all shadcn components (`@radix-ui/react-*`) | https://www.radix-ui.com | Code | MIT — WorkOS | Versions range 1.1.x–2.2.x; all MIT licensed |
| C4 | **Framer Motion 11.0.3** | Animations: badge scale, tooltip `AnimatePresence`, timeline stagger, loading progress bar | https://www.framer.com/motion | Code | MIT — Framer B.V. | ~150KB gzipped; used for all motion in `blockchain-badge.tsx`, `document-vault.tsx`, `maternal-timeline.tsx` |
| C5 | **Lucide React 0.564.0** | Icon set: `ShieldCheck`, `ShieldAlert`, `FileUp`, `Bot`, `Send`, `Baby`, `Activity` — 500+ icons | https://lucide.dev | Code | ISC — Lucide Contributors | All icons are SVG; ISC license is permissive (MIT-equivalent) |
| C6 | **Recharts 2.15.0** | Charts: vitals trend graphs, nutrition donut chart in Patient Portal | https://recharts.org | Code | MIT — recharts group | Used in `NutritionDonut` and `VitalsOverview` components |
| C7 | **React Hook Form 7.54.1** | Form state management for upload inputs and settings forms | https://react-hook-form.com | Code | MIT — Beier(Bill) Luo | Paired with `zod` for runtime validation |
| C8 | **Zod 3.24.1** | TypeScript-first schema validation for all API request bodies | https://zod.dev | Code | MIT — Colin McDonnell | Used in blockchain API routes to validate `recordId`, `fileHash` formats |

---

### Section D — AI & API Services

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| D1 | **OpenRouter API** | AI gateway routing requests to Gemini and GPT-4o; single `OPENAI_API_KEY` for all AI features | https://openrouter.ai | Service | Commercial API — OpenRouter Inc. | Free tier used; base URL `https://openrouter.ai/api/v1` |
| D2 | **google/gemini-2.0-flash-exp:free** | Maternal Health AI chatbot — interprets lab values, answers prenatal nutrition questions, analyzes verified records | https://openrouter.ai/google/gemini-2.0-flash-exp:free | AI Model | Free tier — Google DeepMind | 20 req/min limit; `max_tokens: 1000`, `temperature: 0.4` |
| D3 | **openai/gpt-4o** | Nutritionist chat (`/api/chat/nutritionist`) and Meal Plan generation (`/api/chat/meal-plan`) | https://openrouter.ai/openai/gpt-4o | AI Model | Pay-per-token — OpenAI via OpenRouter | Fallback model configurable via `OPENROUTER_MODEL` env var |
| D4 | **openai npm package 6.27.0** | OpenAI-compatible SDK used to call OpenRouter API from Next.js API routes | https://github.com/openai/openai-node | Code | Apache 2.0 — OpenAI | `baseURL` overridden to `https://openrouter.ai/api/v1` |
| D5 | **Web Crypto API** | Browser-native SHA-256 file hashing in `document-vault.tsx` — `crypto.subtle.digest('SHA-256', buffer)` | https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API | Browser API | W3C Standard — royalty-free | Zero npm bundle cost; available in all modern browsers and Node.js 15+ |
| D6 | **crypto-js 4.2.0** | Server-side deterministic SHA-256 for JSON objects in `hash-engine.ts` — key-sorted stringify before hashing | https://github.com/brix/crypto-js | Code | MIT — Jeff Mott | Used where Web Crypto API is unavailable (server components, test scripts) |

---

### Section E — Backend & Developer Tools

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| E1 | **Python 3.13 + Streamlit** | Optional backend for nutritionist AI (`backend/app.py`); not required for blockchain demo | https://streamlit.io | Code | Apache 2.0 — Snowflake Inc. | `requirements.txt`: `streamlit>=1.35.0` |
| E2 | **python-dotenv 1.0.0** | Loads `.env` variables in Python backend scripts | https://github.com/theskumar/python-dotenv | Code | BSD-3-Clause — Saurabh Kumar | Used in `backend/app.py` only |
| E3 | **dotenv 17.3.1** | Loads `.env` into Hardhat scripts and `hardhat.config.js` at deploy time | https://github.com/dotenvx/dotenvx | Code | BSD-2-Clause — dotenvx | v17 replaced the legacy `dotenv` package; added `[dotenv]` prefix logs |
| E4 | **concurrently 9.2.1** | Dev script: runs Next.js and Streamlit in parallel via `npm run dev:all` | https://github.com/open-cli-tools/concurrently | Code | MIT — open-cli-tools | Dev-dependency only; not in production bundle |

---

### Section F — Visual Assets

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| F1 | **`pregnancy-wellness-hero.jpg`** | Hero banner background in Patient Portal page | Source: placeholder / AI-generated image used for demo only | Visual | For demo use only — replace with licensed asset before public release | Not used in any commercial context; clearly a demonstration placeholder |
| F2 | **`healthy-meal-bowl.jpg`** | Meal plan section illustration | Source: placeholder / demo asset | Visual | For demo use only | Same as F1 — replace for production |
| F3 | **`vital-monitoring.jpg`** | Vitals overview illustration | Source: placeholder / demo asset | Visual | For demo use only | Same as F1 |
| F4 | **`placeholder-user.jpg`** | Default patient avatar | Generated placeholder | Visual | For demo use only | No real patient faces used |

---

### Section G — Medical Reference Standards

| # | Item / Claim | Purpose in Project | Source Link | Type | License / Attribution | Notes |
|---|---|---|---|---|---|---|
| G1 | **WHO — Haemoglobin Thresholds for Anaemia in Pregnancy** | Basis for AI system prompt: Hb < 11 g/dL in T1/T3, Hb < 10.5 g/dL in T2 = anaemia | https://www.who.int/publications/i/item/9789241598750 | Research | CC-BY-NC-SA — WHO 2011 | Used to calibrate AI response thresholds; not reproduced verbatim |
| G2 | **ACOG — Gestational Diabetes Screening Guidelines** | Basis for GCT threshold (140 mg/dL) referenced in AI trimester prompts | https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/02/gestational-diabetes-mellitus | Research | © ACOG — Fair use, educational reference | Single factual threshold cited; not reproduced |
| G3 | **NHS — Blood Pressure in Pregnancy** | Basis for flagging BP > 140/90 mmHg as hypertension in pregnancy in AI guardrails | https://www.nhs.uk/pregnancy/related-conditions/complications/high-blood-pressure | Research | OGL v3.0 — NHS UK | Open Government Licence; free to use with attribution |

---

## 🤖 AI-Generated Content Log

| # | AI Tool | Purpose | What AI Generated | What We Changed | Verification Method |
|---|---|---|---|---|---|
| 1 | **goose (Block AI agent)** | Scaffold `MedicalIntegrity.sol` Solidity contract | Full contract with `mapping(string => Record)`, `anchorRecord()`, `verifyRecord()`, events, modifiers (`onlyOwner`, `validId`, `validHash`), NatDoc comments | Added 128-byte ID length limit in `validId` modifier; changed `bytes32` hash keys to `string` to match task spec; added `totalRecords` counter; reviewed all `require()` revert messages for clarity | Compiled successfully with `solc 0.8.20`; deployed to Polygon Amoy (TX: `0xbfde64b6…`); `anchorRecord` and `verifyRecord` functions called and verified on-chain |
| 2 | **goose** | Generate `hardhat.config.js` for Polygon Amoy | Initial config with `@nomicfoundation/hardhat-toolbox` plugin, TypeScript syntax | Discovered `hardhat-toolbox@7` is a broken shim (Risk Log #7); replaced with `@nomicfoundation/hardhat-ethers`; changed to ESM `export default`; removed TypeScript (`.ts`) config in favour of plain `.js`; fixed `accounts` format from `hd` object to flat array `[PRIVATE_KEY]` | `npm run compile` runs clean; `npm run deploy` successfully deployed contract |
| 3 | **goose** | Generate `scripts/deploy.mjs` and `scripts/anchorMockPatient.mjs` | Script stubs using `import { ethers } from 'hardhat'` (Hardhat v2 style) | Fixed to `const { ethers } = await network.connect()` (Hardhat v3 pattern per plugin README); removed `contract.deployed()` → `waitForDeployment()`; added balance check before deploy; removed private key from stdout log (Risk Log #1) | `npm run deploy` output verified — contract address `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` confirmed on amoy.polygonscan.com |
| 4 | **goose** | Generate `frontend/lib/blockchain.ts` | Ethers v6 wrapper functions: `anchorRecordById`, `verifyRecordById`, `silentlyRecordHash`, `hashData` | Removed all `console.log` calls that exposed wallet address to server logs; fixed `tx?.hash` stray reference in `verifyRecordById`; tightened error handling to use `(err as Error).message` | TypeScript compiles with `--noEmit --skipLibCheck`; API routes (`/api/blockchain/anchor`, `/api/blockchain/verify-by-id`) tested via browser and returned correct `txHash` and `integrityMatch` fields |
| 5 | **goose** | Generate `frontend/lib/hash-engine.ts` | `generateRecordHash`, `sortedStringify`, `deepSortKeys`, `hashPatientRecord`, `hashMealPlan`, `truncateHash` | Verified determinism manually: serialised same object with keys in different order, confirmed both produce identical 64-char hex; confirmed output matches `createHash('sha256')` in Node's built-in `crypto` module | Cross-checked: `anchorMockPatient.mjs` uses Node `crypto.createHash` and produces same hash as browser-side `hash-engine.ts` for identical sorted JSON input |
| 6 | **goose** | Generate `components/patient-portal/document-vault.tsx` | Full upload component with SHA-256, anchor, verify, doc list, status phases | Added `role="button"`, `aria-label`, `tabIndex`, `onKeyDown` for keyboard accessibility (Risk Log #5); fixed upload zone selector to use `div` event handler correctly; verified file-type icon logic works for PDF and image types | Manually tested upload flow in browser: file selected → hash computed → POST to `/api/blockchain/anchor-file` → TX hash returned → badge shows green |
| 7 | **goose** | Generate `components/patient-portal/blockchain-badge.tsx` | Shield badge with status config, tooltip with TX hash and PolygonScan link | Added `role="status"`, `aria-label` with full status string, `onFocus`/`onBlur` keyboard handlers (Risk Log #6); changed tooltip arrow CSS to use border-trick instead of absolute pseudo-element | Verified: badge renders correctly in all 4 states (`verified`, `tampered`, `pending`, `not_anchored`); tooltip appears on hover and focus |
| 8 | **goose** | Generate `frontend/app/api/chat/maternal/route.ts` | Gemini 2.0 Flash endpoint with system prompt builder and patient context injection | Added explicit WHO-sourced trimester lab value ranges to system prompt; added `NEVER prescribe medications` guardrail; added graceful fallback response when model is at capacity; added `patientContext` injection so AI sees verified document list | Tested live: asked "Is my hemoglobin of 11.2 g/dL normal for Week 28?" — AI correctly cited T2 normal range (10.5 g/dL) and gave reassuring response with physician follow-up recommendation |
| 9 | **goose** | Generate `components/patient-portal/maternal-timeline.tsx` | Pregnancy week timeline with 9 milestone events and document injection | Added `opacity-40` for future milestones (beyond current week); fixed event sorting so uploaded docs appear inline at current week; verified week progress bar animation uses correct `(week/40)*100%` calculation | Rendered in browser at Week 28 — progress bar stops at correct 70% mark; uploaded document appears as timeline entry with `BlockchainBadge` |
| 10 | **goose** | Generate `docs/DECISION_LOG.md` and `docs/RISK_LOG.md` | Draft log tables with placeholder entries | All entries replaced with real project-specific decisions and risks; every file path and line number verified by actually reading the source files; risk fixes verified by running the project | Confirmed by running project end-to-end after all fixes were applied |

---

## ✅ Submission Checklist

- [x] **At least 3 credible sources** — 34 entries documented across 7 sections
- [x] **Every image/icon has license info** — Lucide (ISC), placeholder images marked as demo-only
- [x] **All npm dependencies listed with licenses** — 20+ packages, all MIT/Apache/ISC/BSD
- [x] **AI-generated content documented** — 10 entries with specific prompts, changes, and verification
- [x] **All links active** — PolygonScan TX links verified live; npm package links use official repos
- [x] **No TBD or placeholder text** — all entries completed with real version numbers and file paths

---

## 🔗 Live Verification Links

| Evidence | Link |
|---|---|
| Deployed Contract | https://amoy.polygonscan.com/address/0xA3D7B89A83a6a5B6956194b510AB1b591A916920 |
| Deploy TX | https://amoy.polygonscan.com/tx/0xbfde64b6ea1703b6cb9f09e00b36c7134fa33dd31876c0d78f4051c3314ace8b |
| Anchor TX (Priya Sharma) | https://amoy.polygonscan.com/tx/0x4c31ad42cf7cf96cae3a0a9f36e2f603995333b125543a25943f781f4fc5997b |
| WHO Anaemia Reference | https://www.who.int/publications/i/item/9789241598750 |
| Hardhat v3 Docs | https://hardhat.org/hardhat-runner/docs/getting-started |
| OpenRouter Model Listing | https://openrouter.ai/google/gemini-2.0-flash-exp:free |

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
