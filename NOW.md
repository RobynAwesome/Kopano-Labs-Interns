# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T03:37:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`
>
> **Rule:** recover current state before execution; PRE-SEED before material implementation; POST-SEED/reconcile before handoff, merge, or next-run admission.

---

# CURRENT STATE — 2026-08-24

## Current objective

Complete the physical merge/reconciliation of **Sprint 0 / Run B (S0.PB) — stateless-renter and sprint governance hardening**.

S0.PB is validated on exact PR #6 head. Do **not** begin S0.PC until PR #6 merges at that exact head and its merge SHA is reconciled here.

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

```text
living spatial Kopano knowledge network
+ editorial Knowledge Stream
+ adaptive mobile application
```

This repository is not an intern-management portal. Interns are one cohort inside the public education/build/community/opportunity system.

## Canonical entry order

1. Assert `I_AM_STATELESS_RENTER_NOT_LANDLORD`.
2. Read `README.md` for durable product purpose only.
3. Read master Issue #3 for the canonical sprint map.
4. Read repository-root `NOW.md` completely for current state.
5. Read `AGENTS.md`.
6. Read `governance/EXECUTION_PROTOCOL.md`.
7. Inspect exact GitHub issue/PR/branch/check receipts.
8. Recover the single admitted Sprint + Run.
9. `HOLD_AND_RECONCILE` when stronger evidence conflicts.
10. PRE-SEED before material implementation.
11. POST-SEED/reconcile before handoff, merge, or next-run admission.

`README.md`, prior chats, model memory, screenshots, or another repository's NOW may inform context; none replaces this root `NOW.md` as temporal truth.

---

## Active Sprint — SPRINT 0

| Run | State | Canonical truth |
|---|---|---|
| **S0.PA — APWA foundation reconciliation** | **DONE / POC_VALIDATED** | Build/browser/adaptive foundation validated across PRs #2, #4, #5. Issue #1 closed completed. Provider deployment remains an explicit HOLD transferred to S6.PC. |
| **S0.PB — renter/sprint governance hardening** | **VALIDATED / PR #6 READY TO MERGE** | README routing, canonical PR contract, dependency-free governance validator, malformed-state tests and CI enforcement are all proven on exact head `cf3255bf71537459989e37318769958be76ff3c4`. |
| **S0.PC — visual system truth lock** | **BLOCKED UNTIL S0.PB MERGE RECONCILIATION** | No spatial/editorial visual redesign or Sprint 1 implementation is admitted yet. |

```text
S0.PA ✅
-> S0.PB exact-head merge + reconcile
-> S0.PC PRE-SEED
-> S0.PC receipt
-> Sprint 0 close
-> Sprint 1
```

---

# S0.PA — FINAL RECEIPT SUMMARY

Detailed S0.PA acceptance and receipts are persisted in completed Issue #1.

- PR #2 merge `845278fdb61202bc1940270514c714c7c7d7883d`; CI `32679218773`; adaptive loading made heavy Three.js optional and excluded from `lite` / Save-Data.
- PR #4 merge `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`; CI `32679514503`; deterministic browser proof found a real lite-mobile screenshot FOC despite green automation.
- PR #5 exact head `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`; merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`; CI `32679745334`; artifact `9503786800`; replacement desktop/mobile/lite screenshots PASS.

```text
S0.PA BUILD / BROWSER / ADAPTIVE FOUNDATION = POC_VALIDATED
EXTERNAL PROVIDER DEPLOYMENT                = HOLD -> S6.PC
FULL OFFLINE UPDATE/RECOVERY LIFECYCLE       = future APWA hardening lane
```

---

# S0.PB — CANONICAL RECEIPT

## PRE-SEED

- **PRE-SEED commit:** `986eb07abfd969811f89d2a9dd3a47c97af03da6`.
- **Branch:** `sprint-00/run-b-governance-hardening`.
- **Scope IN:** README live-state routing; canonical PR template; dependency-free governance validator; malformed-state tests; CI governance enforcement; package commands.
- **Scope OUT:** S0.PC visual truth lock, logo/spatial redesign, Knowledge Stream design, lesson/video/community/opportunity implementation, Sprint 1, provider deployment.
- **Known boundary:** GitHub server-side branch protection is not proven by this run.

## Exact implementation

- **PR #6:** `S0.PB — Harden stateless renter governance`.
- **Exact reviewed head:** `cf3255bf71537459989e37318769958be76ff3c4`.
- **Merge-test SHA:** `02ca4b563331d1d8fbfd090bb531e9ecbb150e5a`.
- **Bounded delta:** 6 changed files, 372 additions, 14 deletions.
- Files:
  - `README.md` — active-state routing now points to Issue #3 + root `NOW.md`, not hard-coded PR prose;
  - `.github/PULL_REQUEST_TEMPLATE.md` — Master/Sprint/Run/PRE-SEED/Scope IN/Scope OUT/acceptance/validation/exact-head/POC-FOC/POST-SEED contract;
  - `scripts/validate-governance.mjs` — dependency-free repository + PR metadata validator;
  - `tests/governance-validator.test.mjs` — deterministic positive and negative tests;
  - `package.json` — governance validation commands;
  - `.github/workflows/apwa-ci.yml` — governance checks execute before dependency install/product proof.

## Validation receipts

- **APWA CI:** run `32680194015` — SUCCESS.
- **Job:** `97295399548` — SUCCESS.
- **Repository governance validation:** PASS.
- **Negative/positive governance tests:** 6/6 PASS.
- Explicit rejected conditions proved in tests:
  - missing root `NOW.md`;
  - missing continuity markers;
  - stale README active-routing language;
  - malformed PR title;
  - malformed PR body.
- **Live PR #6 contract:** PASS against actual title/body in CI.
- **Production build:** PASS; entry bundle remains ≈205.43 kB minified / 64.88 kB gzip; optional heavy spatial chunk warning remains visible rather than hidden.
- **Desktop/mobile/reduced-motion-lite browser proof:** PASS.
- **Lite `HeavyWorld-*` request:** FALSE / PASS.
- **Artifact:** `9503912772` — `s0-pb-governed-apwa-proof-cf3255bf71537459989e37318769958be76ff3c4`.
- **Artifact digest:** `sha256:cefd8343a9ed18337761713af83e8fd579c44b5f6d41ea498ab05d4067102679`.
- **Manual screenshot inspection:** desktop PASS; normal mobile PASS; lite mobile PASS; no observed S0.PB product regression.

## POST-SEED — S0.PB

- **Status:** VALIDATED / READY TO MERGE PR #6.
- **Actor / validator:** DPF/Forge stateless renter + GitHub Actions + manual artifact inspection.
- **Branch:** `sprint-00/run-b-governance-hardening`.
- **Exact reviewed head:** `cf3255bf71537459989e37318769958be76ff3c4`.
- **PR:** #6.
- **POC/FOC verdict:** `POC_VALIDATED` for repository-local stateless-renter continuity and CI governance enforcement.
- **Merge state:** NOT YET MERGED at this receipt.
- **Residual uncertainty:** GitHub branch-protection settings are not proven/enforced by this receipt; external deployment remains HOLD -> S6.PC.
- **HOLD condition:** any PR-head movement after this receipt invalidates the exact-head merge admission and requires revalidation.
- **Next admissible action:** merge PR #6 only if head remains `cf3255bf71537459989e37318769958be76ff3c4`; reconcile merge SHA into root NOW; then and only then PRE-SEED S0.PC.

---

# GLOBAL PRODUCT INVARIANTS

- APWA: mobile-first, installable, offline-aware, adaptive.
- Mobile rearranges; it does not merely shrink desktop UI.
- Public learning core is not login-gated.
- Three.js carries information/state/navigation, not decorative theatre.
- Weak-device, low-data, Save-Data, reduced-motion and offline paths are first-class.
- Visual-first; avoid card-wall and text-wall FOC.
- No fake metrics, completions, affiliations, events, opportunities, hardware availability, CI or production receipts.
- Microsoft / GDG / AWS / OpenAI Academy / AMD are governed ecosystem lanes; no unsupported endorsement claims.
- Towers is an interaction/design reference only; no unlicensed source/artwork copying.
- Capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = `HOLD`, not invention.

---

If blocked or insufficiently knowable: **log the boundary and HOLD. Do not hallucinate a workaround or continuity.**

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
