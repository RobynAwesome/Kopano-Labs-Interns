# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-26T01:34:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

S1.PB is merged and reconciled. Recover the exact S1.PC hardening contract, PRE-SEED it, and only then begin **Sprint 1 / Run C (S1.PC) — Adaptive 3D hardening**.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **DONE / MERGED / POC_VALIDATED** | PR #8 merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`; shared static/WebGL topology proven. |
| **S1.PB — Camera + world-state navigation** | **DONE / MERGED / POC_VALIDATED** | PR #9 exact head `0afbb093...`; merge `ac6848b240f26c6aeb47abfe5afcafaa00f528f9`; browser history + camera binding proven. |
| **S1.PC — Adaptive 3D hardening** | **NEXT / NOT YET PRE-SEEDED** | Full/balanced/lite budgets, mobile/reduced-motion guarantees, WebGL failure fallback and measurable performance receipts. |

```text
S1.PA ✅
-> S1.PB ✅
-> S1.PC PRE-SEED
```

---

# PREDECESSOR RECEIPT — S1.PA

- PRE-SEED `b5c47f7dfcf6555e1df8806ee6e791864ee76de0`.
- PR #8 exact head `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- CI `32756479868`; job `97525090898`.
- Spatial tests 7/7, visual tests 10/10, governance tests 6/6 PASS.
- Artifact `9531042977`; digest `sha256:120f12f1d1c693b381a31ef111413e54891144e734f20ce74568bb015f059a4d`.
- Manual desktop/mobile/lite screenshots PASS.
- Merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`.
- S1.PA verdict `POC_VALIDATED`.
- S1.PA reconciliation commit before S1.PB seed: `e3ff0ec841b39ebeef38f16aa0f47b85f360a64f`.

---

# S1.PB — CAMERA + WORLD-STATE NAVIGATION

## PRE-SEED — 2026-08-24T19:33:00+02:00

- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Exact base before PRE-SEED:** `e3ff0ec841b39ebeef38f16aa0f47b85f360a64f`.
- **PRE-SEED commit:** `df222abe4346272c9cefd11c4dba158ed3a3784a`.
- **Branch:** `sprint-01/run-b-camera-world-state-navigation`.
- **Objective:** bind canonical district state to URL/history and route-aware camera targets while preserving native Back/Forward and document anchors.
- **Scope boundary:** no learner completion, final tier budgets, WebGL-failure policy, content models, external assets or provider deployment.

## Exact implementation

- **PR #9:** `S1.PB — Bind camera to browser world state`.
- **Exact reviewed head:** `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`.
- **Merge-test SHA:** `403bee835b7d8ba8e286045266babf48975cf466`.
- **Bounded delta:** 8 files, 575 additions, 19 deletions.
- Added `src/spatial/navigation.js` for canonical URL/history/control/camera state.
- Added `src/lib/useWorldNavigation.js` for browser-state binding.
- Updated `src/App.jsx` so lane controls use canonical browser navigation state.
- Updated `src/components/HeavyWorld.jsx` so camera state derives from the active canonical district and pointer is parallax-only.
- Added `tests/world-navigation.test.mjs` with 10 deterministic navigation/camera tests.
- Added `scripts/prove-world-navigation.mjs` for real Chromium CDP interaction proof.

## Control contract validated

```text
tap/click lane = select district + history.pushState
Back/Forward   = popstate restores district; never re-push
?lane=<id>     = deep-linkable canonical district state
#anchor        = document scroll context; preserves lane query
pointer        = bounded camera parallax only; never lane mutation
camera         = derives from active district; never source of truth
```

## Validation receipts

- **APWA CI:** run `32910959682` — SUCCESS.
- **Job:** `98004884948` — SUCCESS.
- Governance tests 6/6 PASS.
- Visual-system tests 10/10 PASS.
- Spatial-model tests 7/7 PASS.
- World-navigation tests 10/10 PASS.
- Opportunity deep-link WebGL + camera binding PASS.
- Opportunity deep-link lite/static PASS.
- Real Chromium CDP proof PASS: Learn -> Build -> Community -> Back -> Forward -> `#pathways`; URL/UI/camera state stayed coherent.
- Production entry JS ≈209.65 kB minified / 66.37 kB gzip.
- Optional HeavyWorld ≈887.37 kB minified / 235.72 kB gzip; >500 kB warning intentionally retained for S1.PC.
- Desktop/mobile/reduced-motion-lite PASS.
- Lite HeavyWorld request FALSE / PASS.
- Artifact `9586538171`; digest `sha256:4345b1680e0f8cd38ab8f217c380dfe2c2973d44fbf8933a6718dfc7a7fc6880`.
- Manual desktop/mobile/lite screenshots PASS.
- Local secondary WebGL replay was excluded because the local container lacks usable EGL; GitHub Actions Chromium is authoritative.

## 2026-08-26T01:33:00+02:00 — POST-SEED — SPRINT 1 / RUN B

- **Status:** DONE / VALIDATED.
- **Exact reviewed head:** `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`.
- **PR:** #9.
- **POC/FOC verdict:** `POC_VALIDATED`.
- **Residual uncertainty:** final tier/performance budgets and WebGL failure/recovery remain S1.PC.

## 2026-08-26T01:34:00+02:00 — MERGE RECONCILIATION — SPRINT 1 / RUN B

- **PR #9 merge SHA:** `ac6848b240f26c6aeb47abfe5afcafaa00f528f9`.
- Exact validated head remained `0afbb0937054d6b1abc90d1a9bf22883d26a94e9` at merge.
- Merge method: normal merge with expected-head SHA guard.
- S1.PB is now **DONE / MERGED / POC_VALIDATED**.
- No unresolved S1.PB FOC remains.
- **Next admissible action:** recover S1.PC implementation surface, PRE-SEED S1.PC from this reconciled main state, then execute only adaptive 3D hardening.

---

# S1.PC — QUEUED CONTRACT FROM MASTER ISSUE #3

- full/balanced/lite budgets;
- mobile rearrangement;
- reduced motion;
- WebGL failure fallback;
- performance budget and receipts.

Sprint 1 closes only after S1.PC is either `POC_VALIDATED` or explicitly HOLD/BLOCKED with the unresolved boundary named.

---

# NAMED HOLDS

- HeavyWorld >500 kB -> S1.PC.
- WebGL-failure/final tier budgets -> S1.PC.
- Provider/live domain -> S6.PC.
- Offline update/recovery -> later APWA resilience.
- Branch protection not enabled/proven.

---

# GLOBAL INVARIANTS

- Three.js communicates state/navigation/relationships, not decoration.
- Browser navigation state remains authoritative over camera motion.
- Static and WebGL share canonical topology.
- Mobile rearranges; lite/Save-Data are first-class.
- No fabricated completion/progression/affiliation/opportunity receipts.
- Towers remains reference only; no unlicensed copying.
- Capability graduation remains `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = HOLD, not invention.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
