---
title: igapyon-miku-indexgen usage
topics:
  - miku-indexgen
  - usage
  - agent-skill
  - command-line
  - index-json
  - runtime-artifacts
---

# Usage

This document keeps the agent-facing usage details for `miku-indexgen-skills`
inside the installable skill bundle.

## When To Use

Use `igapyon-miku-indexgen` when an agent should create an index before reading
many files in full.

This is especially useful in directories with many files. An agent can inspect
`index.json` or `index.md` first, then choose a smaller set of files to read in
detail. The expected effect is lower context usage from fewer and smaller file
reads.

Typical targets:

- repository documentation
- skill package contents
- reference directories
- generated or curated knowledge folders
- small source trees where a compact file overview is useful

Generated outputs:

- `index.json`
- optional `index.md`

`index.json` is generated and updated by `miku-indexgen`. It should not be
maintained by hand. When the source directory changes or the index needs to be
refreshed, rerun `miku-indexgen`.

## Agent Requests

Examples:

- `miku-indexgen を使って docs の index.json を作って`
- `igapyon-miku-indexgen で docs を走査し、workplace/indexgen に index.json と index.md を出力して`
- `miku-indexgen で skills 配下の md,json だけを対象に index を作って`
- `miku-indexgen で README と JSON 設定ファイルを探しやすい index.md も作って`

The skill is intentionally opt-in. Generic requests such as "list files",
"search this repository", or "read these files" should not activate it unless
the user explicitly names `miku-indexgen` or `igapyon-miku-indexgen`.

## Direct Runtime Examples

Generate `index.json`:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs
```

Generate an index with a root title:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs --title "Docs Index"
```

Refresh an existing generated `index.json` from its stored generation metadata:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --refresh-index docs/index.json
```

Generate indexes for each direct visible child directory. This is a Java
runtime feature in the bundled 1.4.4 runtime set:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-parent-directory docs-parent --output-directory workplace/indexgen --markdown
```

Generate `index.json` and `index.md` into a separate directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

Use the Node.js runtime directly:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.mjs --input-directory docs --markdown
```

Restrict scanned extensions:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs --include-ext md,json
```

Extract JSON summaries from the first matching JSON Pointer:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs --json-summary-path /title,/name
```

Avoid overwriting existing generated files:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs --no-overwrite
```

Read and write Shift_JIS text:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --input-directory docs --input-encoding shift_jis --output-encoding shift_jis
```

## Developer Commands

Run tests:

```bash
npm test
```

Build the installable skill bundle:

```bash
npm run build:bundle
```

Build the release zip:

```bash
npm run build:bundle:zip
```

Generate the skill-local index:

```bash
mvn generate-resources
```

Refresh the skill-local index directly:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar --refresh-index skills/igapyon-miku-indexgen/index.json
```

The release zip is generated under `bundle/`.

## Runtime And Version Notes

Agent Skill package version: `1.4.4`.

Bundled runtime artifacts:

- `skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.mjs`
- `skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.4.4.jar`

Runtime artifact file versions may differ between Node.js and Java artifacts.
Use file-name versions for artifact selection and `--version` only as a smoke
check that the runtime starts.

Runtime source URLs and SHA-256 digests are documented in the source
repository's `docs/development.md`. Installed skill bundles may not include that
repository-level document.

The generated `index.json` structure is documented for agent use in
[runtime/index-json-spec.md](runtime/index-json-spec.md).

Input directory and input file handling is documented for agent use in
[runtime/input-files-spec.md](runtime/input-files-spec.md).
