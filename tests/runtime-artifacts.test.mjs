import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  resolveRuntimeArtifact,
  resolveRuntimeArtifactPath
} from "../skills/igapyon-miku-indexgen/lib/runtime-artifacts.mjs";

test("resolves bundled runtime artifacts", () => {
  const javaArtifact = resolveRuntimeArtifact({ kind: "java" });
  const nodeArtifact = resolveRuntimeArtifact({ kind: "node" });

  assert.equal(javaArtifact.name, "miku-indexgen-1.4.4.jar");
  assert.equal(javaArtifact.version, "1.4.4");
  assert.equal(nodeArtifact.name, "miku-indexgen-1.4.4.mjs");
  assert.equal(nodeArtifact.version, "1.4.4");

  assert.equal(fs.existsSync(resolveRuntimeArtifactPath({ kind: "java" })), true);
  assert.equal(fs.existsSync(resolveRuntimeArtifactPath({ kind: "node" })), true);
});
