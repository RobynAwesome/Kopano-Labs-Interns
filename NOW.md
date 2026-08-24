# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T19:27:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

This file is the volatile temporal authority. Stronger GitHub/runtime receipts override stale narration and require `HOLD_AND_RECONCILE` before material work.

---

# CURRENT STATE

## Current objective

Complete the exact-head merge/reconciliation of **Sprint 1 / Run A — Spatial identity primitives**.

S1.PA is validated on PR #8 exact head `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`. Do not begin S1.PB until that exact head is merged and the merge SHA is reconciled here.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **VALIDATED / PR #8 READY TO MERGE** | Shared semantic network model, original WebGL primitives and static renderer all validated. |
| **S1.PB — Camera + world-state navigation** | **BLOCKED UNTIL S1.PA MERGE RECONCILIATION** | No implementation yet. |
| **S1.PC — Adaptive 3D hardening** | **QUEUED** | No implementation yet. |

```text
SPRINT 0 ✅
-> S1.PA exact-head merge + reconcile
-> S1.PB PRE-SEED
-> S1.PC
```

---

# SPRINT 0 FINAL RECEIPTS

- S0.PA final remediation PR #5 merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`; CI `32679745334`; artifact `9503786800`.
- S0.PB PR #6 exact head `cf3255bf71537459989e37318769958be76ff3c4`; merge `c8efe886094bf480e4e2630f406c70fdaeb2f4a3`; CI `32680194015`; artifact `9503912772`.
- S0.PC PR #7 exact head `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`; merge `fd5088694f5e90c9358f18f8ac88289750ec8cf4`; CI `32755542146`; artifact `9530709618`; visual malformed-state tests 10/10 PASS.
- Sprint 0 reconciliation `e1761d5205e9f45e5d755a58c67252f55803775e`.

---

# S1.PA — SPATIAL IDENTITY PRIMITIVES

## PRE-SEED

- PRE-SEED commit `b5c47f7dfcf6555e1df8806ee6e791864ee76de0`.
- Branch `sprint-01/run-a-spatial-identity-primitives`.
- Scope IN: shared semantic network model; node/route/beacon/district/growth-mark vocabulary; reusable R3F primitives; reusable static renderer; model tests; existing visual/governance/browser proof.
- Scope OUT: route-aware camera/history/deep links; completion state; final adaptive hardening; content/community/opportunity implementation; provider deployment.

## Exact implementation

- **PR #8:** `S1.PA — Build spatial identity primitives`.
- **Exact reviewed head:** `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- **Merge-test SHA:** `265e789f3e77ea7178dc2493a617ad94dbeb96f1`.
- **Bounded delta:** 9 files, 457 additions, 121 deletions.
- Added `src/spatial/network-model.js` as pure semantic topology.
- Added `src/components/spatial/KopanoPrimitives.jsx` with original `KopanoNode`, `KopanoRoute`, `KopanoBeacon`, `KopanoDistrict`, `KopanoGrowthMark`.
- Added `src/components/StaticNetwork.jsx`, driven by the same semantic model as WebGL.
- Refactored `HeavyWorld.jsx` to consume those primitives while preserving inherited camera rig behavior.
- Replaced duplicated static fallback logic in `App.jsx` / `AdaptiveWorld.jsx` with `StaticNetwork` while preserving lazy heavy-world loading.
- Added `tests/spatial-model.test.mjs` and CI/package validation hooks.

### Semantic law now encoded

```text
node         = governed lane anchor
route        = meaningful Learn -> Build -> Community -> Opportunity relationship
beacon       = active/context signal
 district     = stable lane grouping
 growth-mark = route direction / potential movement; never completion proof
```

Routes explicitly use `completionSemantics: none` and require evidence for real progression.

## Validation receipts

- **APWA CI:** `32756479868` — SUCCESS.
- **Job:** `97525090898` — SUCCESS.
- Governance tests: 6/6 PASS.
- Visual-system tests: 10/10 PASS.
- Spatial-model tests: 7/7 PASS.
- Production build: PASS.
- Entry JS: ≈207.58 kB minified / 65.68 kB gzip (≈+2.15 kB vs S0.PC baseline).
- Optional HeavyWorld: ≈887.03 kB / 235.60 kB gzip (≈+2.13 kB); >500 kB warning retained for S1.PC.
- Capable desktop WebGL renderer DOM assertion: PASS.
- Mobile browser runtime: PASS.
- Reduced-motion/lite static renderer: PASS.
- Static DOM explicitly contains `learn` and `opportunity` lane anchors; shared model tests cover all four nodes and routes.
- Lite `HeavyWorld-*` request: FALSE / PASS.
- Artifact `9531042977` — `s1-pa-spatial-primitives-proof-4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- Artifact digest `sha256:120f12f1d1c693b381a31ef111413e54891144e734f20ce74568bb015f059a4d`.
- Manual screenshots:
  - desktop PASS — network primitives remain behind and supportive of editorial hierarchy;
  - normal mobile PASS — 3D context does not cover CTA/headline/thumb dock;
  - lite mobile PASS — static four-lane network and growth/route marks remain legible with no caption collision.

## 2026-08-24T19:27:00+02:00 — POST-SEED — SPRINT 1 / RUN A

- **Status:** DONE / VALIDATED / READY TO MERGE.
- **Actor / validator:** DPF/Forge stateless renter + GitHub Actions + manual screenshot inspection.
- **Exact reviewed head:** `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- **PR:** #8.
- **POC/FOC verdict:** `POC_VALIDATED` for S1.PA spatial identity primitives and static/WebGL model parity.
- **Merge state:** NOT YET MERGED at this receipt.
- **Residual uncertainty:** camera/history navigation intentionally remains S1.PB; heavy chunk performance remains S1.PC; provider deployment remains HOLD -> S6.PC.
- **HOLD condition:** any PR #8 head movement requires exact-head revalidation before merge.
- **Next admissible action:** merge PR #8 only if head remains `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`; reconcile merge SHA; only then PRE-SEED S1.PB.

---

# NAMED HOLDS

- provider/live domain = HOLD -> S6.PC;
- full offline update/recovery = future APWA resilience lane;
- GitHub branch protection = not enabled/proven;
- optional HeavyWorld >500 kB = visible performance boundary -> S1.PC;
- production fonts/external media require explicit rights/provenance admission.

---

# GLOBAL INVARIANTS

- Three.js communicates state/navigation/relationships, not decoration.
- static and WebGL renderers share canonical topology.
- mobile rearranges; lite/Save-Data remain first-class.
- system status overrides lane accent and retains a non-colour cue.
- no fabricated completion/progression/availability/affiliation receipts.
- Towers remains reference only; no unlicensed copying.
- capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
