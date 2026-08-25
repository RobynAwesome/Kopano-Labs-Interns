# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-26T01:33:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

Complete the exact-head merge and reconciliation of **Sprint 1 / Run B (S1.PB) — Camera + world-state navigation**.

PR #9 is validated on exact head `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`. Do not begin S1.PC until that exact head is merged and its merge SHA is reconciled here.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **DONE / MERGED / POC_VALIDATED** | PR #8 merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`; shared static/WebGL topology proven. |
| **S1.PB — Camera + world-state navigation** | **VALIDATED / PR #9 READY TO MERGE** | URL/history/camera authority + real Chromium Back/Forward/deep-link proof pass on exact head `0afbb093...`. |
| **S1.PC — Adaptive 3D hardening** | **QUEUED** | Performance/tier/WebGL-failure hardening remains out of S1.PB until merge reconciliation. |

```text
S1.PA ✅
-> S1.PB exact-head merge + reconcile
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

- **Status:** IN-PROGRESS at seed time.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Sprint objective:** make the spatial world a usable navigation/state system rather than a decorative renderer.
- **PR-run objective:** bind Learn/Build/Community/Opportunity world state to browser-addressable state and route-aware camera targets while preserving native Back/Forward and normal anchor scrolling.
- **Base branch:** `main`.
- **Exact base before PRE-SEED commit:** `e3ff0ec841b39ebeef38f16aa0f47b85f360a64f`.
- **PRE-SEED commit:** `df222abe4346272c9cefd11c4dba158ed3a3784a`.
- **Branch:** `sprint-01/run-b-camera-world-state-navigation`.
- **Dependencies:** S1.PA canonical `src/spatial/network-model.js`; S0.PC visual contract; existing lane controls and inherited `WorldRig`.
- **Scope IN:** canonical `?lane=<id>` state; deep-link hydration; pushState selection; popstate Back/Forward restoration; route-aware camera targets; bounded pointer parallax; deterministic navigation/camera tests; real Chromium history proof; prior regression gates.
- **Scope OUT:** learner progression/completion; final full/balanced/lite budgets; WebGL-failure policy; content models; external assets; provider deployment.
- **Governing invariant:** browser state is authority over camera motion; camera motion cannot become navigation truth.

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
- Updated CI/package scripts only to prove S1.PB behavior; no S1.PC performance-policy implementation entered this run.

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
- **Repository governance tests:** 6/6 PASS.
- **Visual-system malformed-state tests:** 10/10 PASS.
- **Spatial-model tests:** 7/7 PASS.
- **World-navigation tests:** 10/10 PASS.
- Canonical Opportunity deep link on WebGL: PASS with `activeLane=opportunity` and `cameraLane=opportunity`.
- Canonical Opportunity deep link on lite/static renderer: PASS.
- **Real Chromium CDP state proof:** PASS:
  - initial `?lane=learn`, history length 1;
  - select Build -> `?lane=build`, history length 2;
  - select Community -> `?lane=community`, history length 3;
  - Back -> Build while history length remains 3;
  - Forward -> Community while history length remains 3;
  - anchor -> `?lane=community#pathways`; lane and camera remain Community.
- Camera target contract: finite/distinct targets for all four districts; unknown state resolves safely to Learn.
- Camera framing remains bounded: canonical target formula shifts camera X by approximately ±1.4 units maximum with small Z changes; pointer offsets are separately bounded and never mutate district state.
- **Production build:** PASS.
  - entry JS ≈209.65 kB minified / 66.37 kB gzip;
  - optional HeavyWorld ≈887.37 kB minified / 235.72 kB gzip;
  - existing >500 kB HeavyWorld warning retained and explicitly deferred to S1.PC.
- Desktop browser: PASS.
- Mobile browser: PASS.
- Reduced-motion lite: PASS.
- Lite HeavyWorld request: FALSE / PASS.
- Manifest + service-worker static surfaces: PASS.
- **Artifact:** `9586538171` — `s1-pb-world-navigation-proof-0afbb0937054d6b1abc90d1a9bf22883d26a94e9`.
- **Artifact digest:** `sha256:4345b1680e0f8cd38ab8f217c380dfe2c2973d44fbf8933a6718dfc7a7fc6880`.
- **Manual screenshot inspection:** desktop PASS; normal mobile PASS; lite mobile PASS; no observed hierarchy/caption/thumb-dock regression.
- Local secondary WebGL replay was not counted as evidence because the local validation container lacks a usable EGL backend. The GitHub Actions Chromium run remains the authoritative WebGL receipt.

## 2026-08-26T01:33:00+02:00 — POST-SEED — SPRINT 1 / RUN B

- **Status:** DONE / VALIDATED / READY TO MERGE.
- **Actor / validator:** DPF/Forge stateless renter + GitHub Actions + manual artifact inspection.
- **Branch:** `sprint-01/run-b-camera-world-state-navigation`.
- **Exact reviewed head SHA:** `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`.
- **PR:** #9.
- **Changed files / bounded delta:** 8 files; 575 additions; 19 deletions.
- **Errors / FOC discovered:** none unresolved inside S1.PB bounded scope.
- **POC/FOC verdict:** `POC_VALIDATED` for camera + browser world-state navigation.
- **Merge state:** NOT YET MERGED at this receipt.
- **Residual uncertainty:** final performance budgets, HeavyWorld size reduction, renderer failure/recovery, and tier hardening remain S1.PC. Provider/live deployment remains S6.PC.
- **HOLD condition:** any PR #9 head movement invalidates exact-head merge admission and requires revalidation.
- **Next admissible action:** merge PR #9 only if head remains `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`; reconcile merge SHA; then PRE-SEED S1.PC.

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
