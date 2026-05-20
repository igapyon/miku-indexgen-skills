import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { runCli } from "../skills/igapyon-miku-indexgen/lib/cli-runner.mjs";

for (const runtime of ["java", "node"]) {
  test(`${runtime} runtime generates index files`, () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), `miku-indexgen-${runtime}-`));
    const input = path.join(root, "docs");
    const output = path.join(root, "out");
    fs.mkdirSync(input, { recursive: true });
    fs.writeFileSync(path.join(input, "sample.md"), "# Sample\n\nHello.\n", "utf8");

    const result = runCli({
      runtime,
      args: [
        "--input-directory",
        input,
        "--output-directory",
        output,
        "--markdown",
        "--title",
        "Smoke"
      ]
    });

    assert.equal(result.status, 0);
    assert.equal(fs.existsSync(path.join(output, "index.json")), true);
    assert.equal(fs.existsSync(path.join(output, "index.md")), true);

    const indexJson = JSON.parse(fs.readFileSync(path.join(output, "index.json"), "utf8"));
    assert.equal(indexJson.title, "Smoke");
    assert.equal(indexJson.files.some((entry) => entry.name === "sample.md"), true);
  });
}
