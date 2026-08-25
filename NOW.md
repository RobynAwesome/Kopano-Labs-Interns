# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-26T01:46:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

**Sprint 1 is CLOSED / POC_VALIDATED.** Recover the current learning-content truth, reconcile any stale placeholder narration, and PRE-SEED **Sprint 2 / Run A (S2.PA) — Content + provenance contracts** before material content implementation.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **Sprint 1** | **CLOSED / POC_VALIDATED** | Spatial identity + browser navigation + adaptive 3D hardening all validated and merged. |
| **S2.PA — Content + provenance contracts** | **NEXT / NOT YET PRE-SEEDED** | Recover current content model truth, then define governed lesson/article/video/resource + provenance + depth + lifecycle contracts. |
| **S2.PB — Editorial Knowledge Stream** | **QUEUED** | No implementation before S2.PA receipt. |
| **S2.PC — Lesson route + offline learning** | **QUEUED** | No implementation before S2.PA/S2.PB receipts. |

```text
Sprint 0 ✅
-> Sprint 1 ✅
-> recover content reality
-> S2.PA PRE-SEED
```

---

# SPRINT 1 RECEIPT CHAIN

## S1.PA — Spatial identity primitives

- PR #8 exact head `4a8c3cd2bc18ba7e6537d1c59773a001ff91153d`.
- CI `32756479868`; artifact `9531042977`.
- Governance 6/6, visual 10/10, spatial 7/7 PASS.
- Merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a`.
- Verdict `POC_VALIDATED`.

## S1.PB — Camera + world-state navigation

- PRE-SEED `df222abe4346272c9cefd11c4dba158ed3a3784a`.
- PR #9 exact head `0afbb0937054d6b1abc90d1a9bf22883d26a94e9`.
- CI `32910959682`; job `98004884948`.
- Governance 6/6, visual 10/10, spatial 7/7, world-navigation 10/10 PASS.
- Real Chromium deep-link / Back / Forward / anchor proof PASS.
- Artifact `9586538171`; digest `sha256:4345b1680e0f8cd38ab8f217c380dfe2c2973d44fbf8933a6718dfc7a7fc6880`.
- Merge `ac6848b240f26c6aeb47abfe5afcafaa00f528f9`.
- Verdict `POC_VALIDATED`.

## S1.PC — Adaptive 3D hardening

- PRE-SEED `63d7872aaab61ec27c4a68e21a26892915c9fcd4`.
- PR #10 exact reviewed/merged head `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`.
- Merge-test SHA `4fe495c23bcd35ab416fe4ce63fb5fb96ae54d64`.
- CI `32911942643`; job `98007714197`.
- Governance 6/6, visual 10/10, spatial 7/7, world-navigation 10/10, adaptive-render 13/13 PASS.
- Measured bundle proof PASS:
  - entry 212,108 raw / 66,444 gzip <= 220,000 / 70,000;
  - HeavyWorld 887,708 raw / 233,912 gzip <= 900,000 / 245,000.
- Chromium matrix PASS for full / balanced / low-device lite / Save-Data / reduced-motion / offline / WebGL-unavailable.
- Constrained HeavyWorld request FALSE.
- S1.PB browser navigation regression PASS.
- Desktop/mobile/lite screenshots PASS.
- Artifact `9586826584`; digest `sha256:1faf545b83db8cea2bcea57d60609846721dd5a303a9fa597c6a34a1ccea1000`.
- **Merge SHA:** `a57220f5b4eaeba0d780558377f1b35d9d9fcfa0`.
- Exact-head SHA guard used at merge.
- Verdict `POC_VALIDATED`.

## 2026-08-26T01:46:00+02:00 — SPRINT 1 MERGE RECONCILIATION

- PR #10 merged at exact validated head `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`.
- Merge SHA `a57220f5b4eaeba0d780558377f1b35d9d9fcfa0`.
- No unresolved S1.PA/PB/PC FOC remains inside Sprint 1 bounded scope.
- **Sprint 1 verdict:** `CLOSED / POC_VALIDATED`.

Validated Sprint 1 capability:

```text
original Kopano spatial primitives
+ shared static/WebGL topology
+ browser-addressable district navigation
+ native Back/Forward/deep-link semantics
+ route-aware camera projection
+ adaptive full/balanced/lite admission
+ constrained canonical static fallback
+ WebGL-unavailable recovery
+ measured bundle guardrails
```

---

# SPRINT 2 CONTRACT FROM MASTER ISSUE #3

## S2.PA — Content + provenance contracts

- lesson / article / video / resource schema;
- source ownership / provenance;
- YouTube metadata adapter boundary;
- GLANCE / LEARN / BUILD depth tags;
- publish / update / archive state.

## S2.PB — Editorial Knowledge Stream

- magazine/feed composition;
- feature, short-form, explainer, video, project, event and challenge modules;
- visual hierarchy instead of card-wall repetition;
- responsive/rearranged mobile feed.

## S2.PC — Lesson route + offline learning

- lesson detail route;
- saved/offline surfaces;
- progress state without fake completion;
- search/filter fundamentals;
- weak-network resilience receipts.

Sprint 2 exit: real content can be discovered, consumed and resumed.

---

# CURRENT REQUIRED RECOVERY BEFORE S2.PA PRE-SEED

The current UI contains placeholder copy claiming that a future/legacy “PR2 wires the governed lesson/video data model.” Do not accept that narration as implementation truth. Before S2.PA PRE-SEED:

1. inspect repository content/data surfaces for any real lesson/article/video/resource model;
2. inspect existing placeholders, IDs, ownership/provenance assumptions and third-party names;
3. determine whether any YouTube adapter already exists;
4. determine whether GLANCE / LEARN / BUILD depth is implemented anywhere beyond the S0.PC visual contract;
5. reconcile findings into S2.PA scope rather than inventing migration state.

---

# NAMED HOLDS

- Provider/live domain -> S6.PC.
- Offline update/recovery lifecycle -> later APWA resilience / S6.PB.
- Branch protection not enabled/proven.

---

# GLOBAL INVARIANTS

- Public learning core cannot be login-gated.
- No fake content metrics, completions, affiliations, event attendance, hardware access or provider claims.
- Third-party content ownership/provenance must be explicit; names do not imply endorsement.
- BUILD depth requires an inspectable artefact/proof expectation; self-asserted completion is insufficient.
- Three.js communicates state/navigation/relationships, not decoration.
- Browser navigation state remains authoritative over camera motion.
- Static and WebGL share canonical topology.
- Mobile rearranges; lite/Save-Data are first-class.
- Towers remains reference only; no unlicensed copying.
- Capability graduation remains `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = HOLD, not invention.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
