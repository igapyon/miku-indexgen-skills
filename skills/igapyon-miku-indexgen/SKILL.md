---
name: igapyon-miku-indexgen
description: Use for explicit `igapyon-miku-indexgen` or `miku-indexgen` generation workflows, or when the user asks to create or refresh generated `index.json`. Run the bundled CLI runtime to generate index.json and optional index.md; do not auto-activate for generic directory listing, file investigation, search, or code review requests.
---

# Miku Indexgen

Use this skill for `miku-indexgen`-specific directory index generation workflows.
Keep the focus on local CLI-backed generation of `index.json` and optional
`index.md` from explicitly selected directories.

## Index Adoption Policy

Earlier conventions in igapyon's application and Agent Skill repositories
treated `index.json` as required. It is now optional, including this package's
own inventory. Adoption is conservative: prefer direct links, curated reference
guides, and scoped filename or content search for ordinary discovery. Do not add
an index or generation/check wiring by default. An index can add tokens and
duplicate existing routes; do not promise lower context cost without evidence.

When the user asks to create or update `index.json`, run the bundled runtime for
the requested scope. The explicit request is sufficient reason to generate it;
do not require a named consumer, a permanent adoption policy, or another
confirmation merely because indexes are optional. Assess whether an index is
useful when advising about adoption, not as a prerequisite to fulfilling a
generation request.

A missing optional index is valid and does not itself require generation or
repair. Follow an existing repository's adopted generation workflow when it
applies. Optional status alone is not a reason to delete an existing index.

Non-negotiable: `index.json` is generated and updated by `miku-indexgen`.
Never maintain or patch generated `index.json` by hand. For a requested or
adopted generation/update, rerun the runtime.

## Activation

For this skill, `miku-indexgen` is narrow opt-in by default. Do not trigger it
from generic words such as list, scan, files, tree, search, grep, read, code
reading, file investigation, or review.

Start `miku-indexgen` mode when at least one of these explicit triggers is
present:

- the user names `igapyon-miku-indexgen`
- the user names `miku-indexgen`
- the user explicitly asks to generate, create, refresh, or automatically update
  `index.json`
- the user asks for a command line to run the `miku-indexgen` Java or Node.js
  runtime
- the recent conversation is already in an active `miku-indexgen` workflow from
  an earlier explicit trigger

Do not start this skill merely because a repository has `index.json`, `pom.xml`,
Markdown files, many files, or an Agent Skills structure.
Do not start this skill for generic command-line, Java, Node.js, Maven, or Ant
questions unless they explicitly target `miku-indexgen` or generated
`index.json`.
Discussing or editing this skill does not itself request index generation.

Without one of these triggers, answer normally or ask a brief clarifying
question if using `miku-indexgen` would materially change the result.

## Access Scope

`miku-indexgen` reads directory entries and supported file contents under the
selected input directory and writes `index.json` plus optional `index.md` to the
selected output directory. It does not create an additional sandbox boundary.

Before indexing outside the current repository or declared workspace, ask for
explicit user confirmation and include the requested input directory, output
directory, recursion setting, extension filters, encoding, and overwrite policy.

## Core Rules

- prefer the bundled runtime artifacts in `runtime/`
- keep input and output directories explicit
- use a separate output directory when generated files should not modify the
  source directory
- use `--markdown` only when the user needs `index.md`
- preserve `index.json` and `index.md` as inspectable file artifacts
- update generated `index.json` by rerunning `miku-indexgen`, not by manual
  editing
- in `miku-indexgen`-managed areas, treat supported Markdown front matter as
  agent-facing index metadata, not decoration; prefer `title`, `description`,
  and practical `topics` for scan-time file selection, and add `category`,
  `status`, `audience`, `created`, `updated`, or `sources` when they improve
  routing, provenance, or maintenance decisions without adding noise
- inspect command status and stderr before reporting success
- keep diagnostics visible when the runtime reports warnings or expected
  failures
- do not create or rewrite `pom.xml` unless the user explicitly asks for Maven,
  Ant, `pom.xml`, or resource-generation wiring and agrees to that repository
  build-file change
- do not reimplement index generation, front matter parsing, JSON summary
  extraction, encoding conversion, or Markdown output in the skill layer

## Generated Index Discipline

`index.json` is generated and updated by the upstream `miku-indexgen` runtime.
Do not maintain it by hand.

For a requested or adopted generation/update, run `miku-indexgen` with the
intended input directory, output directory, filters, encoding, recursion, and
overwrite policy. Do not manually patch `index.json` as a substitute for running
the runtime.

When an existing generated `index.json` already contains `generation` metadata,
prefer `--refresh-index <index.json>` to regenerate it with the stored
conditions.

The same principle applies to `index.md` when Markdown output is enabled.

## Operations

Primary operation:

- `generate`: run `miku-indexgen` against an input directory and produce
  `index.json`, with optional `index.md`
- `batch-generate`: with the Java runtime, run
  `miku-indexgen --input-parent-directory <dir>` to generate indexes for each
  direct visible child directory as an independent input base
- `refresh`: run `miku-indexgen --refresh-index <index.json>` to regenerate an
  existing generated index from its stored generation metadata

Common options:

- `--input-directory <dir>`
- `--input-parent-directory <dir>`
- `--refresh-index <index.json>`
- `--output-directory <dir>`
- `--title <text>`
- `--markdown`
- `--no-generator`
- `--json-summary-path <paths>`
- `--no-recursive`
- `--no-overwrite`
- `--include-ext <exts>`
- `--exclude-glob <pattern>`
- `--input-encoding <encoding>`
- `--output-encoding <encoding>`
- `--verbose`

## Runtime Discipline

For explicit `miku-indexgen` requests, first check the bundled runtime artifacts
before broad workspace exploration or generic tool discovery.

Default to `cli-preferred`: use the bundled Java runtime first, use the bundled
Node.js runtime when Java is unavailable or unsuitable, and return visible
handoff material only when local CLI execution cannot proceed.

For runtime order, backend policy details, and Java-only operation, read
[references/runtime/operations-map.md](references/runtime/operations-map.md).

## Error Handling

Treat missing runtime artifacts, inaccessible input directories, existing output
files with `--no-overwrite`, unsupported encodings, invalid JSON Pointer
arguments, and unsupported policy values as hard errors.

## Boundaries

- Do not add MCP server behavior in this repository.
- Do not call MCP tools as fallback.
- Do not present this as a generic directory listing or file inventory skill.
- Do not replace the upstream `miku-indexgen` runtime implementation with
  skill-local indexing logic.
- Do not manually edit generated `index.json` files as a substitute for running
  `miku-indexgen`.
- Do not hide diagnostics from the runtime result.

## References

Read these only when needed:

- [references/INDEX.md](references/INDEX.md) for detailed workflow, runtime, and examples
- [examples/indexgen-examples.md](examples/indexgen-examples.md)
  for common Java and Node.js command examples
- [examples/maven-index-generation.md](examples/maven-index-generation.md)
  for Maven generation examples for Agent Skills indexes
- [references/workflow/agent-skill-index-workflow.md](references/workflow/agent-skill-index-workflow.md)
  when applying generated `index.json` to an Agent Skills package
- [references/runtime/operations-map.md](references/runtime/operations-map.md)
  for command-line examples, runtime order, backend policy, and Java-only operation
- [references/runtime/index-json-spec.md](references/runtime/index-json-spec.md)
  when the user asks about generated `index.json` structure, fields, formatting,
  or update rules
- [references/runtime/input-files-spec.md](references/runtime/input-files-spec.md)
  when the user asks about input directories, scanned files, encodings,
  extension filters, Markdown front matter, or Markdown / JSON metadata
  extraction
- [references/runtime/miku-indexgen-frontmatter-spec.md](references/runtime/miku-indexgen-frontmatter-spec.md)
  when the user asks about proposed expanded YAML front matter metadata,
  structured `sources`, `created`, `updated`, or future front matter direction
