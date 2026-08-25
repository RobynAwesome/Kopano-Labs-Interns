# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-26T01:45:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

Complete the exact-head merge and reconciliation of **Sprint 1 / Run C (S1.PC) — Adaptive 3D hardening**.

PR #10 is validated on exact head `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`. Do not begin Sprint 2 until that exact head is merged and its merge SHA is reconciled here.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **DONE / MERGED / POC_VALIDATED** | PR #8 merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`; shared static/WebGL topology proven. |
| **S1.PB — Camera + world-state navigation** | **DONE / MERGED / POC_VALIDATED** | PR #9 merge `ac6848b240f26c6aeb47abfe5afcafaa00f528f9`; URL/history/camera authority proven. |
| **S1.PC — Adaptive 3D hardening** | **DONE / VALIDATED / PR #10 READY TO MERGE** | Adaptive policy, tier budgets, constrained HeavyWorld exclusion, WebGL failure fallback and measured byte ceilings all pass on exact head `65d3d9cc...`. |

```text
S1.PA ✅
-> S1.PB ✅
-> S1.PC exact-head merge + reconcile
-> Sprint 1 close
-> Sprint 2 / Run A PRE-SEED
```

---

# PREDECESSOR RECEIPTS

## S1.PA

- PR #8 exact head `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- CI `32756479868`; artifact `9531042977`.
- Governance 6/6, visual 10/10, spatial 7/7 PASS.
- Merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`.
- Verdict `POC_VALIDATED`.

## S1.PB

- PRE-SEED `df222abe4346272c9cefd11c4dba158ed3a3784a`.
- PR #9 exact head `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`.
- CI `32910959682`; job `98004884948`.
- Governance 6/6, visual 10/10, spatial 7/7, world-navigation 10/10 PASS.
- Real Chromium deep-link / Back / Forward / anchor proof PASS.
- Artifact `9586538171`; digest `sha256:4345b1680e0f8cd38ab8f217c380dfe2c2973d44fbf8933a6718dfc7a7fc6880`.
- Merge `ac6848b240f26c6aeb47abfe5afcafaa00f528f9`.
- Reconciliation commit before S1.PC PRE-SEED: `d000a2717207e44dae8ede553958d0ce794d751f`.
- Verdict `POC_VALIDATED`.

---

# S1.PC — ADAPTIVE 3D HARDENING

## PRE-SEED — 2026-08-26T01:36:00+02:00

- **PRE-SEED commit:** `63d7872aaab61ec27c4a68e21a26892915c9fcd4`.
- **Branch:** `sprint-01/run-c-adaptive-3d-hardening`.
- **Objective:** harden the validated S1 spatial world across device/network/motion/WebGL constraints without redesigning it.
- **Scope IN:** one pure adaptive policy, one renderer-admission authority, WebGL preflight/error fallback, full/balanced/lite budgets, tier-driven geometry, measured bundle ceilings, real Chromium adaptive matrix, constrained HeavyWorld exclusion, all prior regression gates.
- **Scope OUT:** Sprint 2 content, service-worker update/recovery redesign, deployment, fake FPS/performance-score claims, learner completion, spatial redesign.

## Exact implementation

- **PR #10:** `S1.PC — Harden adaptive 3D runtime`.
- **Exact reviewed head:** `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`.
- **Merge-test SHA:** `4fe495c23bcd35ab416fe4ce63fb5fb96ae54d64`.
- **Bounded delta:** 12 files, 796 additions, 68 deletions; no Sprint-2/service-worker/deployment leakage.
- Added `src/spatial/render-policy.js` as the single pure signals -> tier -> renderer/budget contract.
- Refactored `src/lib/adaptive.js` to consume that policy.
- `AdaptiveWorld` is now the single renderer-admission authority with WebGL preflight and explicit error fallback to canonical `StaticNetwork`.
- Static fallback exposes governed non-sensitive reason receipts.
- Full / balanced / lite budgets are immutable and machine-testable.
- Balanced reduces DPR, particles, geometry, shadows and antialiasing relative to full.
- Primitive geometry segments now derive from the active WebGL budget.
- Added 13 adaptive-policy tests.
- Added deterministic raw/gzip build-budget enforcement.
- Added CDP runtime matrix for full / balanced / low-device lite / Save-Data / reduced-motion / offline / WebGL-unavailable.

## Governed performance contract validated

```text
entry JS raw  <= 220,000 bytes
entry JS gzip <=  70,000 bytes
HeavyWorld raw  <= 900,000 bytes
HeavyWorld gzip <= 245,000 bytes

full     -> WebGL / DPR <= 1.6 / shadows / richer geometry / 128 particles
balanced -> WebGL / DPR <= 1.25 / no shadows / no AA / lower geometry / 48 particles
lite     -> canonical StaticNetwork / HeavyWorld forbidden
```

The Vite >500 kB warning for the optional Three/R3F chunk remains visible and was not suppressed.

## Validation receipts

- **APWA CI:** run `32911942643` — SUCCESS.
- **Job:** `98007714197` — SUCCESS.
- **Repository governance:** 6/6 PASS.
- **Visual malformed-state tests:** 10/10 PASS.
- **Spatial-model tests:** 7/7 PASS.
- **World-navigation tests:** 10/10 PASS.
- **Adaptive-render policy tests:** 13/13 PASS.
- **Production build:** PASS.
- **Measured bundle budget proof:** PASS:
  - entry `index-sceAgI_C.js`: **212,108 raw / 66,444 gzip** vs 220,000 / 70,000 ceiling;
  - `HeavyWorld-DamsuC7I.js`: **887,708 raw / 233,912 gzip** vs 900,000 / 245,000 ceiling.
- **Chromium adaptive runtime matrix:** PASS:
  - full -> `full` + WebGL + full budget + DPR max 1.6 + HeavyWorld requested;
  - balanced -> `balanced` + WebGL + balanced budget + DPR max 1.25 + HeavyWorld requested;
  - low-device -> lite/static + `policy-lite` + HeavyWorld FALSE;
  - Save-Data -> lite/static + `save-data` + HeavyWorld FALSE;
  - reduced-motion -> lite/static + `reduced-motion` + HeavyWorld FALSE;
  - offline signal -> lite/static + `offline` + HeavyWorld FALSE;
  - WebGL unavailable -> canonical static + `webgl-unavailable` + HeavyWorld FALSE.
- Canonical Opportunity deep links: WebGL PASS; lite/static PASS.
- S1.PB Chromium regression: Learn -> Build -> Community -> Back -> Forward -> `#pathways` PASS; URL/UI/camera stayed coherent.
- Desktop/mobile/reduced-motion-lite runtime PASS.
- Lite netlog HeavyWorld request FALSE / PASS.
- Manifest + service-worker static surfaces reachable / PASS.
- **Artifact:** `9586826584` — `s1-pc-adaptive-3d-proof-65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`.
- **Artifact digest:** `sha256:1faf545b83db8cea2bcea57d60609846721dd5a303a9fa597c6a34a1ccea1000`.
- **Manual screenshot inspection:** desktop balanced PASS; mobile balanced PASS; lite/reduced-motion PASS; no observed hierarchy, caption, route, CTA or thumb-dock regression.

## 2026-08-26T01:45:00+02:00 — POST-SEED — SPRINT 1 / RUN C

- **Status:** DONE / VALIDATED / READY TO MERGE.
- **Actor / validator:** DPF/Forge stateless renter + GitHub Actions + manual artifact inspection.
- **Exact reviewed head SHA:** `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`.
- **PR:** #10.
- **Changed files / bounded delta:** 12 files; 796 additions; 68 deletions.
- **Errors / FOC discovered:** none unresolved inside S1.PC bounded scope.
- **POC/FOC verdict:** `POC_VALIDATED` for adaptive 3D hardening.
- **Merge state:** NOT YET MERGED at this receipt.
- **Residual uncertainty outside scope:** provider/live deployment remains S6.PC; service-worker update/recovery lifecycle remains later APWA resilience; branch protection remains unproven.
- **HOLD condition:** any PR #10 head movement invalidates exact-head merge admission and requires revalidation.
- **Next admissible action:** merge PR #10 only if head remains `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`; reconcile merge SHA; close Sprint 1; recover and PRE-SEED S2.PA.

---

# SPRINT 1 EXIT GATE

Sprint 1 becomes **CLOSED / POC_VALIDATED** only after PR #10 exact-head merge reconciliation.

Validated capability chain after reconciliation will be:

```text
original spatial primitives
+ browser-addressable district navigation
+ route-aware camera projection
+ adaptive full/balanced/lite admission
+ constrained-mode canonical static fallback
+ WebGL-unavailable recovery
+ measured bundle guardrails
```

---

# NAMED HOLDS OUTSIDE S1.PC

- Provider/live domain -> S6.PC.
- Offline update/recovery lifecycle -> later APWA resilience.
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
