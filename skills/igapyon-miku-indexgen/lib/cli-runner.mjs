import { spawnSync } from "node:child_process";

import { resolveRuntimeArtifactPath } from "./runtime-artifacts.mjs";

export function buildCliInvocation({
  runtime = "java",
  args = [],
  javaRuntimePath,
  nodeRuntimePath
} = {}) {
  if (runtime === "java") {
    return {
      command: "java",
      args: ["-jar", javaRuntimePath ?? resolveRuntimeArtifactPath({ kind: "java" }), ...args]
    };
  }

  if (runtime === "node") {
    return {
      command: "node",
      args: [nodeRuntimePath ?? resolveRuntimeArtifactPath({ kind: "node" }), ...args]
    };
  }

  throw new Error(`unsupported runtime: ${runtime}`);
}

export function runCli({
  runtime = "java",
  args = [],
  cwd,
  javaRuntimePath,
  nodeRuntimePath
} = {}) {
  const invocation = buildCliInvocation({
    runtime,
    args,
    javaRuntimePath,
    nodeRuntimePath
  });

  const result = spawnSync(invocation.command, invocation.args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024
  });

  if (result.error) {
    throw result.error;
  }

  return {
    command: invocation.command,
    args: invocation.args,
    status: result.status,
    signal: result.signal,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? ""
  };
}
