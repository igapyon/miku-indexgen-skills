# Input Files Specification

This reference summarizes how `miku-indexgen` treats input directories and input
files. Use it when a user asks what files can be indexed, what metadata is read,
or how options affect scanning.

The upstream runtime remains the source of truth. This document records the
contract exposed by the bundled `miku-indexgen` runtime artifacts in this skill
package.

## Input Directory

`miku-indexgen` scans the directory specified by `--input-directory <dir>`.

Example:

```bash
miku-indexgen --input-directory docs
```

When `--output-directory` is omitted, generated files are written under the
input directory. When the generated index should not modify the source
directory, use a separate output directory.

## Directory-Wide Input Model

`miku-indexgen` takes a directory as its primary input, not an explicit list of
individual files.

The normal workflow is:

1. choose one input directory
2. scan files under that directory
3. optionally narrow the scan with recursion, extension, and encoding options
4. generate one `index.json` for the selected directory tree
5. optionally generate one `index.md`

This makes `miku-indexgen` suitable for bulk indexing a documentation folder,
skill folder, reference folder, or small repository area before an agent reads
individual files in detail.

When only a subset of files should be indexed, prefer one of these approaches:

- choose a narrower `--input-directory`
- use `--no-recursive`
- use `--include-ext <exts>`
- write output to a separate `--output-directory`

Do not treat `miku-indexgen` as a per-file command. If a user asks to index a
single file, choose its containing directory as the input and narrow the scan
with options where practical.

## Supported Input Format Types

`miku-indexgen` indexes files from the selected input directory and records
common file metadata for each indexed file.

Documented format-specific behavior:

- Markdown files
  - front matter `title` and `topics` can be extracted
  - `summary` can be extracted from the first heading or leading body text
- JSON files
  - `summary` is omitted by default
  - `--json-summary-path` can extract a summary from JSON Pointer paths
- Other indexed files
  - common metadata such as name, path, extension, directory, and size can be
    recorded
  - format-specific summary extraction should be treated as `要確認` unless
    upstream documentation states it

Use `--include-ext <exts>` when the user wants to limit indexing to known
formats, for example Markdown and JSON:

```bash
miku-indexgen --input-directory docs --include-ext md,json
```

## Recursion

By default, `miku-indexgen` recursively scans under the input directory.

Use `--no-recursive` to disable recursive scanning:

```bash
miku-indexgen --input-directory docs --no-recursive
```

## Extension Filtering

Use `--include-ext <exts>` to restrict the indexed file extensions.

Example:

```bash
miku-indexgen --input-directory docs --include-ext md,json
```

The extension list is comma-separated. The upstream README shows values without
leading dots, such as `md,json`.

## Input Encoding

Use `--input-encoding <encoding>` to choose how text input is read.

Supported values documented by the upstream runtime:

- `utf8`
- `shift_jis`

Example:

```bash
miku-indexgen --input-directory docs --input-encoding shift_jis
```

Use `--output-encoding <encoding>` separately when the generated output should
use a specific encoding.

## Markdown Files

For Markdown files, `miku-indexgen` can extract:

- `title`: optional, from Markdown front matter
- `topics`: optional, from Markdown front matter
- `summary`: optional, from the first heading or leading body text

If the Markdown file starts with front matter, that front matter is excluded
from `summary` extraction.

When front matter is absent:

- `title` is not set from the Markdown heading
- `topics` is not set
- `summary` may still be extracted from the first heading or leading body text

In other words, a first heading such as `# Writing Guide` can become
`summary`, but it does not become `title`. Use front matter when the generated
`index.json` should contain a `title` field for that Markdown file.

The front matter support is intentionally simple. The upstream README documents
`title` and `topics`:

```markdown
---
title: Writing Guide
topics:
  - writing
  - article
  - tone
---
```

Do not assume that arbitrary front matter fields become `index.json` fields.
Only rely on fields documented by the upstream runtime.

## Supported Front Matter Syntax

`miku-indexgen` recognizes front matter only when it appears at the start of a
Markdown file.

The first non-BOM line must be:

```markdown
---
```

The front matter block must be closed by another line containing:

```markdown
---
```

Supported fields:

- `title: <text>`
- `topics:`

Supported `title` examples:

```markdown
---
title: Writing Guide
---
```

```markdown
---
title: "Writing Guide"
---
```

```markdown
---
title: 'Writing Guide'
---
```

Supported block-style `topics`:

```markdown
---
topics:
  - writing
  - article
  - tone
---
```

Supported inline `topics`:

```markdown
---
topics: [writing, article, tone]
---
```

```markdown
---
topics: ["writing", "article", "tone"]
---
```

Notes:

- blank lines and comment lines starting with `#` inside front matter are
  ignored
- single or double quotes around `title` and topic values are removed
- empty values are ignored
- unknown fields are ignored by the current runtime
- nested YAML objects, complex arrays, and arbitrary front matter fields should
  not be treated as supported index metadata unless upstream documents them

## Recommended Markdown Authoring

When Markdown files are intended to be indexed by `miku-indexgen`, write
front matter when it is natural and low-cost.

In repositories or directories where the `miku-indexgen` series is intentionally
introduced, prefer adding supported front matter to Markdown files actively,
within a reasonable maintenance cost. This makes generated indexes more useful
for agents and humans without requiring manual edits to `index.json`.

Recommended minimal front matter:

```markdown
---
title: Writing Guide
topics:
  - writing
  - article
---
```

Guidance:

- use `title` when the document has a stable human-readable title
- use `topics` for a short list of useful search or grouping terms
- in `miku-indexgen`-managed areas, prefer adding `title` and `topics` when
  touching Markdown files for normal maintenance
- keep topics practical and sparse; avoid turning front matter into a taxonomy
- do not invent front matter just to satisfy `miku-indexgen`
- keep the Markdown body readable without relying on front matter
- write a clear first heading or leading paragraph because it may become
  `summary`

This is a recommendation for better generated indexes, not a requirement.
Markdown files without front matter can still be indexed.

## JSON Files

For JSON files, `summary` is omitted by default.

Use `--json-summary-path <paths>` to extract a summary from JSON files. The
argument is a comma-separated list of JSON Pointer paths.

Examples:

```bash
miku-indexgen --input-directory docs --json-summary-path /title,/name
```

```bash
miku-indexgen --input-directory references --json-summary-path /frontmatter/title,/metadata/title,/title
```

The runtime evaluates paths from left to right and uses the first matching
string value as `summary`.

## File Metadata

For each indexed file, `miku-indexgen` records file-level metadata in
`index.json`.

Documented file entry fields include:

- `name`
- `path`
- `ext`
- `dir`
- `size`
- optional `title`
- optional `topics`
- optional `summary`

See [index-json-spec.md](index-json-spec.md) for generated output structure.

## Generated Files As Inputs

When output is written into the input directory, generated `index.json` and
optional `index.md` may exist beside source files. Treat these as generated
artifacts, not hand-maintained source files.

When an agent is asked to refresh them, rerun `miku-indexgen` instead of editing
the generated files by hand.

## Agent Guidance

When asked whether a file will be indexed, check:

1. the selected `--input-directory`
2. whether recursion is enabled
3. whether `--include-ext` excludes the file extension
4. whether the file is readable with the selected `--input-encoding`
5. whether Markdown or JSON metadata extraction rules apply

When behavior is not documented here or in the upstream README, report it as
`要確認` rather than inventing a rule.
