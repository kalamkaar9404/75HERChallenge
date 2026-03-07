# #75HER Challenge: Decision Log

**Project Name:** Dr. NutriCare — Immutable Health Integrity  
**Team Name:** 75HER  
**Challenge:** CreateHER Fest 2026  
**Contract Deployed:** `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` · Polygon Amoy  
**Anchor TX:** `0x4c31ad42cf7cf96cae3a0a9f36e2f603995333b125543a25943f781f4fc5997b`

---

## 🛠 Decision Log

| # | Category | Decision → Why | Tradeoff |
|---|---|---|---|
| 1 | **Tech Stack** | **Next.js 15 App Router** over plain React → unified SSR + API routes in one repo; no separate Express backend needed for blockchain signing | App Router has a steeper learning curve; some Radix UI components required `'use client'` wrappers, adding ~20 lines of boilerplate per component |
| 2 | **Tech Stack** | **Ethers.js v6** (not v5 or viem) → v6 ships native `bigint` support and tree-shakes to ~180 KB; matches Hardhat v3's peer dependency | v6 broke several v5 APIs (`contract.deployed()` → `waitForDeployment()`); required rewriting every deploy script and ABI call |
| 3 | **Tech Stack** | **Tailwind CSS v4 + shadcn/ui** over Material UI or Chakra → zero-runtime CSS, composable primitives, 0 KB JS overhead for styling | Tailwind v4 dropped `tailwind.config.js`; required migrating to CSS `@theme` variables and updating all PostCSS config — ~2 hours of migration cost |
| 4 | **Tech Stack** | **Hardhat v3** (not Foundry or Truffle) → Node.js-native, same runtime as the frontend; single toolchain for compile + deploy + scripting | Hardhat v3 is ESM-only; `require('hardhat')` fails — forced rewrite of all scripts to `.mjs` ESM format and removal of `"type":"module"` conflicts |
| 5 | **Tech Stack** | **`google/gemini-2.0-flash-exp:free`** via OpenRouter for the Maternal Health AI → zero cost on free tier, fast response (~800ms), strong medical reasoning | Free tier has rate limits (20 req/min); no SLA guarantee; added a `OPENROUTER_MODEL` env var for easy swap to a paid model in production |
| 6 | **Architecture** | **SHA-256 via Web Crypto API** (browser-native) instead of `crypto-js` for file hashing → no extra library, runs in browser sandbox, ~0 KB added to bundle | `crypto.subtle.digest()` is async and returns an `ArrayBuffer` (not a hex string); required a manual `Uint8Array → hex` conversion function in every component |
| 7 | **Architecture** | **String-keyed mapping** `mapping(string => Record)` in `MedicalIntegrity.sol` instead of `bytes32` keys → human-readable patient IDs (`"p1-lab_report-1234"`) are stored directly; no off-chain ID registry needed | Solidity string storage costs ~2× more gas than `bytes32`; deploy cost was ~0.023 POL vs ~0.012 POL for a bytes32 version |
| 8 | **Architecture** | **Server-side blockchain signing** (Next.js API routes) instead of MetaMask in the browser → silent anchoring; no wallet popup interrupts the patient UX; private key stays on the server | Introduces a single point of failure: if `ADMIN_PRIVATE_KEY` leaks, all records can be forged. Mitigated by keeping the key in `.env.local` (never committed) and using `onlyOwner` in the contract |
| 9 | **Architecture** | **Local file storage** (`/public/uploads/`) instead of S3/IPFS for uploaded documents → zero cloud cost during hackathon; no AWS credentials required in demo environment | Files are not persisted across server restarts; not suitable for production. In production, swap `writeFile` in `anchor-file/route.ts` for an S3 `PutObject` call |
| 10 | **AI Integration** | **Injected patient context** (vitals + verified doc list) in every Gemini prompt instead of RAG/vector search → deterministic, fast, no embedding infrastructure needed during hackathon | Context window limited to ~8 documents before hitting token limits; a real deployment would need a vector DB (Pinecone/Weaviate) for full record retrieval |
| 11 | **AI Integration** | **OpenRouter as AI gateway** instead of calling Gemini API directly → single API key rotates across 100+ models; free-tier fallback (`meta-llama/llama-3.1-8b-instruct:free`) auto-activates when credits hit zero | One extra network hop adds ~50–100ms latency; OpenRouter is a third-party dependency that could have outages |
| 12 | **Feature Scope** | **Cut real-time WebSocket notifications** → focused on blockchain integrity as the core demo-able feature; WebSockets would have required a separate WS server | Live vitals alerts are simulated with mock data; not truly real-time in the demo build |
| 13 | **Feature Scope** | **Cut IPFS document storage** in favour of local disk → IPFS pinning (via Pinata) would have added 30+ min of setup and a paid API key; local storage is sufficient to prove the SHA-256 + anchor flow | Documents uploaded during the demo are lost on server restart; judges must upload fresh files each demo session |
| 14 | **Third-Party** | **Polygon Amoy Testnet** (Chain ID 80002) over Ethereum Sepolia or Mumbai → Polygon has sub-cent gas fees (~0.023 POL per deploy vs ~0.15 ETH on Sepolia); faucet gives 0.5 POL per request | Amoy is a testnet; block explorer (amoy.polygonscan.com) occasionally has indexing delays of 30–60s before transactions appear |
| 15 | **Third-Party** | **`@nomicfoundation/hardhat-ethers` plugin** (not `hardhat-toolbox`) → Hardhat v3 deprecated the `toolbox` meta-package; the toolbox `npm latest` tag installs a shim that calls `process.exit(1)` | Plugin attaches `ethers` to `network.connect()` not to `hre` directly; required rewriting all scripts to use `const { ethers } = await network.connect()` pattern |
| 16 | **Process** | **Deterministic key-sorting before SHA-256** (`deepSortKeys` in `hash-engine.ts`) → `{ b:2, a:1 }` and `{ a:1, b:2 }` must produce identical hashes or verification fails on any object re-serialisation | Adds a recursive sort on every hash call; negligible cost (<1ms) for record-sized payloads but would need benchmarking for files >10 MB |

---

## ✅ Submission Checklist

- [x] At least 5 decisions documented — **16 decisions logged**
- [x] Every decision has a clear, specific tradeoff
- [x] Decisions reflect choices made **during the hackathon**
- [x] Organised by category (Tech Stack, Architecture, AI Integration, Feature Scope, Third-Party, Process)
- [x] File saved as `DECISION_LOG.md` in the `/docs/` folder

---

## 🔗 Key Artefacts

| Artefact | Value |
|---|---|
| Deployed Contract | `0xA3D7B89A83a6a5B6956194b510AB1b591A916920` |
| Deploy TX | `0xbfde64b6ea1703b6cb9f09e00b36c7134fa33dd31876c0d78f4051c3314ace8b` |
| First Anchor TX | `0x4c31ad42cf7cf96cae3a0a9f36e2f603995333b125543a25943f781f4fc5997b` |
| Network | Polygon Amoy Testnet · Chain ID 80002 |
| Frontend Stack | Next.js 16 · React 19 · Tailwind CSS v4 · Ethers.js v6 |
| AI Model | `google/gemini-2.0-flash-exp:free` via OpenRouter |
| Hash Algorithm | SHA-256 (Web Crypto API, browser-native) |
| Solidity Version | 0.8.20 · Optimizer 200 runs |

---

*Part of the #75HER Challenge | CreateHER Fest 2026*
