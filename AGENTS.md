# AGENTS.md — Kopano Labs Learning Network

> **Repository:** `RobynAwesome/Kopano-Labs-Interns`
>
> **Master program:** Issue #3 — Canonical Program — Kopano Labs Learning Network APWA
>
> **Current-state authority:** repository-root `NOW.md`
>
> `I_AM_STATELESS_RENTER_NOT_LANDLORD`

## Canonical renter entry order

Every agent, model, tool-driven worker, and stateless renter entering this repository MUST recover current state before acting.

1. Assert `I_AM_STATELESS_RENTER_NOT_LANDLORD` and identify the actor.
2. Read repository-root `README.md` for product purpose.
3. Read master Issue #3 for the durable 7-Sprint / 3-PR-run program.
4. **Read repository-root `NOW.md` completely before execution.** It is the volatile/current-state authority.
5. Read `governance/EXECUTION_PROTOCOL.md` for PRE-SEED / POST-SEED, branch, PR, validation, HOLD, and handoff law.
6. Inspect currently open PRs/issues and recover exact GitHub receipts: base SHA, head SHA, mergeability, checks, errors, and blockers.
7. Recover the single currently admitted Sprint + PR Run from `NOW.md`.
8. If continuity is missing, stale, contradictory, or stronger receipts disagree: resolve to `HOLD_AND_RECONCILE`.
9. PRE-SEED root `NOW.md` before material implementation.
10. Execute only the admitted bounded PR scope.
11. Produce receipts for material claims.
12. POST-SEED root `NOW.md` before handoff, merge, pause, or renter exit.

## Relationship to Introduction-to-MCP

`RobynAwesome/Introduction-to-MCP` is the governance/procedure blueprint for this repository.

Use its durable invariants when applicable, especially:

- stateless-renter continuity;
- root `NOW.md` temporal authority;
- `HOLD` for insufficient/contradictory evidence;
- proof-before-narrative;
- POC/FOC receipt discipline;
- adaptive/offline/mobile constraints;
- capability graduation: `Contract -> Implementation -> Test -> Receipt -> POC -> Reusable Primitive`.

However, **Introduction-to-MCP's active NOW state is not this repository's active task state**. Never context-bleed another repository's current objective into this one.

## Repository product invariants

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

- This is not an intern-management portal; interns are one cohort.
- The product is a public education + build + community + opportunity APWA.
- The experience is a living spatial knowledge network + editorial Knowledge Stream + adaptive mobile application.
- Public learning cannot be login-gated.
- Three.js must communicate state/navigation/information, not decorative theatre.
- Mobile rearranges rather than shrinking desktop layouts.
- Weak-device, Save-Data, reduced-motion, offline and constrained-network paths are first-class.
- No fake metrics, fake affiliations, fake learner outcomes, fake opportunity availability, or fake receipts.
- Microsoft, GDG, AWS, OpenAI Academy, AMD and future ecosystem names require explicit evidence for affiliation/availability claims.
- Towers is a behavioural/design reference only. Do not copy unlicensed source/artwork.

## Sprint execution invariant

Every Sprint has exactly three bounded sequential PR Runs:

```text
Run A = CONTRACT / STRUCTURE
Run B = EXPERIENCE / IMPLEMENTATION
Run C = VALIDATION / HARDENING / RECEIPTS
```

Do not silently skip a run, merge future Sprint work into the current run, or start the next Sprint without a predecessor receipt or explicit HOLD.

## Proof law

Chat narration is never sufficient proof.

A claim should resolve through receipts such as:

- exact commit SHA;
- PR number + exact reviewed head;
- CI/workflow run ID;
- deterministic test output;
- mobile/desktop screenshot or preview URL;
- live-domain result;
- telemetry;
- documented blocker/error.

If proof cannot be established, say `UNKNOWN`, `BLOCKED`, or `HOLD`.

## Handoff law

Before leaving the repository after material work, the renter MUST update root `NOW.md` with:

- status;
- actor/validator;
- what changed;
- exact location;
- why it matters;
- evidence/receipts;
- errors/uncertainty;
- POC/FOC verdict;
- exact next admissible action.

No future renter should have to infer what the previous renter intended.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
