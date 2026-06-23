---
title: miku-indexgen front matter specification
topics:
  - miku-indexgen
  - front-matter
  - yaml
  - metadata
  - sources
---

# miku-indexgen Front Matter Specification

This document records Markdown front matter support in `miku-indexgen`.

The goal is to respect standard YAML authoring while keeping the generated
`index.json` contract compact, predictable, and useful for agent workflows.

## Design Policy

Markdown front matter should be parsed as YAML.

`miku-indexgen` should extract only documented metadata fields into
`index.json`. Unknown fields and unsupported value shapes should be ignored and
should not be copied into `index.json`.

This allows authors to write ordinary YAML front matter without making
`miku-indexgen` behave like a general-purpose YAML indexing engine.

Recommended policy:

- parse Markdown front matter as YAML
- extract only documented metadata fields into `index.json`
- prefer top-level scalar and string-array fields
- allow explicitly documented structured fields when they carry important
  metadata that would be lossy as plain strings
- ignore unknown top-level fields
- ignore unsupported value shapes for documented fields
- do not mirror arbitrary nested objects into `index.json`

## YAML Authoring Rules

YAML indentation in front matter should use spaces. Tab characters in
indentation are not supported and may cause Markdown preview or YAML parsers to
reject the document.

Use YAML's ordinary forms for scalar and array fields:

```yaml
title: Runtime operations map
topics:
  - miku-indexgen
  - runtime
  - command-line
```

Inline arrays are acceptable when they stay readable:

```yaml
topics: [miku-indexgen, runtime, command-line]
```

Folded strings are acceptable for fields such as `description`:

```yaml
description: >
  CLI runtime selection, command examples, and backend policy for miku-indexgen.
```

## Core Metadata Fields

The core metadata fields should be enough for agents to decide which files are
worth reading in full.

Candidate fields:

- `title`: human-readable document title
- `description`: short, explicit description written by the author
- `topics`: practical search and grouping terms
- `category`: document kind, such as `reference`, `guide`, `workflow`,
  `example`, `template`, or `spec`
- `status`: document state, such as `draft`, `stable`, or `deprecated`
- `audience`: intended readers, such as `agent`, `user`, `maintainer`, or
  `developer`
- `created`: date when the document was first created
- `updated`: date when the document content was materially updated
- `sources`: primary inputs used to create or materially update the document

Generated index text is sanitized before it is written. Unicode is normalized
to NFC, control characters and zero-width formatting characters are converted
to spaces, whitespace runs are collapsed, and leading/trailing whitespace is
trimmed.

The bundled runtimes cap `description` at 256 UTF-16 code units. Longer
descriptions are shortened to 253 code units plus `...` in generated
`index.json`.

Example:

```markdown
---
title: Runtime operations map
description: >
  CLI runtime selection, command examples, and backend policy for miku-indexgen.
topics:
  - miku-indexgen
  - runtime
  - command-line
category: reference
status: stable
audience:
  - agent
  - maintainer
created: 2026-05-22
updated: 2026-05-22
---
```

## Date Metadata

Use `created` and `updated` instead of a generic `date` field because their
meanings are explicit.

- `created`: the date when the document was first created; normally stable
- `updated`: the date when the document content was materially updated

Use `YYYY-MM-DD` for both fields. Treat these as date-only values without a
time zone.

Do not update `updated` for purely mechanical changes such as regenerating
`index.json`.

## Sources Metadata

`sources` records the primary inputs used to create or materially update the
document. It is a provenance field, not a complete citation database.

This field should support more than external URLs. Agent Skill documents are
often based on upstream documentation, local runtime artifacts, generated
outputs, manual verification, and human-provided requirements from prompts.

`sources` should be an object array.

Each source object:

- `type`: required string
- `role`: optional string
- `label`: optional string
- `url`: optional string
- `path`: optional string
- `version`: optional string
- `checked`: optional `YYYY-MM-DD`

Recommended constraints:

- `type` is required
- at least one of `url`, `path`, or `label` is recommended
- `human-input` and `manual-verification` may omit `url` and `path`
- `checked` may record when an external source, human input, or verification
  result was accepted for the document
- unknown keys should be ignored key-by-key
- object nesting is limited to the `sources[]` object itself
- avoid free-form `sources[].notes` in the first version

Recommended `type` values:

- `upstream-doc`
- `upstream-release`
- `source-code`
- `local-file`
- `local-runtime`
- `generated-output`
- `manual-verification`
- `human-input`

Recommended `role` values:

- `primary`
- `supporting`
- `verification`

Example:

```yaml
sources:
  - type: human-input
    label: user-provided front matter design requirements
    role: primary
    checked: 2026-06-20
  - type: local-runtime
    path: skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar
    version: 1.6.2
    role: verification
  - type: upstream-release
    url: https://github.com/igapyon/miku-indexgen-java/releases/tag/v1.6.2
    version: v1.6.2
    role: supporting
    checked: 2026-06-20
```

`sources` is an intentional exception to the shallow-field preference. It is
structured because source provenance loses important meaning when represented
as a plain string array.

## Unsupported Shapes

YAML validity does not automatically imply `index.json` metadata support.

For example, the following structures may be valid YAML, but should not become
supported fields unless the runtime explicitly documents them:

```yaml
topics:
  - name: runtime
    weight: 10
```

```yaml
metadata:
  category: reference
  status: stable
```

The intended boundary is:

> Markdown front matter is parsed as YAML. `miku-indexgen` extracts only
> documented metadata fields. Unknown fields and unsupported value shapes are
> ignored and are not copied into `index.json`.

This approach balances YAML compatibility with CLI stability. It allows future
metadata fields to be added without turning the generated file index into an
open-ended metadata mirror.
