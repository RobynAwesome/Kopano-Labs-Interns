# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T03:24:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`
>
> **Rule:** recover current state before execution; PRE-SEED before material implementation; POST-SEED/reconciliation before handoff, merge, or next-run admission.

---

# CURRENT STATE — 2026-08-24

## Current objective

Finish **Sprint 0 / Run A (S0.PA)** truthfully before any S0.PB, S0.PC, or Sprint 1 product implementation begins.

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

```text
living spatial Kopano knowledge network
+ editorial Knowledge Stream
+ adaptive mobile application
```

This repository is **not** an intern-management portal. Interns are one cohort inside the public education/build/community/opportunity system.

## Canonical entry order

1. `I_AM_STATELESS_RENTER_NOT_LANDLORD`.
2. Read `README.md`.
3. Read master Issue #3.
4. Read root `NOW.md` completely.
5. Read `AGENTS.md`.
6. Read `governance/EXECUTION_PROTOCOL.md`.
7. Inspect exact GitHub receipts.
8. Recover admitted Sprint + Run.
9. `HOLD_AND_RECONCILE` on conflict.
10. PRE-SEED before material implementation.
11. POST-SEED/reconcile before handoff, merge, or next-run admission.

---

## Active Sprint — SPRINT 0

| Run | State | Canonical truth |
|---|---|---|
| **S0.PA — APWA foundation reconciliation** | **ACTIVE / LITE-MOBILE VISUAL REPAIR** | PR #2 build/runtime foundation merged. PR #4 deterministic browser proof merged and passed. Screenshot inspection then found a lite/reduced-motion mobile overlap FOC, so S0.PA remains open. External deployed-preview ownership also remains unproven. |
| **S0.PB — renter/sprint governance hardening** | **BLOCKED BY S0.PA** | Bootstrap governance exists; no new S0.PB material work admitted. |
| **S0.PC — visual system truth lock** | **QUEUED** | Do not begin until predecessor receipt law permits it. |

```text
S0.PA receipt
-> S0.PB receipt
-> S0.PC receipt
-> Sprint 0 close
-> only then Sprint 1
```

---

# S0.PA RECEIPT CHAIN

## 2026-08-24T03:07:33+02:00 — PRE-SEED / LEGACY RECONCILIATION

- Issue #1 / PR #2 were pre-existing legacy work.
- Scope IN: APWA reconciliation, dependency/build repair, adaptive-loading hardening, production/browser/mobile/deployment proof.
- Scope OUT: Sprint 1; lesson/video model; community backend; opportunity workflows; launch claims.
- Initial verdict: `POC_IMPLEMENTED_NOT_VALIDATED`.

## 2026-08-24T03:18:23+02:00 — POST-MERGE RECONCILIATION — PR #2

- **Exact merged PR head:** `d48032a8d7f523ad51983263d207689a0cd89636`.
- **PR #2 merge commit:** `845278fdb61202bc1940270514c714c7c7d7883d`.
- **APWA CI:** run `32679218773` — SUCCESS.
- **Build job:** `97292799818` — install/build/artifact SUCCESS.
- **Artifact:** `9503619737` / `s0-pa-validation` / `sha256:0d251e3dea13e24ac5ea4e2f7882ed9d00411d1f90a67bb42f81f0bd2530b0a2`.
- **Entry JS:** ≈205.43 kB minified / 64.88 kB gzip.
- **Optional heavy Three.js chunk:** ≈884.90 kB minified / 235.17 kB gzip; Vite >500 kB warning retained.
- Dependency corrected to published Three.js `^0.185.1`.
- Heavy spatial runtime separated from lite/Save-Data path.
- Issue #1 auto-closed by `Closes #1` before final acceptance proof; issue was reopened.
- Verdict: `POC_IMPLEMENTED_BUILD_VALIDATED_VISUAL_DEPLOYMENT_HOLD`.

## 2026-08-24T03:19:00+02:00 — PRE-SEED — BROWSER PROOF REPAIR

- **Base product state:** PR #2 merge `845278fdb61202bc1940270514c714c7c7d7883d` plus NOW reconciliation.
- **Branch:** `sprint-00/run-a-runtime-browser-proof`.
- **Scope:** deterministic CI-hosted Vite preview, desktop/mobile/reduced-motion Chromium renders, lite heavy-chunk exclusion, PWA static surfaces, proof artifacts.
- **External deployment claims:** explicitly out of scope.

## 2026-08-24T03:24:00+02:00 — POST-MERGE RECONCILIATION — PR #4

- **PR #4 head:** `022d5a957017c538240d6f9e8667a900d2e033a8`.
- **PR #4 merge commit:** `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`.
- **APWA CI run:** `32679514503` — SUCCESS.
- **Build/browser job:** `97293596152` — SUCCESS.
- **Artifact:** `9503713960` / `s0-pa-browser-proof-022d5a957017c538240d6f9e8667a900d2e033a8`.
- **Artifact digest:** `sha256:b046556758cb48ed4c81bcc496eb8b2361e825edff1cb0ecae9b1718158e016b`.
- Automated proof passed:
  - production build;
  - Vite preview boot;
  - manifest reachability;
  - service-worker script reachability;
  - desktop rendered DOM + screenshot;
  - 390×844 mobile rendered DOM + screenshot;
  - forced reduced-motion reports `lite`;
  - lite DOM uses static-world path;
  - lite network log contains no `HeavyWorld-*` request.
- Exact proof screenshots inspected from artifact:
  - `desktop.png`: visually coherent — PASS;
  - `mobile.png`: thumb-reachable composition coherent — PASS;
  - `mobile-lite.png`: **FOC FLAGGED** — floating world caption overlaps the large hero headline under reduced-motion/lite at 390×844.
- Important boundary: automated CI PASS did **not** erase the screenshot FOC.
- External deployed-preview URL/ownership remains **NOT PROVEN**.
- Current verdict: `FOC_FLAGGED_LITE_MOBILE + DEPLOYMENT_HOLD`.

---

## 2026-08-24T03:24:00+02:00 — PRE-SEED — SPRINT 0 / RUN A LITE VISUAL REPAIR

- **Status:** IN-PROGRESS.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3; active acceptance issue #1.
- **Exact product base before seed:** `main` @ `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`.
- **Intended branch:** `sprint-00/run-a-lite-mobile-visual-fix`.
- **Predecessor receipt:** PR #4 / CI `32679514503` / artifact `9503713960` plus inspected screenshots.
- **Scope IN:** correct only the 390×844 lite/reduced-motion caption/headline collision; rerun the existing exact browser proof and inspect replacement screenshots.
- **Scope OUT:** normal desktop redesign; normal mobile redesign; lesson/video model; S0.PB; S0.PC; Sprint 1; provider deployment claims.
- **Candidate repair:** on ≤700px `lite`, remove the redundant floating world caption, slightly tighten hero positioning/type scale so the static low-cost world stays legible. Active lane remains available in the thumb dock/pathway state.
- **Planned validation:** same APWA CI browser suite; inspect desktop/mobile/mobile-lite screenshots; verify normal mobile/desktop do not regress; verify lite still avoids `HeavyWorld-*`.
- **HOLD condition:** any new overlap, clipping, unreadable CTA, missing thumb dock, heavy Three.js request on lite, or browser test regression.
- **External deployment boundary:** connected Vercel inventory still has no witnessed project for this repo. Do not convert CI preview into provider deployment evidence.
- **Next admissible action:** fresh branch from current main/NOW seed; apply only the bounded lite-mobile CSS repair.

---

# BOOTSTRAP GOVERNANCE RECEIPT

- Master Issue #3.
- `AGENTS.md` commit `b4163f49646b3ac66498215a28bf320f3894cbd2`.
- `governance/EXECUTION_PROTOCOL.md` commit `bb6e8c333ffede79743ac96f599de0543c871830`.
- Governance persistence verdict only: `POC_VALIDATED`.

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
- Towers is a reference for interaction principles only; no unlicensed source/artwork copying.
- Capability graduation law: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = `HOLD`, not invention.

---

If blocked or insufficiently knowable: **log the boundary and HOLD. Do not hallucinate a workaround or continuity.**

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
