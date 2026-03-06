"""
styles.py
─────────
Shared CSS injected on every page.
Color palette mirrors frontend/lib/medical-colors.ts and globals.css exactly:
  Sage  #6B8E6F  │  Teal  #20B2AA  │  Amber  #F59E0B  │  Crimson  #DC2626
"""
import streamlit as st

# ── Brand colours (keep in sync with frontend) ───────────────────────────────
SAGE    = "#6B8E6F"
TEAL    = "#20B2AA"
AMBER   = "#F59E0B"
CRIMSON = "#DC2626"

RISK_COLOR = {"low": TEAL, "medium": AMBER, "high": CRIMSON}
ORDER_COLOR = {"pending": AMBER, "preparing": SAGE, "ready": TEAL, "delivered": TEAL}
ALERT_COLOR = {"critical": CRIMSON, "warning": AMBER, "info": TEAL}

GLOBAL_CSS = f"""
<style>
/* ── Base ─────────────────────────────────────────────────────────────────── */
html, body, [data-testid="stAppViewContainer"] {{
    background: linear-gradient(135deg,#f0fdf4 0%,#f0f9ff 50%,#f5f3ff 100%);
    font-family: 'Inter', 'Segoe UI', sans-serif;
}}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
[data-testid="stSidebar"] {{
    background: linear-gradient(160deg,#0f4c35 0%,#0a3d62 100%) !important;
    border-right: 1px solid rgba(255,255,255,0.08);
}}
[data-testid="stSidebar"] * {{ color:#ffffff !important; }}
[data-testid="stSidebar"] .stRadio label {{
    font-size:1.0rem; font-weight:500; padding:0.4rem 0;
}}

/* ── Cards ───────────────────────────────────────────────────────────────── */
.mn-card {{
    background:rgba(255,255,255,0.72);
    backdrop-filter:blur(14px);
    border:1px solid rgba(255,255,255,0.35);
    border-radius:18px;
    padding:1.4rem 1.6rem;
    margin-bottom:1rem;
    box-shadow:0 6px 24px rgba(0,0,0,0.07);
}}
.mn-card:hover {{
    box-shadow:0 10px 36px rgba(0,0,0,0.12);
    transform:translateY(-2px);
    transition:all .25s ease;
}}

/* ── Gradient headers ────────────────────────────────────────────────────── */
.page-header {{
    background:linear-gradient(135deg,{SAGE} 0%,{TEAL} 100%);
    color:white; border-radius:16px;
    padding:1.4rem 1.8rem; margin-bottom:1.4rem;
}}
.page-header h2 {{ margin:0; font-size:1.7rem; font-weight:800; }}
.page-header p  {{ margin:0.3rem 0 0; opacity:0.88; font-size:0.95rem; }}

.header-amber {{ background:linear-gradient(135deg,{AMBER} 0%,{SAGE} 100%); }}
.header-crimson{{ background:linear-gradient(135deg,{CRIMSON} 0%,{TEAL} 100%); }}

/* ── KPI tiles ───────────────────────────────────────────────────────────── */
.kpi-tile {{
    background:rgba(255,255,255,0.75);
    border-radius:14px; padding:1rem 1.2rem;
    border:1px solid rgba(255,255,255,0.4);
    box-shadow:0 4px 16px rgba(0,0,0,0.06);
    text-align:center;
}}
.kpi-num  {{ font-size:2.2rem; font-weight:800; line-height:1.1; }}
.kpi-label{{ font-size:0.78rem; color:#666; margin-top:0.2rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; }}

/* ── Badges ──────────────────────────────────────────────────────────────── */
.badge {{
    display:inline-block; border-radius:20px;
    padding:3px 12px; font-size:0.75rem; font-weight:700;
}}
.badge-safe     {{ background:{TEAL}1a;    color:{TEAL};    border:1px solid {TEAL}55; }}
.badge-pending  {{ background:{AMBER}1a;   color:{AMBER};   border:1px solid {AMBER}55; }}
.badge-critical {{ background:{CRIMSON}1a; color:{CRIMSON}; border:1px solid {CRIMSON}55; }}
.badge-approved {{ background:{SAGE}22;    color:{SAGE};    border:1px solid {SAGE}55; }}

/* ── Chat bubbles ────────────────────────────────────────────────────────── */
.chat-user {{
    background:{TEAL}18; border-radius:14px 14px 2px 14px;
    padding:0.65rem 1rem; margin:0.35rem 0;
    max-width:76%; margin-left:auto; font-size:0.9rem;
}}
.chat-bot {{
    background:rgba(255,255,255,0.8); border:1px solid rgba(0,0,0,0.06);
    border-radius:14px 14px 14px 2px;
    padding:0.65rem 1rem; margin:0.35rem 0;
    max-width:76%; font-size:0.9rem;
}}
.chat-sys {{
    background:{SAGE}15; border-radius:10px;
    padding:0.5rem 0.9rem; margin:0.3rem auto;
    max-width:90%; font-size:0.82rem; color:#555; text-align:center;
    border:1px solid {SAGE}30;
}}

/* ── Risk colours ────────────────────────────────────────────────────────── */
.risk-low    {{ color:{TEAL};    font-weight:700; }}
.risk-medium {{ color:{AMBER};   font-weight:700; }}
.risk-high   {{ color:{CRIMSON}; font-weight:700; }}

/* ── Status progress bar ─────────────────────────────────────────────────── */
.progress-bar-wrap {{
    height:6px; background:#e5e7eb; border-radius:4px; overflow:hidden;
}}
.progress-bar-fill {{
    height:100%; border-radius:4px;
    transition:width .4s ease;
}}

/* ── Section divider ─────────────────────────────────────────────────────── */
.mn-divider {{
    border:none; border-top:1px solid rgba(0,0,0,0.08); margin:1rem 0;
}}

/* ── Stat row ────────────────────────────────────────────────────────────── */
.stat-row {{
    display:flex; align-items:center; justify-content:space-between;
    padding:0.6rem 0.8rem; border-radius:10px;
    background:rgba(255,255,255,0.55);
    border:1px solid rgba(255,255,255,0.4);
    margin-bottom:0.5rem;
}}
.stat-label {{ font-size:0.83rem; color:#555; }}
.stat-value {{ font-size:1.0rem; font-weight:700; }}

/* ── Approval box ────────────────────────────────────────────────────────── */
.approval-pending {{
    border:2px solid {CRIMSON}; border-radius:12px;
    padding:1rem 1.2rem; background:{CRIMSON}08;
}}
.approval-granted {{
    border:2px solid {SAGE}; border-radius:12px;
    padding:1rem 1.2rem; background:{SAGE}0d;
}}

/* ── Alert row ───────────────────────────────────────────────────────────── */
.alert-critical {{ background:{CRIMSON}0d; border-left:4px solid {CRIMSON}; border-radius:0 10px 10px 0; padding:0.7rem 1rem; margin-bottom:0.5rem; }}
.alert-warning  {{ background:{AMBER}0d;   border-left:4px solid {AMBER};   border-radius:0 10px 10px 0; padding:0.7rem 1rem; margin-bottom:0.5rem; }}
.alert-info     {{ background:{TEAL}0d;    border-left:4px solid {TEAL};    border-radius:0 10px 10px 0; padding:0.7rem 1rem; margin-bottom:0.5rem; }}

/* ── Recipe card ─────────────────────────────────────────────────────────── */
.recipe-ingredient {{
    display:flex; align-items:center; gap:0.5rem;
    padding:0.4rem 0; font-size:0.88rem; border-bottom:1px solid rgba(0,0,0,0.05);
}}
.recipe-dot {{
    width:8px; height:8px; border-radius:50%;
    background:linear-gradient(135deg,{SAGE},{TEAL}); flex-shrink:0;
}}

/* ── Order card ──────────────────────────────────────────────────────────── */
.order-card {{
    background:rgba(255,255,255,0.7); border-radius:12px;
    padding:0.8rem 1rem; margin-bottom:0.5rem;
    border:2px solid transparent; cursor:pointer;
    transition:border-color .2s;
}}
.order-card.selected {{ border-color:{SAGE}; background:{SAGE}08; }}
.order-card:hover    {{ border-color:{TEAL}77; }}
</style>
"""


def inject_css():
    st.markdown(GLOBAL_CSS, unsafe_allow_html=True)
