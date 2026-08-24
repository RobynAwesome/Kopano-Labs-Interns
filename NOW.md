# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T19:23:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

This file is the volatile temporal authority for `RobynAwesome/Kopano-Labs-Interns`. Stronger GitHub/runtime receipts override stale narration and require `HOLD_AND_RECONCILE` before material work.

---

# CURRENT STATE — 2026-08-24

## Current objective

Execute **Sprint 1 / Run A (S1.PA) — Spatial identity primitives**.

Sprint 0 is closed and POC_VALIDATED. S1.PA is admitted as the first product implementation run governed by the S0.PC visual-system truth lock.

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

```text
living spatial Kopano knowledge network
+ editorial Knowledge Stream
+ adaptive mobile application
```

## Sprint state

| Run | State | Canonical truth |
|---|---|---|
| **SPRINT 0** | **CLOSED / POC_VALIDATED** | APWA foundation, renter governance and visual-system truth lock are merged and receipted. |
| **S1.PA — Spatial identity primitives** | **ACTIVE / PRE-SEEDED** | Create original reusable node/route/beacon/district/growth vocabulary and shared static representation. |
| **S1.PB — Camera + world-state navigation** | **QUEUED** | No route-aware camera/history/deep-link implementation in S1.PA. |
| **S1.PC — Adaptive 3D hardening** | **QUEUED** | No final performance-budget/tier hardening in S1.PA. |

---

# SPRINT 0 FINAL RECEIPT

```text
S0.PA = POC_VALIDATED
S0.PB = POC_VALIDATED
S0.PC = POC_VALIDATED
SPRINT 0 = CLOSED / POC_VALIDATED
```

Key receipts:

- S0.PA: PRs #2/#4/#5; final remediation merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`; CI `32679745334`; artifact `9503786800`.
- S0.PB: PR #6 exact head `cf3255bf71537459989e37318769958be76ff3c4`; merge `c8efe886094bf480e4e2630f406c70fdaeb2f4a3`; CI `32680194015`; artifact `9503912772`.
- S0.PC: PR #7 exact head `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`; merge `fd5088694f5e90c9358f18f8ac88289750ec8cf4`; CI `32755542146`; artifact `9530709618`; visual tests 10/10 PASS.
- Sprint 0 reconciliation commit before this seed: `e1761d5205e9f45e5d755a58c67252f55803775e`.

Named boundaries remain:

- provider/live-domain deployment = HOLD -> S6.PC;
- full offline update/recovery = future APWA resilience lane;
- branch protection = not enabled/proven;
- optional heavy spatial chunk remains >500 kB with warning visible;
- external media/font rights require explicit admission.

---

# 2026-08-24T19:23:00+02:00 — PRE-SEED — SPRINT 1 / RUN A

- **Status:** IN-PROGRESS.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Sprint objective:** graduate the existing spatial prototype into original reusable Kopano spatial identity and navigation primitives without stealing the camera/navigation or hardening runs.
- **PR-run objective:** establish a shared semantic network model and reusable WebGL/static primitives for node, route, beacon, district and growth/leaf-arrow vocabulary, then prove both render paths preserve the same lane relationships.
- **Base branch:** `main`.
- **Exact base before this PRE-SEED commit:** `e1761d5205e9f45e5d755a58c67252f55803775e`.
- **Intended branch:** `sprint-01/run-a-spatial-identity-primitives`.
- **Predecessor receipts:** Sprint 0 closed; S0.PC PR #7 merge `fd5088694f5e90c9358f18f8ac88289750ec8cf4`; visual contract `governance/visual-system/visual-system.contract.json`; CI `32755542146`.
- **Inherited POC inspected:**
  - `src/components/HeavyWorld.jsx` currently contains `KnowledgeBeacon`, `PathNetwork`, atmosphere and inherited pointer rig in one file;
  - `src/App.jsx` owns a richer SVG static network path;
  - `src/components/AdaptiveWorld.jsx` has a simpler fallback and lazy-loads `HeavyWorld`;
  - `src/data/lanes.js` contains lane positions/tones.
- **Scope IN:**
  1. create a shared semantic spatial model sourced from the existing four governed lanes;
  2. define original reusable spatial vocabulary: node, route, beacon, district, growth/leaf-arrow;
  3. decompose heavy-world geometry into reusable original R3F primitives without copying Towers assets/geometry;
  4. create one reusable static/SVG network renderer driven by the same semantic model;
  5. replace duplicated static fallback logic with that renderer while keeping the heavy chunk lazy;
  6. encode route direction as journey relationship only — never as fabricated learner completion;
  7. add deterministic model/primitive-contract tests;
  8. run existing governance + visual contract + production browser/mobile/lite proof and manually inspect screenshots.
- **Scope OUT:**
  - route-aware camera movement or district transition choreography;
  - browser back/forward/history/deep links;
  - URL route state;
  - learner progression/completion state;
  - final full/balanced/lite performance budgets or renderer hardening;
  - lesson/content/community/opportunity data implementation;
  - external art/font/media admission;
  - provider deployment.
- **Governing invariants:** S0.PC visual contract is authoritative; Three.js primitives must carry state/relationship/navigation meaning; status overrides lane accent; static fallback preserves lane identity/active context/routes/primary nav; lite/Save-Data still avoids heavy Three.js; mobile remains usable; growth marks cannot imply completion.
- **Planned structure:** a pure semantic model module testable in Node; reusable WebGL primitive components isolated from scene rig; reusable static renderer consuming the same model; current inherited camera rig remains behaviorally unchanged.
- **Planned validation:** deterministic tests for unique nodes, route topology, all required primitive vocabulary, no fabricated progression state, static-model parity; CI visual/governance gates; Vite build; desktop/mobile/reduced-motion-lite Chromium; lite heavy-chunk exclusion; artifact screenshots manually reviewed.
- **HOLD / rollback condition:** primitive layer becomes decoration without semantics; static and WebGL models diverge; route/growth marks imply fake completion; heavy chunk enters lite path; camera/history scope leaks in; visual-contract/governance tests regress; screenshot review finds a composition FOC.
- **Next admissible action:** create `sprint-01/run-a-spatial-identity-primitives` from this PRE-SEED commit and implement only the bounded primitive/model delta.

---

# S1.PA ACCEPTANCE TARGET

A future renderer should be able to consume the same canonical spatial model and express:

```text
node        = selectable governed lane/capability anchor
route       = meaningful relationship between anchors
beacon      = active/priority/context signal
 district    = stable spatial grouping/identity
 growth mark = route direction / potential movement, never completion proof
```

Both WebGL and static renderers must preserve the same Learn -> Build -> Community -> Opportunity topology.

---

# GLOBAL PRODUCT INVARIANTS

- APWA is mobile-first, installable, offline-aware and adaptive.
- Mobile rearranges; it does not merely shrink desktop UI.
- Public learning core is not login-gated.
- Three.js carries information/state/navigation, not decorative theatre.
- Weak-device, low-data, Save-Data, reduced-motion and offline paths are first-class.
- System status overrides lane accent and always retains a non-colour cue.
- No fake metrics, completions, affiliations, opportunities or receipts.
- Towers is interaction/design reference only; no unlicensed source/artwork copying.
- User-supplied references are direction, not automatic production licences.
- Capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = `HOLD`, not invention.

---

If blocked or insufficiently knowable: **log the boundary and HOLD. Do not hallucinate continuity.**

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
