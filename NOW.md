# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T19:18:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

This file is the volatile temporal authority for `RobynAwesome/Kopano-Labs-Interns`. Durable product intent lives in `README.md` and master Issue #3. Stronger GitHub/runtime receipts override stale narration and require `HOLD_AND_RECONCILE` before further material work.

---

# CURRENT STATE — 2026-08-24

## Current objective

Complete the exact-head merge and reconciliation of **Sprint 0 / Run C (S0.PC) — Visual System Truth Lock**.

S0.PC is validated on PR #7 head `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`. Do not begin Sprint 1 until that exact head is merged and the merge SHA is reconciled here.

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

```text
living spatial Kopano knowledge network
+ editorial Knowledge Stream
+ adaptive mobile application
```

## Active Sprint — SPRINT 0

| Run | State | Canonical truth |
|---|---|---|
| **S0.PA — APWA foundation reconciliation** | **DONE / POC_VALIDATED** | Build/browser/adaptive foundation validated across PRs #2, #4 and #5. Issue #1 completed. |
| **S0.PB — stateless-renter governance hardening** | **DONE / POC_VALIDATED / MERGED** | PR #6 merged at exact validated head; repository and PR governance are CI-enforced. |
| **S0.PC — visual system truth lock** | **VALIDATED / PR #7 READY TO MERGE** | Human + machine visual contracts, malformed-state rejection, APWA regression proof and manual screenshots all pass on exact head `02e8dfd7...`. |

```text
S0.PA ✅
-> S0.PB ✅
-> S0.PC exact-head merge + reconcile
-> Sprint 0 close
-> Sprint 1 / Run A PRE-SEED
```

---

# CANONICAL ENTRY ORDER

1. Assert `I_AM_STATELESS_RENTER_NOT_LANDLORD`.
2. Read `README.md` for durable product purpose.
3. Read master Issue #3.
4. Read root `NOW.md` completely.
5. Read `AGENTS.md`.
6. Read `governance/EXECUTION_PROTOCOL.md`.
7. Inspect exact GitHub receipts.
8. Recover the single admitted Sprint + Run.
9. Use `HOLD_AND_RECONCILE` on conflict.
10. PRE-SEED before material implementation.
11. POST-SEED before merge/handoff/exit.

---

# SPRINT 0 RECEIPT CHAIN

## S0.PA — APWA foundation

- PR #2 exact merged head `d48032a8d7f523ad51983263d207689a0cd89636`; merge `845278fdb61202bc1940270514c714c7c7d7883d`; CI `32679218773`; artifact `9503619737`.
- Validation-driven split reduced initial JS to ≈205.43 kB minified / 64.88 kB gzip while keeping optional `HeavyWorld-*` lazy and off `lite` / Save-Data paths.
- PR #4 exact head `022d5a957017c538240d6f9e8667a900d2e033a8`; merge `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`; CI `32679514503`; artifact `9503713960`. Manual screenshot inspection found a real lite-mobile overlap despite green automation.
- PR #5 exact head `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`; merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`; CI `32679745334`; artifact `9503786800`; replacement screenshots PASS.
- Verdict: `POC_VALIDATED` for build/browser/adaptive foundation.
- External provider deployment remains HOLD -> S6.PC. Full offline update/recovery lifecycle remains future APWA hardening.

## S0.PB — stateless-renter governance

- PRE-SEED commit `986eb07abfd969811f89d2a9dd3a47c97af03da6`.
- PR #6 exact reviewed/merged head `cf3255bf71537459989e37318769958be76ff3c4`.
- Merge-test SHA `02ca4b563331d1d8fbfd090bb531e9ecbb150e5a`.
- CI `32680194015`; job `97295399548`; governance tests 6/6 PASS.
- Artifact `9503912772`; digest `sha256:cefd8343a9ed18337761713af83e8fd579c44b5f6d41ea498ab05d4067102679`.
- Merge SHA `c8efe886094bf480e4e2630f406c70fdaeb2f4a3`.
- Verdict: `POC_VALIDATED` for repository-local continuity + CI governance enforcement.
- GitHub branch protection remains not enabled/proven.

---

# S0.PC — VISUAL SYSTEM TRUTH LOCK

## PRE-SEED

- **PRE-SEED commit:** `bfb92e577d5f84e129dcc740f76c291ab4a9a9b7`.
- **Branch:** `sprint-00/run-c-visual-system-truth-lock`.
- **Base before PRE-SEED:** `15540492aff10bd350ecbb7a7298391973679995`.
- **Scope IN:** human + machine visual contracts, semantic colour/status law, spatial grammar, Knowledge Stream grammar, GLANCE/LEARN/BUILD depth, responsive/adaptive rules, provenance/accessibility rules, validator/tests, CI hooks, README routing.
- **Scope OUT:** `src/` product visuals, Sprint 1 Three.js geometry/camera/navigation, content schemas, external asset admission, provider deployment.

## Exact implementation

- **PR #7:** `S0.PC — Lock visual system contracts`.
- **Exact reviewed head:** `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`.
- **Merge-test SHA:** `225633406b1a52a1002606e985f0feb77e50c278`.
- **Bounded delta:** 7 files, 1050 additions, 3 deletions, **zero `src/` changes**.
- Added `governance/visual-system/README.md` — human visual/product grammar.
- Added `governance/visual-system/visual-system.contract.json` — machine-readable truth lock.
- Added `scripts/validate-visual-system.mjs` — dependency-free semantic + contrast validator.
- Added `tests/visual-system-contract.test.mjs` — malformed-state rejection suite.
- Updated `package.json`, `.github/workflows/apwa-ci.yml`, and root `README.md` routing only.

### Locked design laws

- Lane identity colour is distinct from system status.
- Precedence: `system status > interaction state > lane accent > decoration`.
- Status always requires a non-colour cue.
- POC anchors retained: canvas `#08130f`, Learn `#ffce32`, Build `#ff6b6b`, Community `#7dd3fc`, Opportunity `#a7f3d0`.
- Spatial primitives: node, route, beacon, district, progression.
- Three.js must encode navigation/relationship/progression/context/status; decorative theatre alone fails.
- GLANCE / LEARN / BUILD are explicit content-depth states.
- Mobile rearranges rather than shrinks; core targets >=44 px.
- Lite does not require WebGL; reduced-motion remains semantically complete; Save-Data does not require the heavy spatial chunk.
- User/reference imagery is direction, not automatic production licence; Towers source/artwork copying remains forbidden.

## Validation receipts

- **APWA CI:** run `32755542146` — SUCCESS.
- **Job:** `97522107915` — SUCCESS.
- **Repository governance tests:** 6/6 PASS.
- **Live PR #7 metadata contract:** PASS.
- **Visual-system contract:** PASS.
- **Visual malformed-state tests:** 10/10 PASS.
- Proven rejected states:
  - missing lane identity;
  - lane accent overriding system status;
  - colour collision without secondary cue;
  - missing BUILD artefact/proof depth;
  - WebGL-required lite mode;
  - missing asset licence metadata;
  - low-contrast critical text;
  - shrink-only mobile composition;
  - S0.PC admitting `src/` implementation.
- **Production build:** PASS; entry JS ≈205.43 kB minified / 64.88 kB gzip.
- **Optional heavy chunk:** ≈884.90 kB minified / 235.17 kB gzip; >500 kB warning retained.
- **Desktop/mobile/reduced-motion-lite runtime:** PASS.
- **Lite heavy chunk request:** FALSE / PASS.
- **Artifact:** `9530709618` — `s0-pc-visual-truth-proof-02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`.
- **Artifact digest:** `sha256:406b92173d73cb35e4721d289e4adcbc52c233ee361158d59a59afcabbd20836`.
- **Manual screenshot inspection:** desktop PASS; normal mobile PASS; lite mobile PASS; no observed product regression.

## 2026-08-24T19:18:00+02:00 — POST-SEED — SPRINT 0 / RUN C

- **Status:** DONE / VALIDATED / READY TO MERGE.
- **Actor / validator:** DPF/Forge stateless renter + GitHub Actions + manual artifact inspection.
- **Branch:** `sprint-00/run-c-visual-system-truth-lock`.
- **Exact reviewed head:** `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`.
- **PR:** #7.
- **Changed files:** 7; zero `src/` product changes.
- **Errors / FOC:** none unresolved inside S0.PC bounded scope.
- **POC/FOC verdict:** `POC_VALIDATED` for the visual-system truth lock.
- **Merge state:** NOT YET MERGED at this receipt.
- **Residual uncertainty:** richer spatial identity is intentionally not implemented; font/external-media production rights remain future explicit admissions; provider deployment remains HOLD -> S6.PC.
- **HOLD condition:** any PR #7 head movement invalidates exact-head merge admission and requires revalidation.
- **Next admissible action:** merge PR #7 only if head remains `02e8dfd7a7d18c92aefee09a8d37cd010a8e71c4`; reconcile merge SHA; close Sprint 0; then PRE-SEED Sprint 1 / Run A.

---

# GLOBAL PRODUCT INVARIANTS

- APWA is mobile-first, installable, offline-aware and adaptive.
- Mobile rearranges; it does not merely shrink desktop UI.
- Public learning core is not login-gated.
- Three.js carries information/state/navigation, not decorative theatre.
- Weak-device, low-data, Save-Data, reduced-motion and offline paths are first-class.
- Visual-first; avoid card-wall and text-wall FOC.
- No fake metrics, completions, affiliations, events, opportunities, hardware availability, CI or production receipts.
- Microsoft / GDG / AWS / OpenAI Academy / AMD are governed ecosystem lanes only; no unsupported endorsement claims.
- Towers is an interaction/design reference only; no unlicensed source/artwork copying.
- User-supplied references govern direction but are not automatically licensed production assets.
- Capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = `HOLD`, not invention.

---

If blocked or insufficiently knowable: **log the boundary and HOLD. Do not hallucinate continuity.**

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
