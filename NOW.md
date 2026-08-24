# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-24T03:28:44+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`
>
> **Rule:** recover current state before execution; PRE-SEED before material implementation; POST-SEED/reconcile before handoff, merge, or next-run admission.

---

# CURRENT STATE — 2026-08-24

## Current objective

Complete the physical merge/reconciliation of **Sprint 0 / Run A (S0.PA)**. The bounded build/browser/adaptive foundation is now validated on PR #5 exact head. Do not begin S0.PB until PR #5 is merged and its merge SHA is reconciled into this file.

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
| **S0.PA — APWA foundation reconciliation** | **VALIDATED / PR #5 READY TO MERGE** | Production build, desktop/mobile runtime, reduced-motion/lite behavior and lite no-heavy-chunk behavior are receipted. The lite-mobile screenshot FOC was repaired and re-inspected. External provider deployment is deliberately separate and transferred to the deployment/launch lane. |
| **S0.PB — renter/sprint governance hardening** | **BLOCKED UNTIL S0.PA MERGE RECONCILIATION** | Bootstrap governance exists; begin only after PR #5 merge SHA is written here. |
| **S0.PC — visual system truth lock** | **QUEUED** | No implementation until predecessor receipt law permits it. |

```text
S0.PA PR #5 merge + reconciliation
-> S0.PB PRE-SEED
-> S0.PB receipt
-> S0.PC PRE-SEED
-> S0.PC receipt
-> Sprint 0 close
-> Sprint 1
```

---

# S0.PA — CANONICAL RECEIPT CHAIN

## A. Legacy APWA foundation — PR #2

- **Issue:** #1.
- **PR #2 exact merged head:** `d48032a8d7f523ad51983263d207689a0cd89636`.
- **PR #2 merge commit:** `845278fdb61202bc1940270514c714c7c7d7883d`.
- **APWA CI:** run `32679218773` — SUCCESS.
- **Build job:** `97292799818` — SUCCESS.
- **Artifact:** `9503619737` / `s0-pa-validation`.
- **Artifact digest:** `sha256:0d251e3dea13e24ac5ea4e2f7882ed9d00411d1f90a67bb42f81f0bd2530b0a2`.
- **Entry JS after validation-driven code splitting:** ≈205.43 kB minified / 64.88 kB gzip.
- **Optional heavy Three.js chunk:** ≈884.90 kB minified / 235.17 kB gzip.
- Heavy R3F/Three.js is lazy; `lite` / Save-Data uses a static network path.
- Build proof existed; browser/visual proof was still pending at this stage.

## B. Deterministic browser proof — PR #4

- **PR #4:** merged.
- **Exact head:** `022d5a957017c538240d6f9e8667a900d2e033a8`.
- **Merge commit:** `cacc0f7b8b20631a0aad419a7547dcc8e67a2f51`.
- **APWA CI:** run `32679514503` — SUCCESS.
- **Job:** `97293596152` — SUCCESS.
- **Artifact:** `9503713960`.
- **Artifact digest:** `sha256:b046556758cb48ed4c81bcc496eb8b2361e825edff1cb0ecae9b1718158e016b`.
- Chromium: Google Chrome `151.0.7922.137`.

Automated assertions proved:

```text
production Vite preview reachable        PASS
manifest reachable                       PASS
service-worker script reachable          PASS
desktop DOM + screenshot                 PASS
390×844 mobile DOM + screenshot          PASS
forced reduced-motion selects lite       PASS
lite static-world path                   PASS
lite requests HeavyWorld-*               FALSE / PASS
```

Manual screenshot inspection then found:

```text
desktop.png      PASS
mobile.png       PASS
mobile-lite.png  FOC — floating lane caption overlapped hero copy
```

Green automation therefore did not promote the visual claim.

## C. Lite-mobile visual remediation — PR #5

### PRE-SEED

- **PRE-SEED commit:** `962808ba6b334af5fdc9fb04989eeac82a43c8e1`.
- **Branch:** `sprint-00/run-a-lite-mobile-visual-fix`.
- **Scope IN:** only the ≤700px `lite` overlap repair and revalidation.
- **Scope OUT:** desktop redesign, normal-mobile redesign, lessons, S0.PB, S0.PC, Sprint 1, provider deployment.

### Exact implementation

- **PR #5:** `S0.PA — Repair lite mobile visual overlap`.
- **Exact reviewed head:** `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`.
- **Bounded delta:** 1 file, `src/static-world.css`, +16 / -0.
- On ≤700px `lite` only:
  - hide the redundant floating `.world-caption`;
  - preserve active lane through fixed thumb navigation/pathway state;
  - tighten lite hero bottom position;
  - slightly reduce/relax lite headline sizing.

### Validation receipts

- **APWA CI:** run `32679745334` — SUCCESS on exact PR #5 head.
- **Browser-proof artifact:** `9503786800`.
- **Artifact name:** `s0-pa-browser-proof-2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`.
- **Artifact digest:** `sha256:61078ed0fd14ba51f31b3360503fdc681fb5905e2f84c72cdce1a0ef2d40368c`.
- Existing deterministic browser suite passed again, including lite `HeavyWorld-*` exclusion.

Manual inspection of replacement exact-head screenshots:

```text
desktop.png      PASS — no observed regression
mobile.png       PASS — normal balanced mobile composition preserved
mobile-lite.png  PASS — caption/headline collision removed; CTA and thumb dock remain legible
```

### POST-SEED — S0.PA

- **Status:** VALIDATED / READY TO MERGE PR #5.
- **Actor / validator:** DPF/Forge stateless renter + GitHub Actions + manual screenshot inspection.
- **Branch:** `sprint-00/run-a-lite-mobile-visual-fix`.
- **Exact reviewed head:** `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`.
- **PR:** #5.
- **Validation:** build + browser desktop + browser mobile + reduced-motion/lite + static PWA surfaces + lite no-heavy-chunk + screenshot review.
- **Errors / FOC:** original lite overlap is resolved on the exact reviewed head; no new bounded visual regression observed in exported screenshots.
- **POC/FOC verdict:** `POC_VALIDATED` for the S0.PA build/browser/adaptive foundation.
- **Merge state:** PR #5 NOT YET MERGED at this receipt.
- **Residual uncertainty:** no external provider deployment is witnessed; service-worker script reachability is proven, but full install/update/offline lifecycle hardening remains future work.
- **Next admissible action:** merge PR #5 only if head remains `2ca911361a4c4750ebc6c76ecfb4e2dbf53cc3c6`; then reconcile merge SHA here before S0.PB.

---

# DEPLOYMENT / OFFLINE BOUNDARY — EXPLICIT HOLD TRANSFER

S0.PA does **not** claim a durable public provider deployment.

Connected Vercel inventory has no witnessed project linked to `RobynAwesome/Kopano-Labs-Interns`. CI-hosted Vite preview proves browser runtime; it does not prove Vercel/domain ownership.

The external deployment/live-domain proof belongs to the later production launch lane (**S6.PC**) unless master Issue #3 explicitly re-admits it earlier.

Likewise, S0.PA proves the service-worker script is shipped/reachable; full offline install/update/recovery lifecycle hardening remains admitted later under APWA resilience/production hardening.

This is a **named HOLD transfer**, not a hidden completion claim.

---

# CURRENT POC VERDICT

```text
S0.PA BUILD / BROWSER / ADAPTIVE FOUNDATION = POC_VALIDATED on PR #5 head
EXTERNAL PROVIDER DEPLOYMENT                = HOLD -> S6.PC
FULL OFFLINE/UPDATE LIFECYCLE               = future hardening lane
```

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
