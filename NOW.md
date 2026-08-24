# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T19:33:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

Execute **Sprint 1 / Run B (S1.PB) — Camera + world-state navigation**.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **DONE / MERGED / POC_VALIDATED** | PR #8 merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`; shared static/WebGL topology proven. |
| **S1.PB — Camera + world-state navigation** | **ACTIVE / PRE-SEEDED** | Bind lane state to URL/history and route-aware camera without turning motion into navigation authority. |
| **S1.PC — Adaptive 3D hardening** | **QUEUED** | Performance/tier/WebGL-failure hardening remains out of S1.PB. |

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
- S1.PA reconciliation commit before this seed: `e3ff0ec841b39ebeef38f16aa0f47b85f360a64f`.

---

# 2026-08-24T19:33:00+02:00 — PRE-SEED — SPRINT 1 / RUN B

- **Status:** IN-PROGRESS.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Sprint objective:** make the spatial world a usable navigation/state system rather than a decorative renderer.
- **PR-run objective:** bind Learn/Build/Community/Opportunity world state to browser-addressable state and route-aware camera targets while preserving native Back/Forward and normal anchor scrolling.
- **Base branch:** `main`.
- **Exact base before this PRE-SEED commit:** `e3ff0ec841b39ebeef38f16aa0f47b85f360a64f`.
- **Intended branch:** `sprint-01/run-b-camera-world-state-navigation`.
- **Dependencies:** S1.PA canonical `src/spatial/network-model.js`; S0.PC visual contract; existing lane controls and inherited `WorldRig`.
- **Scope IN:**
  1. canonical URL lane state using a non-destructive query parameter that coexists with document anchors;
  2. initial deep-link hydration for all four districts;
  3. user lane selection uses browser history rather than hidden component-only state;
  4. Back/Forward restores district state without re-pushing history;
  5. route-aware camera position/look-at targets derived from canonical lane state;
  6. smooth district camera transitions while pointer remains bounded parallax only;
  7. explicit control contract: tap/click mutates lane + pushes history; pointer does not mutate lane; anchor scroll does not mutate lane; popstate restores state;
  8. deterministic pure navigation/camera tests;
  9. real Chromium interaction receipt: click lane -> URL/state, click another -> Back -> Forward, anchor scroll preserves lane;
  10. existing governance/visual/spatial/build/mobile/lite proof and manual screenshots.
- **Scope OUT:**
  - learner progression/completion state;
  - final camera choreography/cinematic transitions beyond bounded district targeting;
  - final full/balanced/lite performance budgets;
  - WebGL failure strategy changes;
  - lesson/community/opportunity data;
  - external assets;
  - provider deployment.
- **Governing invariants:** browser state is authority over camera motion; camera motion cannot trap/replace native history; invalid lane URLs fall back safely; selection of current lane does not create duplicate history entries; pointer is camera parallax only; anchor links retain the lane query; reduced-motion/lite remains semantically complete; static renderer remains canonical topology.
- **Planned implementation:** pure `src/spatial/navigation.js` state/URL/camera contract; a React hook that wraps browser history; App lane controls route through that hook; WorldRig receives active lane and lerps toward pure camera targets; dedicated CDP-based CI proof drives a real Chromium page through push/back/forward/anchor behavior.
- **Planned validation:** navigation unit tests; existing spatial/visual/governance tests; Vite build; deep-link DOM receipt; CDP browser-history interaction receipt; desktop/mobile/lite screenshots; lite no-heavy-chunk assertion.
- **HOLD / rollback condition:** Back/Forward changes URL without UI state, UI pushes on popstate, anchors lose lane state, pointer mutates lane, invalid deep link breaks rendering, camera transition makes content unreadable, lite requests heavy world, or any prior contract/test regresses.
- **Next admissible action:** create the intended branch from this PRE-SEED commit and implement only S1.PB.

---

# CONTROL CONTRACT TARGET

```text
tap/click lane = select district + history.pushState
Back/Forward   = popstate restores district; never re-push
?lane=<id>     = deep-linkable canonical district state
#anchor        = document scroll context; preserves lane query
pointer        = bounded camera parallax only; never lane mutation
camera         = derives from active district; never source of truth
```

---

# NAMED HOLDS

- HeavyWorld >500 kB -> S1.PC;
- WebGL-failure/final tier budgets -> S1.PC;
- provider/live domain -> S6.PC;
- offline update/recovery -> later APWA resilience;
- branch protection not enabled/proven.

---

# GLOBAL INVARIANTS

- Three.js communicates state/navigation/relationships, not decoration.
- static and WebGL share canonical topology.
- mobile rearranges; lite/Save-Data first-class.
- no fabricated completion/progression/affiliation/opportunity receipts.
- Towers remains reference only; no unlicensed copying.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
