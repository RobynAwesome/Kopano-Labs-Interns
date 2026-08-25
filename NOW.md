# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-26T01:36:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

Execute **Sprint 1 / Run C (S1.PC) — Adaptive 3D hardening** and close Sprint 1 only if its renderer admission, constrained-device behavior, WebGL failure recovery and measurable budgets are receipted.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **DONE / MERGED / POC_VALIDATED** | PR #8 merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`; shared static/WebGL topology proven. |
| **S1.PB — Camera + world-state navigation** | **DONE / MERGED / POC_VALIDATED** | PR #9 merge `ac6848b240f26c6aeb47abfe5afcafaa00f528f9`; URL/history/camera authority proven. |
| **S1.PC — Adaptive 3D hardening** | **ACTIVE / PRE-SEEDED** | One adaptive policy, measurable tier budgets, constrained-path HeavyWorld exclusion, WebGL admission/failure fallback and performance receipts. |

```text
S1.PA ✅
-> S1.PB ✅
-> S1.PC ACTIVE
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
- S1.PB reconciliation commit immediately before this PRE-SEED: `d000a2717207e44dae8ede553958d0ce794d751f`.
- Verdict `POC_VALIDATED`.

---

# 2026-08-26T01:36:00+02:00 — PRE-SEED — SPRINT 1 / RUN C

- **Status:** IN-PROGRESS.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Sprint objective:** finish Sprint 1 with a spatial renderer that is useful, navigable and adaptive under real device/network/motion/failure constraints.
- **PR-run objective:** harden the existing renderer admission and quality system without redesigning the validated S1.PA/S1.PB world.
- **Base branch:** `main`.
- **Exact base before this PRE-SEED commit:** `d000a2717207e44dae8ede553958d0ce794d751f`.
- **Intended branch:** `sprint-01/run-c-adaptive-3d-hardening`.
- **Dependencies:** S0.PC visual contract; S1.PA shared topology; S1.PB browser/camera state; current `useAdaptiveProfile`, `AdaptiveWorld`, `HeavyWorld`, `StaticNetwork` and APWA CI.

## Scope IN

1. extract one pure adaptive-profile policy from the existing signal logic so tier decisions are deterministic and testable;
2. include known network constraint signals in tier resolution where reliable: offline, Save-Data, effective 2G/3G, reduced motion, device memory and CPU hints;
3. make `AdaptiveWorld` the single renderer-admission authority; remove duplicated static/WebGL gating from `App`;
4. add WebGL capability preflight before HeavyWorld admission;
5. add an explicit React error boundary so HeavyWorld/R3F initialization/runtime failure resolves to canonical `StaticNetwork` rather than a dead/blank world;
6. expose fallback reason as non-sensitive DOM receipt state for validation (`policy-lite`, `save-data`, `reduced-motion`, `offline`, `webgl-unavailable`, `webgl-error` where applicable);
7. define immutable full/balanced/lite render budgets:
   - `full`: WebGL, capped DPR, shadows, richer particles/geometry;
   - `balanced`: WebGL, lower DPR, no shadows, reduced particles/geometry;
   - `lite`: static canonical network, zero Three.js requirement;
8. drive primitive geometry segmentation from the tier budget instead of hard-coded high segment counts;
9. preserve S1.PB browser/camera semantics exactly;
10. enforce measured build budgets from the validated S1.PB baseline with explicit guard margin:
    - entry application JS <= **220,000 raw bytes** and <= **70,000 gzip bytes**;
    - lazy `HeavyWorld-*` JS <= **900,000 raw bytes** and <= **245,000 gzip bytes**;
    - these are Sprint-1 guardrails, not universal framework limits;
11. prove full / balanced / lite / Save-Data / reduced-motion / offline / WebGL-unavailable behavior in real Chromium using test-only CDP environment injection, never a production override;
12. prove constrained modes never request `HeavyWorld-*`;
13. preserve mobile rearrangement, canonical static topology, reduced-motion completeness, manifest/service-worker reachability and all prior governance/visual/spatial/navigation gates;
14. manually inspect exported desktop/mobile/lite artifacts before merge.

## Scope OUT

- no Sprint 2 learning-content schema/feed work;
- no service-worker update/recovery redesign;
- no provider deployment/live-domain work;
- no fake FPS or synthetic “performance score” claims without measured evidence;
- no replacement of Three/R3F solely to silence the >500 kB warning;
- no copied Towers geometry/assets;
- no learner completion/progression implementation;
- no visual redesign of the validated spatial identity.

## Governed budget contract

```text
full     = WebGL admitted only when unconstrained + WebGL available
balanced = WebGL admitted with reduced DPR/particles/geometry; no shadows
lite     = canonical StaticNetwork; HeavyWorld request forbidden

entry JS raw  <= 220,000 bytes
entry JS gzip <=  70,000 bytes
HeavyWorld raw  <= 900,000 bytes
HeavyWorld gzip <= 245,000 bytes
```

The existing bundler warning for a >500 kB optional Three/R3F chunk remains visible. S1.PC validates isolation, constrained-path exclusion and explicit budget ceilings rather than hiding the warning.

## Planned validation

- adaptive-policy unit tests covering every signal boundary and fallback reason;
- render-budget unit tests ensuring lite cannot become WebGL and balanced cannot silently regain full cost;
- existing governance 6/6, visual 10/10, spatial 7/7, world-navigation 10/10 regression suites;
- production Vite build;
- deterministic bundle-size/gzip budget script against built assets;
- Chromium CDP adaptive matrix using test-only navigator/matchMedia/canvas-context overrides before document load;
- full -> WebGL + HeavyWorld admitted;
- balanced -> WebGL + lower budget marker;
- lite low-device -> static + no HeavyWorld;
- Save-Data -> static + no HeavyWorld;
- reduced-motion -> static + no HeavyWorld;
- offline signal -> static + no HeavyWorld;
- WebGL unavailable -> static + explicit fallback reason + no HeavyWorld;
- existing S1.PB Back/Forward/deep-link proof;
- desktop/mobile/lite screenshots and manual inspection.

## HOLD / rollback conditions

- constrained profile requests `HeavyWorld-*`;
- WebGL unavailable produces blank/dead UI instead of canonical static network;
- adaptive logic exists in more than one competing authority;
- full/balanced/lite budget tests disagree with runtime DOM receipts;
- entry or HeavyWorld asset exceeds governed ceiling;
- mobile/reduced-motion/static topology regresses;
- S1.PB browser/camera semantics regress;
- any test/CI receipt is inferred rather than observed.

- **Next admissible action:** create `sprint-01/run-c-adaptive-3d-hardening` from this PRE-SEED commit and implement only S1.PC.

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
