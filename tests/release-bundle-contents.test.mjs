import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";

const ROOT = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.resolve(ROOT, "package.json"), "utf8"));
const zipPath = path.resolve(ROOT, `bundle/igapyon-miku-indexgen-skills-${packageJson.version}.zip`);

test("release zip contains skill files and runtime artifacts", () => {
  execFileSync("npm", ["run", "build:bundle:zip"], {
    cwd: ROOT,
    encoding: "utf8"
  });

  assert.equal(fs.existsSync(zipPath), true);

  const entries = execFileSync("unzip", ["-Z1", zipPath], {
    cwd: ROOT,
    encoding: "utf8"
  }).trim().split(/\n/).filter(Boolean);

  assertIncludes(entries, "skills/igapyon-miku-indexgen/SKILL.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/index.json");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/INDEX.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/usage.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/workflow/indexgen-workflow.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/workflow/agent-skill-index-workflow.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/runtime/operations-map.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/runtime/input-files-spec.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/references/runtime/index-json-spec.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/examples/indexgen-examples.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/examples/maven-index-generation.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/templates/README.md");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/templates/pom-single-skill.xml");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/templates/pom-multi-skill.xml");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/lib/runtime-artifacts.mjs");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/lib/cli-runner.mjs");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.0.mjs");
  assertIncludes(entries, "skills/igapyon-miku-indexgen/runtime/miku-indexgen-1.6.0.jar");

  assert.equal(entries.some((entry) => entry.includes(".DS_Store")), false);
  assert.equal(entries.some((entry) => entry.startsWith("tests/")), false);
  assert.equal(entries.some((entry) => entry.startsWith("docs/")), false);
  assert.equal(entries.some((entry) => entry.startsWith("bundle/")), false);
  assert.equal(entries.some((entry) => entry.includes("node_modules/")), false);
});

function assertIncludes(entries, expected) {
  assert.ok(entries.includes(expected), `missing zip entry: ${expected}`);
}
