# Operations Map

## generate

Backend command:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-<version>.jar --input-directory <dir>
```

Node.js fallback:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-<version>.mjs --input-directory <dir>
```

Optional arguments are passed through to the upstream runtime:

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
