# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T03:18:23+02:00 (SAST)
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

Program law:

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

Product thesis:

```text
living spatial Kopano knowledge network
+ editorial Knowledge Stream
+ adaptive mobile application
```

This repository is **not** an intern-management portal. Interns are one cohort inside the public education/build/community/opportunity system.

## Canonical entry order

Every stateless renter must:

1. assert `I_AM_STATELESS_RENTER_NOT_LANDLORD`;
2. read `README.md`;
3. read master Issue #3;
4. read this root `NOW.md` completely;
5. read `AGENTS.md`;
6. read `governance/EXECUTION_PROTOCOL.md`;
7. inspect open PRs/issues and exact GitHub receipts;
8. recover the admitted Sprint + Run;
9. use `HOLD_AND_RECONCILE` when state/evidence conflicts;
10. PRE-SEED before material implementation;
11. POST-SEED/reconcile before handoff, merge, or next-run admission.

`RobynAwesome/Introduction-to-MCP` supplies durable governance patterns. Its active NOW state does **not** replace this repository's active state.

---

## Active Sprint — SPRINT 0

| Run | State | Canonical truth |
|---|---|---|
| **S0.PA — existing APWA foundation reconciliation** | **ACTIVE / POST-MERGE VALIDATION HOLD** | PR #2 merged, exact-head production build is proven, but deployed browser/mobile visual proof is still absent. Issue #1 is reopened so merge state is not confused with POC validation. |
| **S0.PB — renter/sprint governance hardening** | **BLOCKED BY S0.PA** | Bootstrap governance exists on main, but no new S0.PB material work is admitted until S0.PA resolves or records an explicit named HOLD transfer. |
| **S0.PC — visual system truth lock** | **QUEUED** | Do not begin until predecessor receipt law permits it. |

Sprint gate:

```text
S0.PA receipt
-> S0.PB receipt
-> S0.PC receipt
-> Sprint 0 close
-> only then Sprint 1
```

---

# S0.PA — LEGACY RECONCILIATION

## 2026-08-24T03:07:33+02:00 — PRE-SEED / RECONCILIATION

- **Status:** IN-PROGRESS / HOLD BEFORE MERGE at time of seed.
- **Actor:** DPF/Forge stateless renter under SSE direction.
- **Master issue:** #3.
- **Issue:** #1 — `PR1 — Immersive APWA learning network foundation`.
- **PR:** #2 — `PR1 — Immersive APWA learning network foundation`.
- **Legacy branch:** `feat/pr1-immersive-apwa-foundation`.
- **Original PR base:** `6e698642334af4a5c0bf36f86e727fa99d7769d7`.
- **Scope IN:** APWA foundation reconciliation, current-main governance reconciliation, dependency/build repair, adaptive-loading hardening, production build proof, browser/mobile/deployment proof.
- **Scope OUT:** Sprint 1 spatial primitives, lesson/video data model, community backend, opportunity workflows, launch claims.
- **POC/FOC at seed:** `POC_IMPLEMENTED_NOT_VALIDATED`.

## 2026-08-24T03:18:23+02:00 — POST-MERGE RECONCILIATION — SPRINT 0 / RUN A

- **Status:** `PAUSED / HOLD_AND_RECONCILE` — PR merged before all S0.PA acceptance evidence existed.
- **Actor / validator:** DPF/Forge stateless renter; GitHub Actions as build witness.
- **Exact merged PR head:** `d48032a8d7f523ad51983263d207689a0cd89636`.
- **PR:** #2 — merged.
- **Merge commit:** `845278fdb61202bc1940270514c714c7c7d7883d`.
- **Merge timing fact:** merge/automatic issue closure occurred before the deployed browser/mobile criterion had a receipt. Do not rewrite this as pre-merge validation.

### Material corrections admitted before merge

- Three.js dependency repaired from unpublished `^0.186.0` to published stable `^0.185.1`.
- PR branch reconciled with current main governance before subsequent validation.
- Heavy R3F/Three.js runtime separated from the entry bundle.
- `lite` / Save-Data paths receive a zero-WebGL static network representation instead of eagerly downloading/rendering the heavy spatial runtime.
- Static fallback styles were added and wired.
- CI exports a validation artifact rather than leaving the build as narration only.

### Validation receipts

- **APWA CI:** run `32679218773` — `SUCCESS` on exact merged head `d48032a8d7f523ad51983263d207689a0cd89636`.
- **Build job:** `97292799818` — dependency install, Vite production build, artifact export all `SUCCESS`.
- **Artifact:** ID `9503619737`, name `s0-pa-validation`, size `1,241,808` bytes.
- **Artifact digest:** `sha256:0d251e3dea13e24ac5ea4e2f7882ed9d00411d1f90a67bb42f81f0bd2530b0a2`.
- **Entry bundle:** `index-9caxckOF.js` ≈ `205.43 kB` minified / `64.88 kB` gzip.
- **Optional heavy spatial chunk:** `HeavyWorld-DZmr17Tu.js` ≈ `884.90 kB` minified / `235.17 kB` gzip.
- **Vite warning:** heavy optional chunk remains >500 kB. This warning is retained as evidence; warning thresholds were not cosmetically raised.

### Proof boundaries / unresolved FOC

- Source exists: **PROVEN**.
- Dependency install: **PROVEN**.
- Production build: **PROVEN**.
- Adaptive static-vs-heavy code path: **IMPLEMENTED + BUILD-PROVEN**.
- Browser runtime on desktop/mobile: **NOT YET RECEIPTED**.
- Reduced-motion/lite visual behavior in a browser: **NOT YET RECEIPTED**.
- Offline/service-worker behavior in a browser: **NOT YET RECEIPTED**.
- Deployed preview URL/ownership: **NOT YET RECEIPTED**.
- Connected Vercel inventory currently contains no project linked to `RobynAwesome/Kopano-Labs-Interns`; do not fabricate a Vercel preview.

### Issue truth

Issue #1 was automatically closed by the merged PR despite one acceptance criterion remaining unchecked. It has been **reopened**. The GitHub Actions build criterion is now checked with exact receipts; deployed browser/mobile verification remains unchecked.

### POC / FOC verdict

```text
POC_IMPLEMENTED_BUILD_VALIDATED_VISUAL_DEPLOYMENT_HOLD
```

This is **not** `POC_VALIDATED` for S0.PA.

### Next admissible action

Stay inside **S0.PA**. Establish deterministic browser/mobile/reduced-motion runtime evidence from the merged build and obtain a real deployed preview ownership/URL receipt. If provider deployment cannot be established with available authority/tools, record a named external-deployment HOLD rather than beginning S0.PB or Sprint 1.

---

# BOOTSTRAP GOVERNANCE RECEIPT

## 2026-08-24T03:07:33+02:00 — PROGRAM BOOTSTRAP

- **Status:** DONE for bootstrap persistence only.
- **Evidence:**
  - master Issue #3;
  - `AGENTS.md` commit `b4163f49646b3ac66498215a28bf320f3894cbd2`;
  - `governance/EXECUTION_PROTOCOL.md` commit `bb6e8c333ffede79743ac96f599de0543c871830`;
  - canonical NOW commit before PR merge `a40b23bbb2c1d8f2ffa0dd23c061b9cb2d3ff870`.
- **POC/FOC:** `POC_VALIDATED` for governance persistence only.

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

# PRE-SEED TEMPLATE

```text
## [TIMESTAMP SAST] — PRE-SEED — SPRINT [N] / RUN [A|B|C]
- Status: IN-PROGRESS
- Actor: ...
- Master issue: #3
- Sprint objective: ...
- PR-run objective: ...
- Base branch + exact base SHA: ...
- Intended branch: ...
- Dependencies / predecessor receipts: ...
- Scope IN: ...
- Scope OUT: ...
- Governing invariants: ...
- Known blockers / uncertainty: ...
- Planned validation: ...
- HOLD / rollback condition: ...
- Next admissible action: ...
```

# POST-SEED TEMPLATE

```text
## [TIMESTAMP SAST] — POST-SEED — SPRINT [N] / RUN [A|B|C]
- Status: DONE | BLOCKED | PAUSED
- Actor / validator: ...
- Branch: ...
- Exact reviewed head SHA: ...
- PR: #...
- Changed files / bounded delta: ...
- Validation receipts: ...
- Errors / FOC discovered: ...
- POC/FOC verdict: ...
- Merge state / merge SHA: ...
- Residual uncertainty: ...
- Next admissible action: ...
```

If blocked or insufficiently knowable: **log the boundary and HOLD. Do not hallucinate a workaround or continuity.**

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
