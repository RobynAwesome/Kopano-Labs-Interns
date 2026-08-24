# Kopano Labs Learning Network — Visual System Truth Lock

> **Master:** Issue #3
>
> **Run:** S0.PC
>
> **Machine contract:** `governance/visual-system/visual-system.contract.json`
>
> **Temporal authority:** repository-root `NOW.md`
>
> `I_AM_STATELESS_RENTER_NOT_LANDLORD`

## Purpose

This specification turns the current validated APWA visual direction into a durable contract.

It is not a redesign PR. It defines how future visual implementation is judged.

The target experience is:

```text
living spatial Kopano knowledge network
+ editorial Knowledge Stream
+ adaptive mobile application
```

The governing user journey remains:

```text
LEARN -> BUILD -> COMMUNITY -> OPPORTUNITY
```

A future visual change can look attractive and still be `FOC_FLAGGED` if it contradicts this contract.

---

## 1. Current POC anchors

S0.PC does not invent a new aesthetic disconnected from the validated foundation. It formalizes the vocabulary already present in the runnable APWA:

- dark evergreen canvas: `#08130f`;
- surface field: `#0a1712`;
- high-contrast primary text: `#f7fff9`;
- muted informational text: `#a7beb3`;
- Learn / knowledge gold: `#ffce32`;
- Build coral: `#ff6b6b`;
- Community cyan: `#7dd3fc`;
- Opportunity / growth mint: `#a7f3d0`;
- oversized rounded/editorial display type;
- four-node spatial learning world;
- fixed contextual top bar;
- desktop lane rail and thumb-reachable mobile dock;
- adaptive `full`, `balanced`, `lite` rendering.

These values are a truth lock for direction, not a claim that every future component must use every token.

---

## 2. Colour law: lane identity != system status

Colour carries two different kinds of meaning:

1. **Lane identity** — where the user is in the learning network.
2. **System status** — what state the system/object is in.

They must not be conflated.

### Lane accents

| Lane | Accent | Meaning |
|---|---|---|
| Learn | `#ffce32` | entry, knowledge, orientation |
| Build | `#ff6b6b` | making, challenge, proof work |
| Community | `#7dd3fc` | people, connection, shared navigation |
| Opportunity | `#a7f3d0` | growth, availability, forward movement |

### Semantic states

| State | Token direction | Meaning |
|---|---|---|
| knowledge | gold | information/proof emphasis |
| positive | mint | valid/available/successful state |
| navigation | cyan | systems/navigation/context |
| warning | coral | blocked/unresolved/risk |
| experiment | violet | advanced AI/experimental state |

### Precedence

When lane identity and status coexist:

```text
system status
> interaction state
> lane accent
> decoration
```

Example: a blocked Build item may already live in a coral district. The user still needs a non-colour cue such as a `Blocked` label, icon, shape, pattern or position change. Colour alone is never sufficient evidence of status.

---

## 3. Spatial network grammar

Three.js/R3F is an information layer, not a screensaver.

Allowed primitive vocabulary:

### Node

Represents a selectable capability, content object or governed state.

A node needs an interpretable identity. Size, glow or motion may reinforce meaning, but must not be the only way meaning is conveyed.

### Route

Represents a meaningful relationship or navigable transition.

Routes may express:

- prerequisite relationships;
- progression;
- current path;
- cross-lane connection;
- return path.

A random connecting line is not automatically a route.

### Beacon

Signals priority, availability or active context.

A beacon must remain understandable under reduced motion and static fallback.

### District

Groups related capabilities, content or programme lanes with a stable navigation identity.

Districts should help users orient, not merely divide the scene aesthetically.

### Progression

Represents evidence-backed movement.

Never fabricate completion or capability because a user visited a scene.

### Mandatory Three.js information value

A spatial implementation must encode at least one of:

- navigation;
- relationship;
- progression;
- active context;
- system status.

Decorative particle fields, cinematic camera motion or floating geometry do not satisfy the contract by themselves.

### Static/lite equivalence

The non-WebGL path must preserve:

- lane identity;
- active context;
- route relationships;
- primary navigation.

The fallback can be visually simpler without becoming semantically empty.

---

## 4. Editorial Knowledge Stream grammar

The Knowledge Stream must feel editorial and alive, not like a repeated SaaS card grid.

Canonical module types:

- feature;
- short-form;
- explainer;
- video;
- project;
- event;
- challenge.

### Hierarchy

Use a deliberate mix of:

- feature-scale anchors;
- compact utility/status modules;
- proof/provenance modules;
- media-led modules where media adds information.

### Rhythm

Vary scale, density, orientation and media treatment. Repetition is valid when the content model requires it, but repeated identical cards must not become the default visual grammar.

### Copy

Prefer orientation and action over institutional prose.

A user should be able to answer quickly:

- What is this?
- Why does it matter?
- What can I do next?
- What evidence supports this claim?

### Proof adjacency

Affiliation, availability, completion and opportunity claims keep provenance/receipt context close enough that the interface does not visually imply more certainty than the data supports.

---

## 5. Content-depth contract

Every learning surface must know which depth it serves.

### GLANCE

```text
seconds
-> orient
-> choose next action
```

Appropriate forms:

- headline;
- status;
- short-form;
- preview;
- beacon.

GLANCE must minimize cognitive load and expose a clear next action.

### LEARN

```text
minutes
-> understand
-> resume
-> apply
```

Appropriate forms:

- lesson;
- explainer;
- video;
- workshop;
- article.

LEARN requires usable explanation plus source/provenance and resume context where relevant.

### BUILD

```text
practical work
-> produce artefact
-> validate
-> receipt
```

Appropriate forms:

- project;
- lab;
- challenge;
- submission.

BUILD must define:

- expected artefact;
- acceptance condition;
- receipt path.

A page cannot claim BUILD depth merely because it contains a button labelled “Build”.

---

## 6. Composition law

### Desktop > 900 px

Desktop may place spatial context and editorial copy side-by-side.

It may use asymmetry, negative space and oversized display type, provided:

- context controls remain discoverable;
- primary content is not covered;
- interaction does not require precision beyond normal pointer/keyboard use.

### Intermediate 701–900 px

Layouts collapse intentionally rather than squeezing columns until they become unreadable.

The primary action remains usable by touch.

### Mobile <= 700 px

**Rearrange, do not shrink.**

Required behavior:

- primary navigation becomes thumb-reachable;
- minimum core target size is 44 px;
- hero prioritizes headline, active context and primary action;
- redundant spatial annotation may disappear;
- no core task depends on horizontal text layouts;
- fixed UI must respect safe-area/bottom navigation space.

The validated lite-mobile overlap from S0.PA is a standing example: automatic runtime success is not sufficient when visual composition collides.

---

## 7. Adaptive visual law

### Full

- WebGL allowed;
- richer motion allowed when purposeful;
- navigation semantics, browser history and accessibility remain authoritative.

### Balanced

- WebGL allowed;
- bounded motion;
- preserve the same navigation and state semantics.

### Lite

- WebGL forbidden for the core path;
- static-first/minimal motion;
- preserve lane identity, active context, primary navigation and content access.

### Reduced motion

Reduced-motion users receive `lite` or an equivalent static experience. Motion-only meaning is forbidden.

### Save-Data

- heavy spatial chunk is not required;
- media autoplay is forbidden;
- decorative media may be omitted.

---

## 8. Typography law

The current character is rounded/editorial for large display moments and plain/readable for body/proof text.

### Display

Use short line lengths, strong hierarchy and expressive scale. Typography must not become a substitute for navigation clarity.

Canonical fallback direction:

```text
ui-rounded
-> SF Pro Rounded where available
-> Inter
-> system-ui
-> sans-serif
```

### Body

Use readable system/Inter-like sans-serif typography with sufficient contrast and line height for instructions, provenance and learning copy.

### Licensing

No production font is admitted solely because it appeared in a reference image. Use system fallbacks or a font with explicit production rights.

---

## 9. Asset provenance law

Allowed production provenance classes:

- repository-owned original;
- explicitly licensed;
- public domain;
- documented partner-provided.

Every admitted external production asset needs metadata for:

- source;
- owner;
- licence;
- alt strategy;
- performance budget.

### Explicit prohibitions

- User-supplied inspiration/reference images are **direction**, not automatic production licences.
- `RobynAwesome/towers` remains an interaction/design study only; copying its source or artwork is forbidden without separate rights.
- External media must not silently enter the product because it “looks right”.

Lite mode may drop decorative assets while preserving information and navigation.

---

## 10. Accessibility law

- Status always has a non-colour cue.
- Motion-only meaning is forbidden.
- Core navigation must remain keyboard-operable.
- Critical normal text contrast target: >= 4.5:1.
- Large display/accent contrast target: >= 3:1.
- Reduced motion must remain semantically complete.
- Accessibility cannot be postponed until launch if a visual primitive makes later remediation structurally expensive.

---

## 11. Future visual PR gate

A future visual PR should identify which contract areas it touches and prove the relevant behavior.

Minimum visual POC path:

```text
Contract
-> Implementation
-> Desktop receipt
-> Mobile receipt
-> Lite/reduced-motion receipt where applicable
-> POC
```

A green build does not erase visual FOC.

A screenshot does not prove provenance, source state, CI, deployment, affiliation or data truth.

---

## 12. S0.PC boundary

This run does **not** implement the new spatial identity.

It does not edit `src/` product visual code.

Sprint 1 owns:

- original node/route/beacon/district/progression geometry;
- route-aware camera/navigation;
- browser-history integration;
- adaptive 3D hardening.

S0.PC closes only when this specification and its machine contract are validated and receipted.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
