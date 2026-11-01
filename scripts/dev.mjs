import { spawn, spawnSync } from "node:child_process";

const node = process.execPath;
const tailwind = [
  "node_modules/tailwindcss/lib/cli.js",
  "-i",
  "./src/input.css",
  "-o",
  "./src/output.css",
  "--minify",
];
const build = spawnSync(node, tailwind, { stdio: "inherit" });
if (build.status !== 0) process.exit(build.status || 1);
const children = [
  spawn(node, [...tailwind, "--watch=always"], { stdio: "inherit" }),
  spawn(
    node,
    [
      "node_modules/next/dist/bin/next",
      "dev",
      "--webpack",
      ...process.argv.slice(2),
    ],
    {
      stdio: "inherit",
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    },
  ),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  process.exitCode = code;
}
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => stop());
for (const child of children) child.on("exit", (code) => stop(code || 0));
