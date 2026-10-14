# miku-indexgen-skills

`miku-indexgen-skills` is an Agent Skills package for using `miku-indexgen` from AI agent workflows.

It runs the bundled `miku-indexgen` runtime to scan an explicitly selected
directory and generate or refresh `index.json`, with optional `index.md`. When
asked to create or update an index, the skill runs the bundled runtime.

Earlier igapyon application and Agent Skill conventions treated `index.json` as
required. It is now optional, and adoption is conservative: use direct links,
curated reference guides, and scoped search for ordinary discovery. Generated
inventories can duplicate those routes and add context cost. This policy keeps
generation available on request while avoiding automatic adoption in every
repository.

Use this skill when you want an agent to understand a selected documentation
directory, Agent Skill package, reference directory, or other explicitly chosen
file area through generated index files.

## What It Does

- generates `index.json` for a selected directory
- optionally generates `index.md`
- can write outputs into the input directory or a separate output directory
- can restrict scanned extensions such as `md,json`
- can use UTF-8 or Shift_JIS input and output encodings
- bundles both Node.js and Java runtime artifacts for local CLI execution

`index.json` is generated and updated by `miku-indexgen`; it is not a file that
needs manual maintenance.

Markdown front matter is used as agent-facing index metadata. Concise `title`,
`description`, `topics`, `category`, `status`, `audience`, date, and `sources`
fields help callers choose which files to read before loading full Markdown
contents.

This repository is not an MCP server and does not replace the upstream
`miku-indexgen` product. It packages the upstream CLI runtimes with
agent-facing instructions and tests.

## Quick Start

1. Confirm runtime artifacts under `skills/igapyon-miku-indexgen/runtime/`.
2. Run `npm test`.
3. Run `npm run build:bundle`.
4. Install the generated `bundle/miku-indexgen-skills/skills/igapyon-miku-indexgen` directory into your skill home.
5. In conversation, explicitly start with `igapyon-miku-indexgen` or `miku-indexgen`.

## Example Agent Requests

- `miku-indexgen を使って docs の index.json を作って`
- `docs の index.json を作って`
- `docs/index.json を更新して`
- `igapyon-miku-indexgen で docs を走査し、workplace/indexgen に index.json と index.md を出力して`
- `miku-indexgen で skills 配下の md,json だけを対象に index を作って`
- `miku-indexgen で README と JSON 設定ファイルを探しやすい index.md も作って`

The skill is intentionally opt-in. Generic requests such as "list files",
"search this repository", or "read these files" should not activate it. An
explicit request to create or refresh `index.json` is sufficient without naming
`miku-indexgen` or documenting a consumer.

## Direct Runtime Examples

Generate `index.json`:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs
```

Generate `index.json` and `index.md` into a separate directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

Use the Node.js runtime directly:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.mjs --input-directory docs --markdown
```

Exclude input-relative paths:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --exclude-glob "**/images/*"
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

This package does not maintain a generated root `index.json`. Use the CLI
examples above when an index is requested for a selected directory or an
adopted repository workflow requires it. Its absence does not block installation
or release packaging.

The release zip is generated under `bundle/`.

## Runtime Artifacts

Agent Skill package version: `1.7.1`.

The skill package and bundled upstream runtimes have independent versions.
Skill instructions and documentation can be released with a new package version
while continuing to bundle the same compatible runtimes. Release tags and bundle
zip names use the skill package version; runtime file names retain their upstream
versions. Update runtime artifacts when adopting a new upstream release.

This repository bundles upstream GitHub Release artifacts:

- `skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.mjs`
- `skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar`

Upstream anchors:

- `igapyon/miku-indexgen` release `v1.6.2`
- `igapyon/miku-indexgen-java` release `v1.6.2`

Runtime artifact file versions may also differ between Node.js and Java artifacts.
Build scripts and release CI select each runtime independently through
`lib/runtime-artifacts.mjs`, using file-name versions for artifact selection and
`--version` as a smoke check that the runtime starts.

## Repository Notes

- `workplace/` is a local scratch area for cloned upstream repositories, generated verification files, and temporary checks. Only `workplace/.gitkeep` is tracked.
- Build output under `bundle/` is regenerated by `npm run build:bundle` or `npm run build:bundle:zip`.

## Developer Documents

- [skills/igapyon-miku-indexgen/references/usage.md](skills/igapyon-miku-indexgen/references/usage.md)
- [docs/development.md](docs/development.md)
- [docs/miku-soft-reference.md](docs/miku-soft-reference.md)
- [skills/igapyon-miku-indexgen/references/INDEX.md](skills/igapyon-miku-indexgen/references/INDEX.md)

## License

Apache License 2.0. See [LICENSE](LICENSE).
