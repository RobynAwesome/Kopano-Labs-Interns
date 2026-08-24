# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T19:20:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

This file is the volatile temporal authority for `RobynAwesome/Kopano-Labs-Interns`. Durable product intent lives in `README.md` and master Issue #3. Stronger GitHub/runtime receipts override stale narration and require `HOLD_AND_RECONCILE` before material work.

---

# CURRENT STATE — 2026-08-24

## Current objective

**SPRINT 0 IS CLOSED / POC_VALIDATED.**

All three Sprint 0 runs are merged, validated and reconciled. The next admissible work is **Sprint 1 / Run A — Spatial identity primitives**, but it is not admitted until a fresh PRE-SEED names the exact base SHA and bounded scope.

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
| **S0.PA — APWA foundation reconciliation** | **DONE / POC_VALIDATED** | Build/browser/adaptive foundation validated across PRs #2, #4, #5. |
| **S0.PB — stateless-renter governance hardening** | **DONE / POC_VALIDATED** | PR #6 merged; repository/PR governance checks and malformed-state rejection are CI-enforced. |
| **S0.PC — visual system truth lock** | **DONE / POC_VALIDATED** | PR #7 merged at exact validated head; human + machine visual contracts and malformed-visual-state rejection are now canonical. |
| **SPRINT 0** | **CLOSED / POC_VALIDATED** | Governance + build/browser baseline + visual direction all have receipts. |
| **S1.PA — Spatial identity primitives** | **NEXT / NOT YET PRE-SEEDED** | Original node/route/beacon/growth/district vocabulary + static fallback. No camera/navigation implementation yet. |

```text
SPRINT 0 ✅
-> S1.PA PRE-SEED
-> S1.PA implementation + receipt
-> S1.PB
-> S1.PC
```

---

# SPRINT 0 FINAL RECEIPTS

## S0.PA — APWA foundation

- PR #2 exact merged head `d48032a8d7f523ad51983263d207689a0cd89636`; merge `845278fdb61202bc1940270514c714c7c7d7883d`; CI `32679218773`; artifact `9503619737`.
- Validation-driven splitting reduced initial JS to ≈205.43 kB minified / 64.88 kB gzip while keeping the optional heavy Three.js chunk lazy and off `lite` / Save-Data paths.
- PR #4 exact head `022d5a957017c538240d6f9e8667a900d2e033a8`; merge `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`; CI `32679514503`; artifact `9503713960`. Manual screenshot review caught a real lite-mobile overlap despite green automation.
- PR #5 exact head `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`; merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`; CI `32679745334`; artifact `9503786800`; replacement desktop/mobile/lite screenshots PASS.
- Verdict: `POC_VALIDATED`.

## S0.PB — stateless-renter governance

- PRE-SEED `986eb07abfd969811f89d2a9dd3a47c97af03da6`.
- PR #6 exact head `cf3255bf71537459989e37318769958be76ff3c4`; merge `c8efe886094bf480e4e2630f406c70fdaeb2f4a3`.
- CI `32680194015`; job `97295399548`; governance tests 6/6 PASS.
- Artifact `9503912772`; digest `sha256:cefd8343a9ed18337761713af83e8fd579c44b5f6d41ea498ab05d4067102679`.
- Verdict: `POC_VALIDATED`.

## S0.PC — visual system truth lock

- PRE-SEED `bfb92e577d5f84e129dcc740f76c291ab4a9a9b7`.
- PR #7 exact validated head `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`.
- Merge-test SHA `225633406b1a52a1002606e985f0feb77e50c278`.
- CI `32755542146`; job `97522107915`.
- Governance tests 6/6 PASS; visual-system malformed-state tests 10/10 PASS.
- Artifact `9530709618`; digest `sha256:406b92173d73cb35e4721d289e4adcbc52c233ee361158d59a59afcabbd20836`.
- Manual desktop/mobile/lite screenshot review PASS; branch had zero `src/` product changes.
- **Merge SHA:** `fd5088694f5e90c9358f18f8ac88289750ec8cf4`.
- Merge method: merge commit, guarded by expected exact head SHA.
- Canonical visual authority now exists at:
  - `governance/visual-system/README.md`;
  - `governance/visual-system/visual-system.contract.json`;
  - `scripts/validate-visual-system.mjs`;
  - `tests/visual-system-contract.test.mjs`.
- Verdict: `POC_VALIDATED`.

---

# SPRINT 0 EXIT VERDICT

```text
S0.PA = POC_VALIDATED
S0.PB = POC_VALIDATED
S0.PC = POC_VALIDATED
SPRINT 0 = CLOSED / POC_VALIDATED
```

Named boundaries carried forward rather than hidden:

- external provider/live-domain deployment = `HOLD -> S6.PC`;
- full service-worker update/offline recovery lifecycle = future APWA resilience lane, primarily S6.PB;
- GitHub branch protection = not currently enabled/proven;
- optional heavy spatial chunk remains >500 kB and its warning stays visible;
- production fonts/external media require explicit rights/provenance admission.

---

# S1.PA — NEXT ADMISSION BOUNDARY

Master Issue #3 defines **S1.PA — Spatial identity primitives**:

Scope target:

- construct original Three.js/R3F Kopano network primitives;
- node, route, beacon, growth/leaf-arrow and district vocabulary;
- no copied Towers geometry/assets;
- static fallback representation.

Run A must establish reusable structure without stealing S1.PB or S1.PC scope.

**Scope OUT until separately admitted:**

- route-aware camera movement;
- browser history/back/forward/deep-link navigation;
- district transition choreography;
- final full/balanced/lite performance hardening;
- content-feed/community/opportunity implementation.

Before S1.PA implementation: write a fresh PRE-SEED from current exact `main`, inspect current `AdaptiveWorld`/heavy world/static fallback, and bind the new primitives to the S0.PC visual contract.

---

# GLOBAL PRODUCT INVARIANTS

- APWA is mobile-first, installable, offline-aware and adaptive.
- Mobile rearranges; it does not merely shrink desktop UI.
- Public learning core is not login-gated.
- Three.js carries information/state/navigation, not decorative theatre.
- Weak-device, low-data, Save-Data, reduced-motion and offline paths are first-class.
- Visual-first; avoid card-wall and text-wall FOC.
- System status overrides lane accent and always retains a non-colour cue.
- No fake metrics, completions, affiliations, events, opportunities, hardware availability, CI or production receipts.
- Towers is an interaction/design reference only; no unlicensed source/artwork copying.
- User-supplied references govern direction but are not automatically licensed production assets.
- Capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = `HOLD`, not invention.

---

If blocked or insufficiently knowable: **log the boundary and HOLD. Do not hallucinate continuity.**

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
