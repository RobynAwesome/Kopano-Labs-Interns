# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T19:29:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

This file is the volatile temporal authority. Stronger GitHub/runtime receipts override stale narration and require `HOLD_AND_RECONCILE` before material work.

---

# CURRENT STATE

## Current objective

**S1.PA is DONE / MERGED / POC_VALIDATED.** The next admissible run is **S1.PB — Camera + world-state navigation**, but it is not yet PRE-SEEDED.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **S1.PA — Spatial identity primitives** | **DONE / MERGED / POC_VALIDATED** | PR #8 merged at exact validated head; WebGL/static renderers share canonical spatial topology. |
| **S1.PB — Camera + world-state navigation** | **NEXT / NOT YET PRE-SEEDED** | Recover exact Issue #3 contract before implementation. |
| **S1.PC — Adaptive 3D hardening** | **QUEUED** | Heavy chunk/performance/tier hardening remains here. |

```text
SPRINT 0 ✅
S1.PA ✅
-> S1.PB PRE-SEED
-> S1.PB receipt
-> S1.PC
```

---

# S1.PA FINAL RECEIPT

- PRE-SEED `b5c47f7dfcf6555e1df8806ee6e791864ee76de0`.
- PR #8 `S1.PA — Build spatial identity primitives`.
- Exact validated/merged head `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- Merge-test SHA `265e789f3e77ea7178dc2493a617ad94dbeb96f1`.
- CI `32756479868`; job `97525090898`.
- Governance tests 6/6 PASS; visual-system tests 10/10 PASS; spatial-model tests 7/7 PASS.
- Added shared semantic model + original `KopanoNode`, `KopanoRoute`, `KopanoBeacon`, `KopanoDistrict`, `KopanoGrowthMark` + shared static renderer.
- WebGL capable renderer PASS; static reduced-motion/lite renderer PASS; lite heavy chunk request FALSE.
- Entry JS ≈207.58 kB minified / 65.68 kB gzip.
- HeavyWorld ≈887.03 kB / 235.60 kB gzip; >500 kB warning retained for S1.PC.
- Artifact `9531042977`; digest `sha256:120f12f1d1c693b381a31ef111413e54891144e734f20ce74568bb015f059a4d`.
- Manual desktop/mobile/lite screenshots PASS.
- **Merge SHA `701dec2b37fd7eb8f1c925ae35150aba1342a45a`.**
- Merge method: merge commit guarded by expected exact head SHA.
- Verdict: `POC_VALIDATED`.

---

# CURRENT SPATIAL LAW

```text
node         = governed lane anchor
route        = meaningful relationship
beacon       = active/context signal
district     = stable lane grouping
growth-mark  = route direction / potential movement; never completion proof
```

- Learn -> Build -> Community -> Opportunity topology is canonical.
- Static and WebGL paths share the same semantic model.
- Route/growth marks do not imply user completion.
- S0.PC visual-system contract remains authoritative.

---

# NEXT ADMISSION BOUNDARY — S1.PB

Before implementation:

1. read master Issue #3 S1.PB contract exactly;
2. inspect current lane-state handling and inherited `WorldRig` camera behavior;
3. identify browser-history/deep-link/back-forward implications;
4. PRE-SEED a bounded branch from current exact `main`;
5. do not pull S1.PC performance-hardening scope forward.

---

# NAMED HOLDS

- provider/live domain = HOLD -> S6.PC;
- full offline update/recovery = later APWA resilience;
- branch protection = not enabled/proven;
- HeavyWorld >500 kB = S1.PC performance boundary;
- external fonts/media require explicit rights/provenance.

---

# GLOBAL INVARIANTS

- Three.js communicates state/navigation/relationships, not decoration.
- mobile rearranges; lite/Save-Data remain first-class.
- system status overrides lane accent with a non-colour cue.
- no fabricated completion/progression/availability/affiliation receipts.
- Towers remains reference only; no unlicensed copying.
- capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
