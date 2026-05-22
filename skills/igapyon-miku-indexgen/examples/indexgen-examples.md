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
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.3.0.jar --input-directory docs
```

Generate JSON and Markdown into a separate output directory:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.3.0.jar --input-directory docs --output-directory workplace/indexgen --markdown
```

Restrict scanned extensions:

```bash
java -jar skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.3.0.jar --input-directory docs --include-ext md,json
```

Use the Node.js runtime explicitly:

```bash
node skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.3.0.1.mjs --input-directory docs --markdown
```
