# Kopano Labs Learning Network

> Education before opportunity. Learn enough to use the systems that are meant to serve you.

This repository is the governed source for a mobile-first **Adaptive PWA (APWA)** that connects learning, building, community and opportunity.

It is broader than an internship portal. Interns are one cohort inside a public learning network intended to surface practical technology education, Kopano Labs learning programmes, YouTube lessons, community activity and evidence-backed pathways into real projects.

## Product lanes

1. **Learn** — practical lessons, workshops and video learning.
2. **Build** — guided projects, labs, challenges and proof-of-work.
3. **Community** — student/developer community activity and events.
4. **Opportunity** — internships, hardware-access programmes, projects and governed progression.

Current ecosystem lanes include Microsoft student/community activity, GDG community building, AWS Builders activity, OpenAI Academy learning and AMD AI learning/hardware-access work. These are represented as governed learning/community lanes and must not imply endorsement beyond evidence that is explicitly published.

## Experience contract

- mobile-first; layouts rearrange rather than merely shrink;
- public core works without login;
- APWA adaptive tiers: `full`, `balanced`, `lite`;
- Save-Data, reduced-motion, device-memory and CPU constraints influence rendering;
- immersive Three.js spatial experience on capable devices;
- useful low-bandwidth fallback on constrained devices;
- offline-capable shell and cached learning surfaces;
- visual-first navigation with minimal text burden;
- POC receipts before claims;
- KPGS governance and `NOW.md` continuity before autonomous work.

## Three.js implementation rule

`RobynAwesome/towers` is a design/interaction reference only. Its repository does not grant reuse or redistribution of its code/artwork. This project independently implements the useful principles: spatial composition, evolving scene state, camera response, progressive reveal, environmental depth and phone-specific rearrangement. Do not copy Towers source or assets.

## Canonical execution routing

README records durable product purpose. **It does not declare the active implementation slice.**

Every stateless renter or agent entering this repository must recover live execution state in this order:

```text
Issue #3 — canonical 7-Sprint × 3-Run program
-> repository-root NOW.md — current temporal state
-> AGENTS.md — renter entry contract
-> governance/EXECUTION_PROTOCOL.md — execution + validation law
-> exact open Issue / PR / CI receipts
```

Do not infer the next PR, Sprint, or Run from historical README prose, prior chat, model memory, or branch names. If those disagree with root `NOW.md`, apply `HOLD_AND_RECONCILE` before material work.

The master program is **Issue #3**. The currently admitted Sprint + Run is always stated in repository-root **`NOW.md`**.

## Capability graduation

```text
Contract
-> Implementation
-> Test
-> Receipt
-> POC
-> Reusable Primitive
```

A merged PR, passing build, or persuasive description is not sufficient on its own to promote a capability beyond the proof actually observed.

## Current-state rule

For current execution status, read **Issue #3 + root `NOW.md`**. README intentionally does not hard-code a “next PR” so it cannot become a stale router.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
