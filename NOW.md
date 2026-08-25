# NOW.md — Kopano Labs Learning Network

> **Current-state authority:** repository-root `NOW.md`
>
> **Updated:** 2026-08-26T01:48:00+02:00 (SAST)
>
> **Master program:** Issue #3 — `Canonical Program — Kopano Labs Learning Network APWA (7 Sprints × 3 PR Runs)`
>
> **Constraint:** `I_AM_STATELESS_RENTER_NOT_LANDLORD`

---

# CURRENT STATE

## Current objective

Execute **Sprint 2 / Run A (S2.PA) — Content + provenance contracts**. Establish the machine-testable learning-content spine before any editorial feed or lesson-route experience is implemented.

| Run | State | Canonical truth |
|---|---|---|
| **Sprint 0** | **CLOSED / POC_VALIDATED** | Foundation + governance + visual truth lock complete. |
| **Sprint 1** | **CLOSED / POC_VALIDATED** | Spatial identity + browser navigation + adaptive 3D hardening complete. |
| **S2.PA — Content + provenance contracts** | **ACTIVE / PRE-SEEDED** | Define content types, provenance, YouTube reference adapter boundary, GLANCE/LEARN/BUILD depth obligations and lifecycle law. |
| **S2.PB — Editorial Knowledge Stream** | **QUEUED** | No feed implementation before S2.PA merge receipt. |
| **S2.PC — Lesson route + offline learning** | **QUEUED** | No route/offline/progress implementation before prior receipts. |

---

# SPRINT 1 CLOSE RECEIPT

- S1.PA PR #8 merge `701dec2b37fd7eb8f1c925ae35150aba1342a45a` — `POC_VALIDATED`.
- S1.PB PR #9 merge `ac6848b240f26c6aeb47abfe5afcafaa00f528f9` — `POC_VALIDATED`.
- S1.PC PR #10 exact head `65d3d9cc9fcb0ee2487d3b9e7505bdd09aed6463`; merge `a57220f5b4eaeba0d780558377f1b35d9d9fcfa0`; CI `32911942643`; artifact `9586826584`; `POC_VALIDATED`.
- Sprint 1 reconciliation commit immediately before this PRE-SEED: `6d577581d82f402bcf78085fdbd27c5ceb66a9ab`.
- **Sprint 1:** CLOSED / POC_VALIDATED.

---

# CONTENT REALITY RECOVERY — BEFORE S2.PA

Exact repository inspection on current `main` established:

1. `src/data/` contains only `lanes.js`; there is **no lesson/article/video/resource data model**.
2. There is **no YouTube metadata adapter**, API client, key, feed, or normalized video source model.
3. `GLANCE / LEARN / BUILD` currently exists as a **governed visual/content-depth contract only** in `governance/visual-system/visual-system.contract.json`; it is not yet attached to runtime content objects.
4. The visual contract already requires:
   - GLANCE -> clear next action + minimal cognitive load;
   - LEARN -> source/provenance + resume context + usable explanation;
   - BUILD -> expected artefact + acceptance condition + receipt path.
5. The current watch surface still says “PR2 wires the governed lesson/video data model.” That is stale narration; no such model exists on `main` today.
6. Third-party ecosystem names exist as governed lanes only; there are no content-level ownership/provenance records to inherit.
7. Therefore S2.PA is a **greenfield governed contract**, not a migration, and must not fabricate example lessons, view counts, completions, partner ownership or publication receipts.

---

# 2026-08-26T01:48:00+02:00 — PRE-SEED — SPRINT 2 / RUN A

- **Status:** IN-PROGRESS.
- **Actor:** DPF/Forge stateless renter.
- **Master issue:** #3.
- **Sprint objective:** create the content/provenance substrate required for the editorial Knowledge Stream and later offline lesson routes.
- **PR-run objective:** define and enforce content identity, type, depth obligations, source ownership/provenance, external-media admission boundaries, YouTube metadata normalization and publish/update/archive lifecycle without connecting a live feed.
- **Base branch:** `main`.
- **Exact base before this PRE-SEED commit:** `6d577581d82f402bcf78085fdbd27c5ceb66a9ab`.
- **Intended branch:** `sprint-02/run-a-content-provenance-contracts`.
- **Dependencies:** S0.PC visual/content-depth contract; master Issue #3; public-core/no-fake-claims invariants.

## Scope IN

1. canonical learning content types: `lesson`, `article`, `video`, `resource`;
2. canonical content-depth tags: `GLANCE`, `LEARN`, `BUILD`;
3. stable content identity + title/summary + public access contract;
4. depth-specific obligations:
   - GLANCE requires a clear next action;
   - LEARN requires learning objective + provenance + resume strategy metadata;
   - BUILD-tagged learning content must carry an explicit build transition with expected artefact, acceptance condition and receipt path; the tag cannot fabricate completion;
5. source/provenance model separating ownership/relationship from endorsement:
   - first-party owned;
   - explicitly licensed;
   - public-domain;
   - documented partner-provided;
   - external reference-only;
6. provenance fields for source identity, owner, canonical source URL where external, rights/relationship state, licence/rights assertion, attribution and verification timestamp;
7. prohibit partner/endorsement inference from provider/channel names alone;
8. YouTube metadata **adapter boundary only**:
   - normalize video id/title/description/channel/published timestamp/canonical watch URL;
   - expose external thumbnail candidates only as `unadmitted` media metadata;
   - never infer views, duration, completion, rights ownership, Kopano partnership or content depth;
   - adapter output is not automatically publishable content;
9. lifecycle states `draft`, `published`, `archived` with created/updated/published/archived timestamp law and archive reason;
10. machine validator/assertion functions and deterministic malformed-state rejection tests;
11. human governance specification explaining authoring/admission semantics;
12. correct the stale watch-surface “PR2 wires…” narration to state the real boundary after contracts exist while leaving the feed explicitly unconnected;
13. add dependency-free content-contract tests to CI before dependency installation;
14. preserve all Sprint 0/1 governance/visual/spatial/navigation/adaptive/build/browser receipts.

## Scope OUT

- no real lesson/article/video/resource publication in this run;
- no YouTube API key, API request, live channel/feed connection or scraping;
- no thumbnail/media production admission;
- no editorial Knowledge Stream layout/modules — S2.PB;
- no lesson detail route, saved/offline state, completion/progress or search/filter — S2.PC;
- no community/event model — Sprint 3;
- no Build workspace/submission system — Sprint 4;
- no provider deployment/live-domain work;
- no unsupported partner/endorsement claims.

## Core design law

```text
external metadata != admitted content
provider/channel name != partnership
content publication != content ownership
BUILD tag != completion
BUILD tag -> expected artefact + acceptance condition + receipt path
published -> provenance validated
archived -> explicit archive timestamp + reason
```

## Planned validation

- canonical content type/depth/lifecycle vocabulary tests;
- valid first-party and external-reference content examples only as synthetic test fixtures;
- reject unknown content type/depth/state;
- reject missing/invalid stable identity, title, summary and public-access state;
- reject LEARN without learning objective/resume/provenance;
- reject BUILD without expected artefact/acceptance/receipt path;
- reject any self-asserted completion field in content contract;
- reject published content without publish timestamp or verified provenance;
- reject archived content without archive timestamp/reason;
- reject impossible timestamp ordering;
- reject external reference without canonical HTTPS URL + owner;
- reject documented partner-provided provenance without evidence URL;
- YouTube adapter valid-id normalization tests;
- reject malformed/missing YouTube video id/channel metadata;
- prove YouTube adapter does not emit metrics, depth, partnership or rights ownership claims;
- prove thumbnail candidates remain `unadmitted`;
- existing governance/visual/spatial/world-navigation/adaptive tests remain green;
- production build/browser/mobile/lite regression proof remains green;
- exact-head CI artifact and manual screenshot inspection before merge.

## HOLD / rollback conditions

- content model implies ownership or endorsement from a third-party name alone;
- published state can exist without provenance verification;
- BUILD can exist without proof expectations;
- YouTube adapter fabricates views/duration/licence/depth/partnership;
- external thumbnails become production assets merely by normalization;
- real feed/UI implementation leaks into S2.PA;
- any Sprint 0/1 gate regresses.

- **Next admissible action:** create `sprint-02/run-a-content-provenance-contracts` from this PRE-SEED commit and implement only S2.PA.

---

# SPRINT 2 MASTER CONTRACT

## S2.PA — Content + provenance contracts
- lesson/article/video/resource schema;
- source ownership/provenance;
- YouTube metadata adapter boundary;
- GLANCE/LEARN/BUILD depth tags;
- publish/update/archive state.

## S2.PB — Editorial Knowledge Stream
- magazine/feed composition;
- feature/short-form/explainer/video/project/event/challenge modules;
- visual hierarchy, not card-wall repetition;
- responsive mobile rearrangement.

## S2.PC — Lesson route + offline learning
- lesson detail route;
- saved/offline surfaces;
- progress without fake completion;
- search/filter fundamentals;
- weak-network resilience receipts.

---

# GLOBAL INVARIANTS

- Public learning core cannot be login-gated.
- No fake content metrics, completions, affiliations, event attendance, hardware access or provider claims.
- Third-party content ownership/provenance must be explicit; names do not imply endorsement.
- BUILD depth requires an inspectable artefact/proof expectation; self-asserted completion is insufficient.
- External media requires separate production admission; metadata normalization is not a licence.
- Three.js communicates state/navigation/relationships, not decoration.
- Browser navigation state remains authoritative over camera motion.
- Static and WebGL share canonical topology.
- Mobile rearranges; lite/Save-Data are first-class.
- Towers remains reference only; no unlicensed copying.
- Capability graduation remains `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.
- Missing authority/evidence/continuity = HOLD, not invention.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
