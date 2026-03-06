# 🥗 MedNutri — Full-Stack Healthcare Dashboard

> AI-powered clinical nutrition platform bridging patients, doctors & community kitchens.

---

## ⚡ Quick Start — Run Everything With ONE Command

> Prerequisite: add your `OPENAI_API_KEY` to both env files first (see step 1 below).

### Option A — Double-click (Windows, simplest)
```
start.bat
```
Opens two colour-coded terminal windows (frontend + backend) and auto-launches both browser tabs.

### Option B — Root `npm run dev` (any OS)
```bash
# from the project root  (75her/)
npm run dev
```
Runs Next.js on **:3000** and Streamlit on **:8501** side-by-side in one terminal via `concurrently`.

### Option C — Shell script (macOS / Linux)
```bash
chmod +x start.sh
./start.sh
```

### What opens
| App | URL |
|---|---|
| **Frontend** (Next.js) | http://localhost:3000 |
| **Backend** (Streamlit) | http://localhost:8501 |
| Backend via frontend proxy | http://localhost:3000/backend |

---

## 📁 Project Structure

```
75her/
├── frontend/          ← Next.js 16 · React 19 · Tailwind v4 · shadcn/ui
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── overview/         → Dashboard home (KPIs, patient, kitchen, alerts)
│   │   │   ├── patient-portal/   → Vitals, AI meal plan, Dr. NutriCare chat
│   │   │   ├── kitchen-command/  → Active orders, recipe guide, ChefAid chat
│   │   │   └── doc-monitor/      → Patient list, vitals graphs, approval queue
│   │   └── api/
│   │       └── chat/
│   │           ├── nutritionist/ → POST /api/chat/nutritionist  (OpenAI proxy)
│   │           └── chef/         → POST /api/chat/chef          (OpenAI proxy)
│   ├── components/
│   │   ├── patient-portal/       → VitalsOverview, AIMealPlan, NutritionistChat ✦ LIVE AI
│   │   ├── kitchen-command/      → ActiveOrdersList, RecipeGuide, ChefChatbot   ✦ LIVE AI
│   │   ├── doc-monitor/          → PatientList, MedicalGraphs, AlertPanel, ApprovalQueue
│   │   ├── layout/               → Sidebar, Topbar
│   │   └── common/               → StatCard, MedicalBadge, NutricareCard
│   └── lib/
│       └── mock-data.ts          → Shared data + API_ENDPOINTS + BRAND_COLORS
│
└── backend/           ← Python 3.10+ · Streamlit · OpenAI · Plotly
    ├── app.py                    → Entry point (4-page sidebar navigation)
    ├── pages/
    │   ├── overview.py           → KPI tiles, patient/kitchen/guardian columns
    │   ├── patient_portal.py     → Vitals, meal plan, Dr. NutriCare live chat
    │   ├── kitchen_command.py    → Orders, recipe guide, ChefAid live chat
    │   └── doc_monitor.py        → Patient list, Plotly charts, approval queue
    ├── data/
    │   └── mock_data.py          → Single source of truth (mirrors mock-data.ts)
    └── utils/
        ├── openai_client.py      → Shared OpenAI helper (cached client)
        └── styles.py             → Shared CSS + brand colour constants
```

---

## ✦ Sync Contract

Both stacks **share the same data model and colour palette**. When you change one, change the other:

| Concern | Frontend file | Backend file |
|---|---|---|
| Mock data | `frontend/lib/mock-data.ts` | `backend/data/mock_data.py` |
| Brand colours | `BRAND_COLORS` in `mock-data.ts` | `backend/utils/styles.py` |
| Dr. NutriCare prompt | `app/api/chat/nutritionist/route.ts` | `pages/patient_portal.py` |
| ChefAid prompt | `app/api/chat/chef/route.ts` | `pages/kitchen_command.py` |

Colours (verified identical):

| Token | Hex | Meaning |
|---|---|---|
| `sage` | `#6B8E6F` | Primary brand green |
| `teal` | `#20B2AA` | Safe / approved |
| `amber` | `#F59E0B` | Warning / pending |
| `crimson` | `#DC2626` | Critical / urgent |

---

## 🚀 Running the App

### Prerequisites

- **Node.js** ≥ 18 + **pnpm** (or npm/yarn)
- **Python** ≥ 3.10
- An **OpenAI API key** — get one at [platform.openai.com](https://platform.openai.com/api-keys)

---

### 1 · Set up environment variables

**Frontend** — create `frontend/.env.local`:
```bash
cd frontend
copy .env.local.example .env.local
# then edit .env.local and paste your real key
```

```env
OPENAI_API_KEY=sk-your-real-key-here
```

**Backend** — create `backend/.env`:
```bash
cd backend
copy .env.example .env
# then edit .env and paste your real key
```

```env
OPENAI_API_KEY=sk-your-real-key-here
```

> ⚠️ Both files are in `.gitignore`. **Never commit your real API key.**

---

### 2 · Run the Frontend (Next.js)

```bash
cd frontend
pnpm install          # or: npm install
pnpm dev              # or: npm run dev
```

Open → **http://localhost:3000**

| Page | Route |
|---|---|
| Overview | `/overview` |
| Patient Portal | `/patient-portal` |
| Kitchen Command | `/kitchen-command` |
| Doc Monitor | `/doc-monitor` |

---

### 3 · Run the Backend (Streamlit)

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
streamlit run app.py
```

Open → **http://localhost:8501**

| Page | Sidebar option |
|---|---|
| Overview | 🏠 Overview |
| Patient Portal | 🤰 Patient Portal |
| Kitchen Command | 🍲 Kitchen Command |
| Doc Monitor | 🩺 Doc Monitor |

---

### 4 · Running Both Simultaneously

Open **two terminals** side-by-side:

```
Terminal 1 (frontend)          Terminal 2 (backend)
──────────────────────         ─────────────────────
cd frontend                    cd backend
pnpm dev                       streamlit run app.py
→ localhost:3000                → localhost:8501
```

Both portals are **fully independent** — the frontend uses its own Next.js API routes (`/api/chat/*`) to call OpenAI; the backend talks to OpenAI directly. There is no cross-talk required between ports.

---

## 🔑 Features by Page

### 🏠 Overview
- Live KPI tiles: patients, active orders, pending approvals, critical alerts
- Three-column snapshot: Active Patient → Kitchen Orders → Doctor Alerts
- 7-day blood glucose & SpO₂ sparkbars (backend) / hero card (frontend)

### 🤰 Patient Portal
- **Real-time AI chat** with *Dr. NutriCare* (GPT-4o, clinical nutritionist persona)
- Today's AI-generated meal plan with calorie breakdown
- **Doctor Approval toggle** — the "Send Final Meal Plan" button is **hard-disabled** until a doctor flips the toggle
- Vitals overview: blood glucose, blood pressure, weight, pregnancy progress bar
- Nutrition donut chart (Carbs / Protein / Fats / Fiber)

### 🍲 Kitchen Command
- Active meal orders with live status badges & progress bars
- Recipe guide: ingredients, batch scaling table (1× / 5× / 10×), hygiene quick-ref
- **Real-time AI chat** with *ChefAid* (GPT-4o, NGO culinary guide persona)
- One-click quick prompts: Scale Recipe · Substitute · Hygiene Check · Safe Temps

### 🩺 Doc Monitor
- Patient list with risk-level colour coding (🔴 High / 🟡 Medium / 🟢 Low)
- 30-day vitals charts: Blood Glucose (area) + Blood Pressure (dual line) — Plotly / Recharts
- Alert panel filtered per selected patient (critical / warning / info)
- Approval queue with **Approve / Modify** per-plan buttons; balloons on full approval

---

## 🛠 Development Tips

### Adding a new page
1. **Frontend**: create `frontend/app/(dashboard)/my-page/page.tsx` + add link in `components/layout/sidebar.tsx`
2. **Backend**: create `backend/pages/my_page.py` with a `render()` function + add route in `backend/app.py`

### Changing an AI persona
Edit **both** files together:
- `frontend/app/api/chat/<route>/route.ts` — `SYSTEM_PROMPT` constant
- `backend/pages/<page>.py` — `SYSTEM_PROMPT` constant

### Changing mock data
Edit **both** files together:
- `frontend/lib/mock-data.ts`
- `backend/data/mock_data.py`

### Changing brand colours
Edit **both** files together:
- `frontend/lib/mock-data.ts` → `BRAND_COLORS`
- `backend/utils/styles.py` → `SAGE / TEAL / AMBER / CRIMSON`

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 16 (App Router) |
| UI components | shadcn/ui + Radix UI primitives |
| Styling | Tailwind CSS v4 |
| Charts (frontend) | Recharts |
| Charts (backend) | Plotly |
| Backend framework | Streamlit 1.35+ |
| AI | OpenAI `gpt-4o` |
| HTTP client | openai-python + openai-node |
| Env management | python-dotenv + Next.js `.env.local` |

---

## 🔒 Security Notes

- `OPENAI_API_KEY` is **server-side only** in the frontend (no `NEXT_PUBLIC_` prefix) — it is never exposed to the browser
- The Next.js API routes (`/api/chat/*`) act as a secure proxy
- Both `.env` and `.env.local` are gitignored — see `.gitignore` in each folder

---

*© 2026 MedNutri · Demo Build · v2.0.0*
