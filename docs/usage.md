# Usage

This document keeps the user-facing details for `miku-indexgen-skills` outside
the short README.

## When To Use

Use `igapyon-miku-indexgen` when an agent should create an index before reading
many files in full.

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
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.2.1.jar --input-directory docs
```

Generate `index.json` and `index.md` into a separate directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.2.1.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

Use the Node.js runtime directly:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.2.0.mjs --input-directory docs --markdown
```

Restrict scanned extensions:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.2.1.jar --input-directory docs --include-ext md,json
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

The release zip is generated under `bundle/`.

## Runtime And Version Notes

Agent Skill package version: `1.2.1`.

Bundled runtime artifacts:

- `skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.2.0.mjs`
- `skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.2.1.jar`

Runtime artifact file versions may differ between Node.js and Java artifacts.
Use file-name versions for artifact selection and `--version` only as a smoke
check that the runtime starts.

Runtime source URLs and SHA-256 digests are documented in
[development.md](development.md).

The generated `index.json` structure is documented for agent use in
[`references/runtime/index-json-spec.md`](../skills/igapyon-miku-indexgen/references/runtime/index-json-spec.md).

Input directory and input file handling is documented for agent use in
[`references/runtime/input-files-spec.md`](../skills/igapyon-miku-indexgen/references/runtime/input-files-spec.md).
