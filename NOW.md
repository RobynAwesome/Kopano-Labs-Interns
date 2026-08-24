# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T03:30:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`
>
> **Rule:** recover current state before execution; PRE-SEED before material implementation; POST-SEED/reconcile before handoff, merge, or next-run admission.

---

# CURRENT STATE — 2026-08-24

## Current objective

Execute **Sprint 0 / Run B (S0.PB) — stateless-renter and sprint governance hardening**.

S0.PA is complete and receipted. Do not begin S0.PC visual-system truth-lock work inside this run.

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
| **S0.PB — renter/sprint governance hardening** | **ACTIVE / PRE-SEEDED** | Harden the existing prose governance into a renter-safe entry surface, PR contract and deterministic governance check. |
| **S0.PC — visual system truth lock** | **QUEUED** | No spatial/editorial visual redesign or Sprint 1 implementation is admitted yet. |

```text
S0.PA ✅
-> S0.PB ACTIVE
-> S0.PC
-> Sprint 0 close
-> Sprint 1
```

---

# S0.PA — FINAL RECONCILIATION RECEIPT

S0.PA's detailed acceptance and receipt chain is persisted in completed Issue #1. Current canonical summary:

### PR #2 — foundation + adaptive loading

- exact merged head `d48032a8d7f523ad51983263d207689a0cd89636`;
- merge `845278fdb61202bc1940270514c714c7c7d7883d`;
- APWA CI `32679218773` SUCCESS;
- artifact `9503619737`;
- heavy R3F/Three.js made lazy and excluded from `lite` / Save-Data path.

### PR #4 — deterministic browser proof

- exact head `022d5a957017c538240d6f9e8667a900d2e033a8`;
- merge `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`;
- APWA CI `32679514503` SUCCESS;
- artifact `9503713960`;
- desktop/mobile/lite runtime proved;
- screenshot inspection, despite green CI, flagged a lite-mobile caption/headline collision.

### PR #5 — visual remediation

- exact reviewed head `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`;
- merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`;
- APWA CI `32679745334` SUCCESS;
- artifact `9503786800` / digest `sha256:61078ed0fd14ba51f31b3360503fdc681fb5905e2f84c72cdce1a0ef2d40368c`;
- bounded delta `src/static-world.css`, +16/-0;
- replacement screenshots manually inspected: desktop PASS, normal mobile PASS, lite mobile PASS.

### S0.PA verdict

```text
BUILD / BROWSER / ADAPTIVE FOUNDATION = POC_VALIDATED
EXTERNAL PROVIDER DEPLOYMENT          = HOLD -> S6.PC
FULL OFFLINE UPDATE/RECOVERY LIFECYCLE= future APWA hardening lane
```

Issue #1 was closed completed on 2026-08-24 after the provider/deployment proof boundary was explicitly separated rather than fabricated.

---

# 2026-08-24T03:30:00+02:00 — PRE-SEED — SPRINT 0 / RUN B

- **Status:** IN-PROGRESS.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Sprint objective:** make repository continuity durable enough that a fresh renter can enter without chat history and cannot silently bypass the sprint/receipt contract.
- **PR-run objective:** harden the already-persisted `AGENTS.md` + `EXECUTION_PROTOCOL.md` into a machine-checkable governance entry/gate; remove stale README status that pretends a fixed PR is always next.
- **Base branch:** `main`.
- **Exact product/governance base before this PRE-SEED commit:** `75e5750800a51db7a1bb923fb3e6e69cf5331c9f`.
- **Intended branch:** `sprint-00/run-b-governance-hardening`.
- **Predecessor receipts:** S0.PA completed Issue #1; PR #5 merge `ba604bbd57750ace35b855adea2b6c1d58d8db85`; exact-head APWA CI `32679745334`.
- **Scope IN:**
  1. update `README.md` so active work always routes renters to Issue #3 + root `NOW.md` rather than hard-coded stale PR status;
  2. add a canonical pull-request template requiring Master/Sprint/Run/PRE-SEED/scope-IN/scope-OUT/acceptance/validation/exact-head/POC-FOC/POST-SEED fields;
  3. add a dependency-free governance validator that checks required root governance surfaces and critical continuity markers;
  4. add deterministic tests for the validator, including malformed-state rejection;
  5. run the governance validator in CI before/alongside the APWA build/browser proof.
- **Scope OUT:** visual-system tokens, logo/spatial redesign, Knowledge Stream design, lesson/video model, community/opportunity implementation, Sprint 1 Three.js work, provider deployment.
- **Governing invariants:** root NOW is temporal authority; stale/contradictory state must HOLD; a green build cannot compensate for missing governance receipts; governance checks must remain dependency-light and inspectable.
- **Known blockers / uncertainty:** GitHub branch protection is currently not proven/enforced; this run may validate repository contracts but must not claim server-side branch protection unless actually configured and witnessed.
- **Planned validation:** run validator against current repository; run negative fixture/tests that prove missing required markers fail; run exact-head GitHub Actions; inspect changed files and PR body against the new contract.
- **HOLD / rollback condition:** validator is cosmetic/self-fulfilling, tests cannot reject malformed governance, CI does not execute the gate, or the run crosses into S0.PC/product redesign.
- **Next admissible action:** branch from this PRE-SEED state, implement only S0.PB governance hardening, open a bounded S0.PB PR, validate, POST-SEED before merge.

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
