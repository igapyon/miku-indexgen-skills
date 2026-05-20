---
title: Indexgen workflow
topics:
  - miku-indexgen
  - workflow
  - index-json
  - front-matter
  - generated-artifact
  - directory-scan
---

# Indexgen Workflow

Use this workflow when a directory contains enough files that an agent should
inspect a compact generated index before deciding which files to read in full.
The expected effect is to reduce unnecessary file reads and context size.

1. Confirm the user explicitly requested `igapyon-miku-indexgen` or `miku-indexgen`.
2. Identify the input directory.
3. Choose the output directory. Use a separate output directory when modifying the input directory is not intended.
4. Decide whether Markdown output is required.
5. For `miku-indexgen`-managed areas, notice whether durable Markdown files
   have supported front matter (`title`, `topics`). If the user is asking to
   create or materially maintain those Markdown files, prefer adding or
   improving that metadata before regenerating the index.
6. Select optional filters such as `--include-ext`, `--json-summary-path`, encoding, recursion, and overwrite policy.
7. Resolve the bundled runtime artifact.
8. Run the CLI.
9. Inspect exit status, stderr, and generated files.
10. Report the output paths and any diagnostics.

`index.json` is a generated artifact. When it needs to change, rerun
`miku-indexgen`; do not manually edit `index.json` as a maintenance step.

The skill layer should not parse source files or synthesize `index.json` itself.
That behavior belongs to the bundled upstream runtime.
