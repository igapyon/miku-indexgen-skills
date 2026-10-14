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

Use this workflow when the user requests generation or refresh, or an adopted
repository workflow calls for it. An explicit request to create or update
`index.json` is sufficient; it does not require a separate adoption decision or
documented consumer. The optional-adoption policy is in
[../../SKILL.md](../../SKILL.md#index-adoption-policy).

When advising about adoption, prefer direct links and scoped filename or content
search unless a concrete need justifies an index. File count alone does not
establish that an index will help. A missing optional index is not a generation
request.

1. Identify the requested generation or refresh operation. A direct request to
   create or update `index.json` qualifies without naming `miku-indexgen`.
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
