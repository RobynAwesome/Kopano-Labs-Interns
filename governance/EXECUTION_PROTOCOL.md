# Execution Protocol — Kopano Labs Learning Network APWA

> **Master issue:** #3
>
> **Temporal authority:** repository-root `NOW.md`
>
> **Blueprint:** `RobynAwesome/Introduction-to-MCP`
>
> `I_AM_STATELESS_RENTER_NOT_LANDLORD`

## Purpose

This file converts the program in Issue #3 into a repeatable operating protocol for stateless renters.

It exists to preserve continuity, bounded scope, proof, and visual/product intent across sessions and models.

---

## 1. State model

This repository separates durable doctrine from volatile state:

```text
README.md                      = product purpose
Issue #3                       = durable program / sprint map
AGENTS.md                      = renter entry surface
EXECUTION_PROTOCOL.md          = execution law
NOW.md                         = volatile current-state authority
GitHub issues / PRs / CI       = evidence + receipts
```

No conversation, model memory, or external repository NOW file replaces this repository's root `NOW.md`.

---

## 2. Admitted transition law

Before acting, determine the currently admissible transition from:

```text
current repo state
+ currently knowable evidence
+ program invariants
-> EXECUTE | HOLD | RECONCILE
```

Use `HOLD_AND_RECONCILE` when:

- `NOW.md` contradicts GitHub receipts;
- an expected predecessor PR is unmerged/unknown;
- required CI/runtime evidence is absent;
- authority or scope is ambiguous;
- a requested change crosses Sprint/Run boundaries without explicit admission;
- live/provider/partner state is being inferred rather than witnessed.

`HOLD` is a valid governance result, not failure.

---

## 3. Sprint topology

Every Sprint contains exactly three bounded sequential PR Runs:

```text
A — Contract / Structure
B — Experience / Implementation
C — Validation / Hardening / Receipts
```

Default rule:

```text
A receipt -> B seed
B receipt -> C seed
C receipt -> Sprint close
Sprint close -> next Sprint A seed
```

Parallel PRs are forbidden by default when they touch the same product state. An exception must be explicitly documented in `NOW.md`, including conflict/merge strategy.

---

## 4. Session PRE-SEED

A PRE-SEED is required **before material implementation**.

Minimum root `NOW.md` entry:

```text
## [YYYY-MM-DDTHH:MM:SS+02:00] — PRE-SEED — SPRINT [N] / RUN [A|B|C]
- Status: IN-PROGRESS
- Actor: ...
- Master issue: #3
- Sprint objective: ...
- PR-run objective: ...
- Base branch: main
- Exact base SHA: ...
- Intended branch: sprint-NN/run-x-slug
- Predecessor receipt(s): ...
- Scope IN: ...
- Scope OUT: ...
- Governing invariants: ...
- Known blockers / uncertainty: ...
- Planned validation: ...
- HOLD / rollback condition: ...
- Next admissible action: ...
```

### PRE-SEED rules

- Use an exact base SHA, not `latest main` prose.
- Scope OUT is mandatory; it protects the next PR Run.
- If no predecessor receipt exists, do not invent one.
- If the branch already existed before seed, disclose that fact.
- For legacy work predating this protocol, create a **reconciliation seed**, not a fake historical seed.

---

## 5. Implementation discipline

During a PR Run:

1. Keep edits bounded to the admitted scope.
2. Do not silently redesign future Sprint contracts.
3. Capture failures as evidence.
4. Prefer deterministic tests over visual narration where possible.
5. For visual work, capture desktop + mobile + reduced-motion / lite-mode evidence appropriate to the change.
6. For APWA work, distinguish:
   - source exists;
   - build succeeds;
   - runtime succeeds;
   - offline/adaptive behavior succeeds;
   - deployed/live behavior succeeds.
7. Do not collapse those proof levels into one claim.

---

## 6. Session POST-SEED

A POST-SEED is required before handoff, pause, merge request, or renter exit after material work.

Minimum root `NOW.md` entry:

```text
## [YYYY-MM-DDTHH:MM:SS+02:00] — POST-SEED — SPRINT [N] / RUN [A|B|C]
- Status: DONE | BLOCKED | PAUSED
- Actor / validator: ...
- Branch: ...
- Exact reviewed head SHA: ...
- PR: #...
- Changed files / bounded delta: ...
- Validation receipts: ...
- Errors / FOC discovered: ...
- POC/FOC verdict: ...
- Merge state: ...
- Merge SHA: ... | NOT YET MERGED
- Residual uncertainty: ...
- Next admissible action: ...
```

### If merged after handoff

The next renter must first append a reconciliation receipt to `NOW.md`:

```text
PR #...
exact merged head
merge SHA
checks/run IDs
merge method if relevant
post-merge regression state
```

Only then may the next PR Run begin.

---

## 7. POC / FOC vocabulary

Use only grounded verdicts:

- `POC_VALIDATED` — the bounded claim has sufficient receipts.
- `POC_IMPLEMENTED_NOT_VALIDATED` — implementation exists but runtime/test/field proof is incomplete.
- `FOC_FLAGGED` — implementation or process contradicts the product/governance contract.
- `BLOCKED` — required dependency/authority/tool/evidence is unavailable.
- `UNKNOWN` — evidence is insufficient to classify.

Do not promote `POC_IMPLEMENTED_NOT_VALIDATED` into `POC_VALIDATED` because a PR is mergeable.

---

## 8. PR body contract

Every new Sprint PR should contain:

```text
Master: #3
Sprint: N
Run: A | B | C
PRE-SEED: NOW.md timestamp / commit

Objective
Scope IN
Scope OUT
Dependencies
Acceptance criteria
Validation receipts
Known uncertainty
POC/FOC verdict
POST-SEED: NOW.md timestamp / commit
```

Before merge, use the exact reviewed head SHA in the receipt. If the head changes, re-review/revalidate the changed head.

---

## 9. Visual execution contract

The target experience is:

```text
living spatial Kopano knowledge network
+ high-energy editorial Knowledge Stream
+ adaptive mobile application
```

### Three.js law

Three.js/R3F must encode useful product state, such as:

- learning districts;
- routes;
- progression;
- active context;
- transitions;
- system status;
- navigable relationships.

Decorative motion alone is not sufficient implementation.

### Mobile law

Mobile should rearrange composition for touch and constrained viewports rather than compressing desktop composition.

### Content-depth law

```text
GLANCE = seconds / orientation / short-form
LEARN  = minutes / lesson / explainer
BUILD  = practical proof / project / challenge
```

### Colour/state law

Colour should increasingly communicate system meaning rather than arbitrary decoration. Current direction:

- warm orange/yellow: entry / knowledge / proof;
- green: growth / community / positive availability;
- cyan/blue: systems / technology / navigation;
- violet: advanced AI / experimentation;
- coral/red: warning / blocked / unresolved.

Exact tokens are locked in Sprint 0 Run C, not presumed complete here.

---

## 10. Evidence hierarchy

Prefer stronger evidence when sources disagree:

```text
live/runtime/test receipt
> exact Git commit / PR state
> repository file
> durable issue/spec
> screenshots / prior chat
> model memory / inference
```

A screenshot may prove appearance. It does not prove source state, CI, deployment ownership, affiliation, or provider availability by itself.

---

## 11. Introduction-to-MCP inheritance boundary

This repo inherits applicable governance patterns, not unrelated implementation state.

Adopt:

- stateless renter continuity;
- root NOW authority;
- explicit HOLD;
- evidence-before-claim;
- POC/FOC classification;
- weak-device/offline/adaptive constraints;
- capability graduation discipline.

Do not automatically import:

- another repo's active objective;
- another repo's branch/PR numbering;
- another repo's domain/provider state;
- historical actors/tasks as current assignments;
- code primitives that have not been evaluated for this repo.

---

## 12. Bootstrap exception

Issue #3 and this governance layer were created after PR #2 was already open.

Therefore PR #2 is admitted as a legacy-active run under Sprint 0 Run A, but it must be reconciled from real GitHub receipts before merge.

After this bootstrap, new work must follow PRE-SEED / POST-SEED strictly unless root `NOW.md` records a specific exception.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
