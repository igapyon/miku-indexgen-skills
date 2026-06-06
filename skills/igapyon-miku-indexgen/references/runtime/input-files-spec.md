---
title: Input files specification
topics:
  - miku-indexgen
  - input-files
  - markdown
  - front-matter
  - json-summary
  - directory-scan
---

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

Use `--refresh-index <index.json>` when an existing generated index already
contains `generation` metadata and should be regenerated with the same stored
conditions.

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
  - front matter should be authored as YAML
  - documented front matter metadata can be extracted
  - `summary` can be extracted from the first heading or leading body text
- JSON files
  - `summary` is omitted by default
  - `--json-summary-path` can extract a summary from JSON Pointer paths
- Other indexed files
  - common metadata such as name, path, extension, directory, and size can be
    recorded
  - other extensions are indexed only when included with `--include-ext`
  - format-specific summary extraction should be treated as `要確認` unless
    upstream documentation states it

By default, the runtime indexes Markdown and JSON files: `md,json`.

Use `--include-ext <exts>` when the user wants to limit indexing to known
formats or include additional file types:

```bash
miku-indexgen --input-directory docs --include-ext md,json
```

## Visible Entries

`miku-indexgen` scans visible directory entries. Files and directories whose
names start with `.` are skipped before extension filtering and recursion are
applied.

Examples of skipped entries:

- `.git/`
- `.github/`
- `.DS_Store`
- `.env`

This means dotfiles and files under dot-directories are not indexed even if
their extensions match `--include-ext`.

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

The runtime normalizes extension values by lowercasing them and removing a
leading dot, so `.md,JSON` is treated like `md,json`.

When `--include-ext` is omitted, the default extension list is `md,json`.

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
- `description`: optional, from Markdown front matter
- `topics`: optional, from Markdown front matter
- `category`: optional, from Markdown front matter
- `status`: optional, from Markdown front matter
- `audience`: optional, from Markdown front matter
- `created`: optional, from Markdown front matter
- `updated`: optional, from Markdown front matter
- `sources`: optional, from Markdown front matter
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

Front matter should be authored as YAML. The index contract remains selective:
`miku-indexgen` extracts only documented fields into `index.json`, and unknown
or unsupported fields are ignored.

The documented fields include `title`, `description`, `topics`, `category`,
`status`, `audience`, `created`, `updated`, and `sources`:

```markdown
---
title: Writing Guide
description: Short description of the document.
topics:
  - writing
  - article
  - tone
---
```

Do not assume that arbitrary YAML fields become `index.json` fields. Only rely
on fields documented by the runtime and the generated output specification.

Extracted text is sanitized for index output. The runtime normalizes Unicode to
NFC, replaces control characters and zero-width formatting characters with
spaces, collapses whitespace runs, and trims leading/trailing whitespace.

The bundled 1.5.1 runtime caps front matter `description` at 256 UTF-16 code
units. Longer descriptions are shortened to 253 code units plus `...`.

Markdown `summary` extracted from leading body text is capped at 256 UTF-16
code units without appending `...`. When `summary` comes from the first heading,
the heading text is sanitized but is not shortened by that body-text cap.

## Supported Front Matter Syntax

`miku-indexgen` recognizes front matter only when it appears at the start of a
Markdown file.

The first physical line after an optional UTF-8 BOM must be:

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
- `description: <text>`
- `category: <text>`
- `status: <text>`
- `audience:`
- `created: <YYYY-MM-DD>`
- `updated: <YYYY-MM-DD>`
- `sources:`

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

Supported folded string metadata:

```markdown
---
description: >
  Short, explicit description written by the author.
---
```

Supported date metadata:

```markdown
---
created: 2026-05-22
updated: 2026-05-22
---
```

Supported structured `sources` metadata:

```markdown
---
sources:
  - type: human-input
    label: user-provided requirements
    role: primary
    checked: 2026-05-22
  - type: local-file
    path: docs/index-json-spec.md
    role: supporting
---
```

Notes:

- YAML indentation should use spaces; tab characters in indentation are not
  supported
- scalar strings and string arrays are preferred for ordinary metadata
- `sources` is the supported structured exception because provenance metadata
  loses meaning as a flat string
- unknown top-level fields are ignored
- documented fields with unsupported value shapes are ignored
- unknown keys inside `sources[]` objects are ignored
- arbitrary nested objects should not be treated as supported index metadata
- empty values are ignored
- string values are sanitized before they are written to generated index output
- single or double quotes around scalar values are handled by YAML parsing

For the detailed YAML front matter metadata policy, see
[miku-indexgen-frontmatter-spec.md](miku-indexgen-frontmatter-spec.md).

## Recommended Markdown Authoring

When Markdown files are intended to be indexed by `miku-indexgen`, treat
supported front matter as the preferred way to provide stable index metadata.

In repositories or directories where the `miku-indexgen` series is intentionally
introduced, actively maintain supported front matter on Markdown files as part
of normal Markdown maintenance. This makes generated indexes more useful for
agents and humans without requiring manual edits to `index.json`.

In practice, when creating or materially editing a Markdown file in a
`miku-indexgen`-managed area, add or improve `title`, `description`, and
`topics` unless the document is too temporary, too trivial, or the right
metadata would be misleading.

Recommended minimal front matter:

```markdown
---
title: Writing Guide
description: Short description of the document.
topics:
  - writing
  - article
---
```

Guidance:

- use `title` when the document has a stable human-readable title
- use `description` for a short, explicit author-provided description
- use `topics` for a short list of useful search or grouping terms
- in `miku-indexgen`-managed areas, expect durable Markdown files to have
  `title`, `description`, and practical `topics`
- keep topics practical and sparse; avoid turning front matter into a taxonomy
- do not invent front matter just to satisfy `miku-indexgen`
- keep the Markdown body readable without relying on front matter
- write a clear first heading or leading paragraph because it may become
  `summary`

This is an authoring convention for better generated indexes. Markdown files
without front matter can still be indexed, but durable Markdown files in managed
areas should normally gain supported front matter over time.

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

JSON summaries are capped at 256 UTF-16 code units before sanitization. Unlike
front matter `description`, this cap does not append `...`.

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
- optional `description`
- optional `topics`
- optional `category`
- optional `status`
- optional `audience`
- optional `created`
- optional `updated`
- optional `sources`
- optional `summary`

See [index-json-spec.md](index-json-spec.md) for generated output structure.

Generated `files[]` entries are sorted by normalized relative `path` using
UTF-16 code unit string comparison. Paths are written with POSIX-style `/`
separators. Do not assume locale, natural, numeric, or case-insensitive sort
order.

## Generated Files As Inputs

When output is written into the input directory, generated `index.json` and
optional `index.md` may exist beside source files. Treat these as generated
artifacts, not hand-maintained source files.

The output files for the current run are excluded from the generated `files[]`
array when they are inside the scanned input tree. For example, generating
`docs/index.json` and `docs/index.md` does not add those generated files to the
new index.

When an agent is asked to refresh them, rerun `miku-indexgen` instead of editing
the generated files by hand.

If `index.json` contains root `generation` metadata, it can be refreshed with:

```bash
miku-indexgen --refresh-index path/to/index.json
```

`--refresh-index` reads the stored generation conditions. It does not use stored
`overwrite` or `verbose` values because those are runtime execution policies,
not generation content.

## Agent Guidance

When asked whether a file will be indexed, check:

1. the selected `--input-directory`
2. whether the file or one of its parent directories starts with `.`
3. whether recursion is enabled
4. whether `--include-ext` excludes the file extension
5. whether the file is one of the current run's generated output files
6. whether the file is readable with the selected `--input-encoding`
7. whether Markdown or JSON metadata extraction rules apply

When behavior is not documented here or in the upstream README, report it as
`要確認` rather than inventing a rule.
