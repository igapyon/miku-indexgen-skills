import assert from "node:assert/strict";
import test from "node:test";

import { runCli } from "../skills/igapyon-miku-indexgen/lib/cli-runner.mjs";

test("java runtime starts", () => {
  const result = runCli({ runtime: "java", args: ["--version"] });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /miku-indexgen 1\.6\.0/);
});

test("node runtime starts", () => {
  const result = runCli({ runtime: "node", args: ["--version"] });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /miku-indexgen 1\.6\.1/);
});

test("java and node runtime help output matches exactly", () => {
  const javaResult = runCli({ runtime: "java", args: ["--help"] });
  const nodeResult = runCli({ runtime: "node", args: ["--help"] });

  assert.equal(javaResult.status, 0);
  assert.equal(nodeResult.status, 0);
  assert.equal(nodeResult.stdout, javaResult.stdout);
  assert.equal(nodeResult.stderr, javaResult.stderr);
});
