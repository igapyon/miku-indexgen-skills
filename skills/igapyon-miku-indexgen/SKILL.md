---
name: igapyon-miku-indexgen
description: Use only when the user explicitly says `igapyon-miku-indexgen` or `miku-indexgen` for miku-indexgen-specific directory index generation workflows. This skill runs the bundled miku-indexgen CLI runtime to generate index.json and optional index.md files; do not auto-activate it for generic directory listing, file investigation, search, or code review requests.
---

# Miku Indexgen

Use this skill for `miku-indexgen`-specific directory index generation workflows.
Keep the focus on local CLI-backed generation of `index.json` and optional
`index.md` from explicitly selected directories.

For this skill, `miku-indexgen` is opt-in by default. Do not trigger it from
generic words such as list, scan, files, tree, search, grep, read, code reading,
file investigation, or review.

Start `miku-indexgen` mode when at least one of these explicit triggers is
present:

- the user names `igapyon-miku-indexgen`
- the user names `miku-indexgen`
- the recent conversation is already in an active `miku-indexgen` workflow from
  an earlier explicit trigger

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
- inspect command status and stderr before reporting success
- keep diagnostics visible when the runtime reports warnings or expected
  failures
- do not reimplement index generation, front matter parsing, JSON summary
  extraction, encoding conversion, or Markdown output in the skill layer

## Operations

Primary operation:

- `generate`: run `miku-indexgen` against an input directory and produce
  `index.json`, with optional `index.md`

Common options:

- `--input-directory <dir>`
- `--output-directory <dir>`
- `--title <text>`
- `--markdown`
- `--no-generator`
- `--json-summary-path <paths>`
- `--no-recursive`
- `--no-overwrite`
- `--include-ext <exts>`
- `--input-encoding <encoding>`
- `--output-encoding <encoding>`
- `--verbose`

## Runtime Discipline

For explicit `miku-indexgen` requests, first check the bundled runtime artifacts
before broad workspace exploration or generic tool discovery.

Unless the user or environment states another execution policy, use
`cli-preferred`.

Policy values:

- `cli-only`: use only the bundled CLI backend; do not fall back to visible
  handoff
- `cli-preferred`: use the bundled CLI backend first; if CLI is unavailable,
  return visible handoff material
- `handoff-only`: do not execute backend operations; return visible command
  guidance or handoff steps

For `cli-only` and `cli-preferred`, use this runtime order:

1. read this `SKILL.md`
2. check versioned runtime artifacts matching
   `skills/igapyon-miku-indexgen/runtime/miku-indexgen-*.jar` and
   `skills/igapyon-miku-indexgen/runtime/miku-indexgen-*.mjs`
3. prefer the newest Java jar for operations it supports
4. use the newest Node.js `.mjs` when the Java runtime is missing or unsuitable
5. only if the declared path is missing or unusable, report the runtime-path
   problem

Runtime artifact file versions may differ from the text returned by
`--version`. Use file-name versions for artifact selection, and use `--version`
only as a smoke check that the runtime starts.

## Java-Only Operation

The helper files under `lib/*.mjs` require Node.js. They are convenience helpers
for runtime lookup, CLI invocation, and tests. They are not part of the Java
runtime.

If the active environment has Java but does not have Node.js, use the Java jar
directly:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-<version>.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

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
- Do not hide diagnostics from the runtime result.

## References

Read these only when needed:

- [references/INDEX.md](references/INDEX.md) for detailed workflow, runtime, and examples
