# Kopano Labs Learning Network — Content + Provenance Contract

> **Run:** S2.PA  
> **Machine authority:** `src/content/content-contract.js`  
> **External video boundary:** `src/content/youtube-reference.js`  
> **Temporal authority:** root `NOW.md`

This specification governs content **before** the Editorial Knowledge Stream, lesson routes, offline state or live providers are connected.

The repository currently has no real lesson feed to migrate. S2.PA therefore establishes the admission law that future content must satisfy.

## 1. Core law

```text
external metadata != admitted content
provider/channel name != partnership
content publication != content ownership
BUILD tag != completion
published -> verified provenance
archived -> archive timestamp + reason
```

No model, renter or UI may promote a content object beyond the evidence attached to it.

## 2. Canonical learning content types

S2.PA admits four learning-content types:

- `lesson`
- `article`
- `video`
- `resource`

This is not the complete future editorial-module vocabulary. Project/event/challenge composition belongs to later runs. The S2.PA contract is the learning-content substrate.

Every valid content item has:

- stable lowercase `id`;
- canonical `type`;
- `depth`;
- concise `title` and `summary`;
- `access: public` for the public learning core;
- provenance;
- lifecycle state;
- depth-specific metadata;
- type-specific reference metadata where required.

## 3. Depth is an obligation, not decoration

### GLANCE

Purpose: orient in seconds.

Required contract:

- `depthMeta.nextAction`

A GLANCE item cannot be a dead teaser. The next useful action must be explicit.

### LEARN

Purpose: understand in minutes.

Required contract:

- `depthMeta.learningObjective`
- `depthMeta.resumeStrategy`
- provenance is always attached at item level

Resume strategy is metadata only in S2.PA. Actual saved/offline resume implementation belongs to S2.PC.

### BUILD

Purpose: transition learning into inspectable work.

A BUILD-tagged learning item does **not** mean the learner completed anything. It means the content contains or routes into an explicit build transition.

Required contract:

```text
expectedArtifact
acceptanceCondition
receiptPath
completionAuthority = receipt-required
```

This preserves the S0.PC rule that BUILD must lead to an expected artefact, acceptance condition and receipt path. The actual build workspace/review system belongs to Sprint 4.

## 4. Provenance and ownership

Every content item carries an explicit source relationship:

| Relationship | Meaning | Required rights assertion |
|---|---|---|
| `repository-owned` | Kopano-owned/original repository content | `owned` |
| `explicitly-licensed` | External content with explicit reuse licence | `licensed` |
| `public-domain` | Public-domain source | `public-domain` |
| `documented-partner-provided` | Material supplied under documented relationship | `partner-provided` |
| `external-reference` | Link/reference to third-party material; rights are not claimed | `reference-only` |

### Important distinction

A provider/channel/company name is **identity metadata**, not relationship evidence.

For example, a YouTube channel title does not prove:

- endorsement;
- partnership;
- ownership by Kopano Labs;
- redistribution rights;
- permission to reuse thumbnails/artwork.

`documented-partner-provided` requires a separate HTTPS `evidenceUrl`.

## 5. Rights fields

Provenance records include:

- stable `sourceId`;
- explicit `owner`;
- canonical HTTPS source URL for external sources;
- `relationship`;
- rights assertion;
- licence text/id where a licence is actually asserted;
- attribution requirement + text;
- `verifiedAt` when provenance has been checked;
- partner evidence URL only when applicable.

An `external-reference` deliberately carries `license: null`. Unknown rights are not converted into a fake licence string.

## 6. Publication lifecycle

### `draft`

- may still have unverified provenance;
- cannot claim `publishedAt`;
- cannot claim archive state.

### `published`

Requires:

- `publishedAt`;
- valid timestamp ordering;
- `provenance.verifiedAt`;
- all depth/type obligations.

A passing UI render is not publication proof.

### `archived`

Requires:

- `archivedAt`;
- explicit `archiveReason`;
- valid timestamp ordering.

Archived content is not silently deleted from governance history.

## 7. Forbidden unsupported claims

The S2.PA content object rejects unsupported metric/completion/relationship keys such as:

- views / view counts;
- completion / completion rate;
- endorsement;
- partnership / partner claim.

Later systems may introduce evidence-backed metrics under their own governed schema. They are not admitted implicitly here.

## 8. YouTube metadata boundary

`adaptYouTubeReference()` is deliberately **not** a publishing function.

It normalizes only:

- canonical 11-character video id;
- channel id + channel title;
- title + description;
- source publication timestamp;
- canonical YouTube watch URL;
- reference-only provenance;
- external thumbnail candidates.

It intentionally ignores raw fields such as statistics or content duration for S2.PA, even if they appear in an upstream payload.

It does **not** assign:

- GLANCE / LEARN / BUILD depth;
- lifecycle state;
- Kopano ownership;
- partnership;
- endorsement;
- view counts;
- completion state;
- redistribution licence.

The adapter emits thumbnails with `admissionState: unadmitted`. A future editorial surface must not render those as governed production assets until asset provenance/licence/accessibility/performance admission occurs.

## 9. Type-specific rules

### Video

A validated video content item needs a `media` reference with:

- provider;
- external id;
- canonical HTTPS URL;
- `admissionState: unadmitted` in S2.PA.

S2.PA proves metadata shape, not media production admission.

### Resource

A resource item needs:

- public relative or HTTPS `href`;
- explicit `format`.

## 10. No fake fixtures in production

Contract tests may use synthetic fixtures such as `https://source.invalid/...` solely to attack validation behavior.

Those fixtures are test data and must never be surfaced as learner content, publication receipts or provider evidence.

## 11. Run boundary

S2.PA proves:

```text
Contract
-> Validator
-> Malformed-state rejection
-> External-metadata boundary
-> Receipt
```

It does **not** implement:

- a live YouTube/API feed;
- the editorial Knowledge Stream;
- real content publication;
- thumbnails/media admission;
- saved/offline lessons;
- learner completion;
- search/filter;
- build submissions.

Those remain later bounded runs.

`I_AM_STATELESS_RENTER_NOT_LANDLORD`
