---
title: Runtime operations map
topics:
  - miku-indexgen
  - runtime
  - command-line
  - java-runtime
  - node-runtime
  - backend-policy
---

# Operations Map

## Backend Policy

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

1. read `SKILL.md`
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

## Backend Capability Notes

Both bundled runtimes can be used for ordinary single input-directory generation
when the environment supports the runtime.

Directory-level batch handling for multiple Agent Skills is Java-only. Use the
Java runtime when generating an index for a parent `skills/` directory that
covers multiple skill directories.

## generate

Backend command:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-<version>.jar --input-directory <dir>
```

Node.js fallback:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-<version>.mjs --input-directory <dir>
```

When the user explicitly asks how to run the `miku-indexgen` Java runtime,
Node.js runtime, CLI, command line, or similar one-shot execution, answer with
the relevant command line. Prefer concrete commands using bundled artifact names
when they are known.

Do not treat generic Java, Node.js, Maven, Ant, or command-line questions as
`miku-indexgen` requests unless the user explicitly names `miku-indexgen` or
asks about generated `index.json`.

Bundled Java command:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-directory docs
```

Java-only child-directory batch command:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-parent-directory docs-parent --output-directory out --markdown
```

Refresh an existing generated index:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --refresh-index docs/index.json
```

Bundled Node.js command:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.mjs --input-directory docs
```

Generate Markdown too:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-directory docs --markdown
```

Write output to a separate directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

Use JSON summary extraction:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-directory docs --json-summary-path /title,/name
```

Use a root title and no-overwrite guard:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-directory docs --title "Docs Index" --no-overwrite
```

Use Shift_JIS input and output:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.5.1.jar --input-directory docs --input-encoding shift_jis --output-encoding shift_jis
```

Optional arguments are passed through to the upstream runtime:

- `--input-parent-directory <dir>`: Java runtime only in the bundled 1.5.1
  runtime set
- `--refresh-index <index.json>`
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

## version

Use `--version` only as a runtime smoke check.

## Java-Only Operation

The helper files under `lib/*.mjs` require Node.js. They are convenience helpers
for runtime lookup, CLI invocation, and tests. They are not part of the Java
runtime.

If the active environment has Java but does not have Node.js, use the Java jar
directly:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-<version>.jar --input-directory docs --output-directory workplace/indexgen --markdown
```
