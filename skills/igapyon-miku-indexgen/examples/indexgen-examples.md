---
title: miku-indexgen CLI command examples
topics:
  - miku-indexgen
  - command-line
  - java-runtime
  - node-runtime
  - examples
---

# Examples

Generate `index.json` inside the input directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs
```

Generate `index.json` with a root title:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --title "Docs Index"
```

Refresh an existing generated `index.json`:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --refresh-index docs/index.json
```

Generate indexes for each direct visible child directory. This option is
available in the bundled Java runtime:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-parent-directory docs-parent --output-directory out --markdown
```

Generate JSON and Markdown into a separate output directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

Restrict scanned extensions:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --include-ext md,json
```

Exclude input-relative paths:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --exclude-glob "**/images/*" --exclude-glob "**/section-text.md"
```

Extract JSON summaries:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --json-summary-path /title,/name
```

Avoid overwriting existing output:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --no-overwrite
```

Use Shift_JIS input and output:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.jar --input-directory docs --input-encoding shift_jis --output-encoding shift_jis
```

Use the Node.js runtime explicitly:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.2.mjs --input-directory docs --markdown
```
