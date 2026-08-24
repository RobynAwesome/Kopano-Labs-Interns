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

## Build sequence

```text
PR0  Repository + product truth lock
PR1  Runnable APWA foundation + adaptive Three.js learning world
PR2  Learning/video data model + public lesson surfaces
PR3  Community/event lanes (GDG / AWS / Microsoft / Academy)
PR4  Build labs + proof receipts + project progression
PR5  Opportunity/hardware access + governed applications
PRx  Adapt from measured user behaviour and evidence
```

## Status

Repository initialized 2026-08-24 SAST. PR1 is the next active implementation slice.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
