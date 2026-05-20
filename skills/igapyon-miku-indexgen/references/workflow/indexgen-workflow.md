# Indexgen Workflow

1. Confirm the user explicitly requested `igapyon-miku-indexgen` or `miku-indexgen`.
2. Identify the input directory.
3. Choose the output directory. Use a separate output directory when modifying the input directory is not intended.
4. Decide whether Markdown output is required.
5. Select optional filters such as `--include-ext`, `--json-summary-path`, encoding, recursion, and overwrite policy.
6. Resolve the bundled runtime artifact.
7. Run the CLI.
8. Inspect exit status, stderr, and generated files.
9. Report the output paths and any diagnostics.

`index.json` is a generated artifact. When it needs to change, rerun
`miku-indexgen`; do not manually edit `index.json` as a maintenance step.

The skill layer should not parse source files or synthesize `index.json` itself.
That behavior belongs to the bundled upstream runtime.
